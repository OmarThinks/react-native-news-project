import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { FlatList, Text, View } from "react-native";
import { getAllTopNewsQueryFn, getNewsByIdQueryFn } from "@/api/newsApi";
import { useQuery, useQueries } from "@tanstack/react-query";
import { Header } from "@/components/Views/Header";
import NewsCard from "@/components/cards/NewsCard";
import { NewsItemType } from "@/types/NewsItemType";

function Index() {
  const colors = useColors();

  const { isLoading, isFetching, data, isError, error, status } = useQuery({
    queryKey: ["top-news"],
    queryFn: getAllTopNewsQueryFn,
  });

  const { data: newsItems = [] } = useQueries({
    queries:
      data?.slice(0, 10).map((id) => ({
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
  console.log(JSON.stringify(newsItems, null, 2));

  return (
    <View
      className="flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Top News" />
      <FlatList
        data={newsItems}
        renderItem={({ item }) => <NewsCard newsItem={item} key={item?.id} />}
        //keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default Index;
