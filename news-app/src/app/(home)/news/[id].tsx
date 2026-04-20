import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getNewsByIdQueryFn } from "@/api/newsApi";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import NewsCard from "@/components/cards/NewsCard";

const NewsDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ["news-item", id],
    queryFn: () => getNewsByIdQueryFn(Number(id)),
  });

  console.log(
    "NewsDetailsScreen rendered with id:",
    id,
    "data:",
    JSON.stringify(data, null, 2),
  );

  const colors = useColors();

  // getting the kids news
  const { data: kidNews, pending: kidNewsPending } = useQueries({
    queries:
      data?.kids.map((kidId) => ({
        queryKey: ["news-item", kidId],
        queryFn: () => getNewsByIdQueryFn(kidId),
      })) ?? [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  /*
  Example data:

{
  "by": "DeathArrow",
  "descendants": 32,
  "id": 47816625,
  "kids": [
    47818363,
    47818556,
    47816998,
    47817181,
    47817087,
    47823481,
    47817280
  ],
  "score": 111,
  "time": 1776525858,
  "title": "Fuzix OS",
  "type": "story",
  "url": "https://www.fuzix.org/"
}
  */

  return (
    <View>
      <Text>NewsDetailsScreen</Text>
    </View>
  );
};

export default NewsDetailsScreen;
