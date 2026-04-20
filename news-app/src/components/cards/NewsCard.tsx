import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { NewsItemType } from "@/types/NewsItemType";

const NewsCard = ({ newsItem }: { newsItem: NewsItemType | undefined }) => {
  const colors = useColors();
  if (!newsItem) {
    return null;
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );
    if (diffInHours < 1) return "just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <TouchableOpacity
      className="p-4 m-2 rounded-lg shadow-sm"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      onPress={() => {
        // Handle press, e.g., open URL
        console.log("Open URL:", newsItem.url);
      }}
    >
      <Text
        className="text-lg font-bold mb-2 leading-6"
        style={{ color: colors.text }}
      >
        {newsItem.title}
      </Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-sm" style={{ color: colors.textSecondary }}>
          by {newsItem.by}
        </Text>
        <View className="flex-row items-center">
          <Text
            className="text-sm mr-2"
            style={{ color: colors.textSecondary }}
          >
            {newsItem.score} points
          </Text>
          <Text className="text-sm" style={{ color: colors.textSecondary }}>
            {formatTime(newsItem.time)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;
