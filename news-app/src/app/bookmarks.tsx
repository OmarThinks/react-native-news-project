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
import { FlatList, View, Text, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { SharedValue } from "react-native-reanimated";

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

  // 2. Your dummy function
  const handleSwipeAction = (id: number | string) => {
    console.log(`Item with ID ${id} was swiped!`);
    // Add your logic here (e.g., remove from bookmarks)
  };

  // 3. Define the background UI for when swiping
  const renderRightActions = (
    progression: SharedValue<number>,
    dragX: SharedValue<number>,
  ) => {
    return (
      <View style={[styles.swipeContainer, { backgroundColor: "red" }]}>
        <Text style={styles.swipeText}>Action</Text>
      </View>
    );
  };

  const renderNewsCard = useCallback(
    ({ item }: { item: NewsItemType }) => (
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => handleSwipeAction(item.id)}
      >
        <NewsCard newsItem={item} notPressable />
      </ReanimatedSwipeable>
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
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "100%",
  },
  swipeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Bookmarks;
