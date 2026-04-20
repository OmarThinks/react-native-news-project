import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { Text, View } from "react-native";
import { getAllTopNewsQueryFn } from "@/api/newsApi";
import { useQuery } from "@tanstack/react-query";

function Index() {
  const colors = useColors();

  const { isLoading, isFetching, data, isError, error, status } = useQuery({
    queryKey: ["top-news"],
    queryFn: getAllTopNewsQueryFn,
  });

  console.log({ isLoading, isFetching, data, isError, error, status });

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
