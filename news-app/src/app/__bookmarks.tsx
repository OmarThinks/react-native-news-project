import { getNewsByIdQueryFn } from "@/api/newsApi";
import { Header } from "@/components/Views/Header/Header";
import SortButtonsAndSearchBar from "@/components/buttons/SortButtonsAndSearchBar";
import NewsCard from "@/components/cards/NewsCard/NewsCard";
import useBookmarks from "@/redux/slices/bookmarks/bookmarksHooks";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { NewsItemType } from "@/types/NewsItemType";
import { SortingEnum, SortingEnumType } from "@/types/SortingEnum";
import { getFilteredAndSortedNews } from "@/utils/getFilteredAndSortedNews";
import { useQueries } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";

const Bookmarks = () => {
  const colors = useColors();
  const { bookmarks } = useBookmarks();

  const { data: newsItems = [], pending } = useQueries({
    queries:
      bookmarks.map((id) => ({
        queryKey: ["news-item", id],
        queryFn: () => getNewsByIdQueryFn<NewsItemType>(id),
      })) ?? [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const renderNewsCard = useCallback(
    ({ item }: { item: NewsItemType }) => (
      <NewsCard newsItem={item} notPressable />
    ),
    [],
  );

  const [searchText, setSearchText] = useState("");
  const [scoreSorting, setScoreSorting] = useState<SortingEnumType>(
    SortingEnum.NONE,
  );
  const [timeSorting, setTimeSorting] = useState<SortingEnumType>(
    SortingEnum.NONE,
  );

  const loadedItems = useMemo(() => {
    return getFilteredAndSortedNews({
      newsItems,
      searchText,
      scoreSorting,
      timeSorting,
    });
  }, [newsItems, searchText, scoreSorting, timeSorting]);

  return (
    <View
      className="flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Top News" />
      <View className=" self-stretch flex-1 px-2">
        <SortButtonsAndSearchBar
          textInputValue={searchText}
          setTextInputValue={setSearchText}
          scoreSortingState={scoreSorting}
          setScoreSortingState={setScoreSorting}
          timeSortingState={timeSorting}
          setTimeSortingState={setTimeSorting}
        />
        <FlatList
          data={loadedItems as NewsItemType[]}
          renderItem={renderNewsCard}
          keyExtractor={(item) => item?.id?.toString?.()}
        />
      </View>
    </View>
  );
};

export default Bookmarks;
