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
import { FlatList, View, Animated, Text } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

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

  // Dummy function to handle item removal
  const handleRemoveBookmark = useCallback((itemId: number | string) => {
    console.log("Remove bookmark with ID:", itemId);
    // Your removal logic will go here
  }, []);

  const renderNewsCard = useCallback(
    ({ item }: { item: NewsItemType }) => {
      const translateX = new Animated.Value(0);

      const pan = Gesture.Pan()
        .onUpdate((event) => {
          if (event.translationX < 0) {
            translateX.setValue(Math.max(event.translationX, -120));
          }
        })
        .onEnd((event) => {
          if (event.translationX < -60) {
            // Trigger removal
            Animated.timing(translateX, {
              toValue: -120,
              duration: 200,
              useNativeDriver: true,
            }).start();
            setTimeout(() => handleRemoveBookmark(item.id), 100);
          } else {
            // Snap back
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        });

      return (
        <View style={{ overflow: "hidden" }}>
          <View
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 120,
              backgroundColor: "#ef4444",
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 16,
            }}
          >
            <Text style={{ fontSize: 12, color: "white" }}>Delete</Text>
          </View>
          <GestureDetector gesture={pan}>
            <Animated.View
              style={{
                transform: [{ translateX }],
              }}
            >
              <NewsCard newsItem={item} notPressable />
            </Animated.View>
          </GestureDetector>
        </View>
      );
    },
    [handleRemoveBookmark],
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
