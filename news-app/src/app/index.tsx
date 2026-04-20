import { getAllTopNewsQueryFn, getNewsByIdQueryFn } from "@/api/newsApi";
import { Header } from "@/components/Views/Header";
import NewsCard from "@/components/cards/NewsCard";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, View } from "react-native";

function Index() {
  const colors = useColors();

  const { isLoading, isFetching, data, isError, error, status } = useQuery({
    queryKey: ["top-news"],
    queryFn: getAllTopNewsQueryFn,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { data: newsItems = [] } = useQueries({
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

  //console.log({ isLoading, isFetching, data, isError, error, status });
  //console.log(JSON.stringify(newsItems, null, 2));

  console.log(currentPage, newsItems.length, data?.length);

  const [lastNextPageTriggerTime, setLastNextPageTriggerTime] = useState(0);

  const nextPage = () => {
    if (!data) return;

    const now = Date.now();
    if (now - lastNextPageTriggerTime < 1000 * 2) {
      // Prevent triggering next page multiple times within 2 seconds
      return;
    }
    if (newsItems.length < data.length) {
      setLastNextPageTriggerTime(now);
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <View
      className="flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Top News" />
      <FlatList
        data={newsItems}
        renderItem={({ item }) => <NewsCard newsItem={item} key={item?.id} />}
        keyExtractor={(item, index) =>
          item?.id?.toString?.() ?? index.toString()
        }
        onEndReached={nextPage}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

export default Index;
