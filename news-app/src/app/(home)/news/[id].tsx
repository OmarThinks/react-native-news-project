import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getNewsByIdQueryFn } from "@/api/newsApi";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";

const NewsDetailsScreen = () => {
  const colors = useColors();

  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ["news-item", id],
    queryFn: () => getNewsByIdQueryFn(Number(id)),
  });

  console.log("NewsDetailsScreen rendered with id:", id, "data:", data);

  return (
    <View>
      <Text>NewsDetailsScreen</Text>
    </View>
  );
};

export default NewsDetailsScreen;
