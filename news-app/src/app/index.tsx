import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { Text, View } from "react-native";
import { getAllTopNewsQueryFn, getNewsByIdQueryFn } from "@/api/newsApi";
import { useQuery, useQueries } from "@tanstack/react-query";

function Index() {
  const colors = useColors();

  const { isLoading, isFetching, data, isError, error, status } = useQuery({
    queryKey: ["top-news"],
    queryFn: getAllTopNewsQueryFn,
  });

  const { data: newsItems } = useQueries({
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

  console.log({ isLoading, isFetching, data, isError, error, status });
  console.log(JSON.stringify(newsItems, null, 2));

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <Text className="text-xl font-bold" style={{ color: colors.text }}>
        Welcome to our News App!
      </Text>
    </View>
  );
}

export default Index;
