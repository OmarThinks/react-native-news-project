import { getAllTopNewsQueryFn, getNewsByIdQueryFn } from "@/api/newsApi";
import { Header } from "@/components/Views/Header";
import NewsCard from "@/components/cards/NewsCard";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { NewsItemType } from "@/types/NewsItemType";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

function Index() {
  const colors = useColors();

  const { isLoading, isFetching, data, isError, error, status } = useQuery({
    queryKey: ["top-news"],
    queryFn: getAllTopNewsQueryFn,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { data: newsItems = [], pending } = useQueries({
    queries:
      data?.slice(0, 20 * currentPage).map((id) => ({
        queryKey: ["news-item", id],
        queryFn: () => getNewsByIdQueryFn(id),
      })) ?? [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const loadedItems = newsItems.filter((item) => item != null);

  const [lastNextPageTriggerTime, setLastNextPageTriggerTime] = useState(0);

  const nextPage = useCallback(() => {
    if (!data) return;

    const now = Date.now();
    if (now - lastNextPageTriggerTime < 1000) {
      // Prevent triggering next page multiple times within 1 second
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

  return (
    <View
      className="flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Top News" />
      <FlatList
        data={loadedItems}
        renderItem={renderNewsCard}
        keyExtractor={(item) => item?.id?.toString?.()}
        onEndReached={nextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? (
            <View className="p-4">
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : null
        }
      />
    </View>
  );
}

export default Index;
