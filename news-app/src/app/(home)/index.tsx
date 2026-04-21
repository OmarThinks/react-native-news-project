import { getAllTopNewsQueryFn, getNewsByIdQueryFn } from "@/api/newsApi";
import ErrorScreen from "@/components/ErrorScreen";
import { Header } from "@/components/Views/Header/Header";
import SortButtonsAndSearchBar from "@/components/buttons/SortButtonsAndSearchBar";
import NewsCard from "@/components/cards/NewsCard/NewsCard";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { NewsItemType } from "@/types/NewsItemType";
import { SortingEnum, SortingEnumType } from "@/types/SortingEnum";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

function Index() {
  const colors = useColors();

  const { isLoading, isFetching, data, isError, error, status, refetch } =
    useQuery({
      queryKey: ["top-news"],
      queryFn: getAllTopNewsQueryFn,
    });

  const [currentPage, setCurrentPage] = useState(1);

  const { data: newsItems = [], pending } = useQueries({
    queries:
      data?.slice(0, 20 * currentPage).map((id) => ({
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

  const [lastNextPageTriggerTime, setLastNextPageTriggerTime] = useState(0);

  const nextPage = useCallback(() => {
    if (!data) return;

    const now = Date.now();
    if (now - lastNextPageTriggerTime < 300) {
      // Prevent triggering next page multiple times within 0.3 second
      return;
    }
    if (newsItems.length < data.length) {
      setLastNextPageTriggerTime(now);
      setCurrentPage((prev) => prev + 1);
    }
  }, [data, newsItems.length, lastNextPageTriggerTime]);

  const renderNewsCard = useCallback(
    ({ item }: { item: NewsItemType }) => <NewsCard newsItem={item} />,
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
    return newsItems.filter((item) => {
      if (item == null) return false;
      if (item == undefined) return false;
      if (typeof item !== "object") return false;
      if (!("title" in item)) return false;
      if (!("url" in item)) return false;
      if (!(item?.type === "story")) return false;

      return true;
    });
  }, [newsItems]);

  /*
  console.log(
    "isFetching:",
    isFetching,
    "data length:",
    data?.length,
    newsItems?.length,
    currentPage,
  );*/

  if (status === "pending") {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: colors.background }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  } else if (status === "error") {
    return (
      <ErrorScreen
        error={error?.message ?? "An error occurred while fetching news."}
        refetch={refetch}
        isFetching={isFetching}
      />
    );
  }

  return (
    <View
      className="flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Top News" />
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
        onEndReached={nextPage}
        onRefresh={refetch}
        refreshing={isFetching}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          pending ? (
            <View className="p-4">
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : loadedItems.length === data?.length ? (
            <View className="p-4 self-stretch">
              <Text
                style={{ color: colors.textSecondary }}
                className="text-center text-20px] font-medium"
              >
                No more news to load
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

export default Index;
