import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { NewsItemType } from "@/types/NewsItemType";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NewsCard = ({
  newsItem,
  notPressable = false,
}: {
  newsItem: NewsItemType;
  notPressable?: boolean;
}) => {
  const colors = useColors();
  if (!newsItem) {
    return null;
  }

  /*
  useEffect(() => {
    console.log("NewsCard rendered for id:", newsItem.id);
    return () => {
      console.log("NewsCard unmounted for id:", newsItem.id);
    };
  }, [newsItem.id]);*/

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
      className="p-4 my-2 rounded-lg shadow-sm"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      onPress={() => {
        // Handle press, e.g., open URL
        //console.log("Open URL:", newsItem.url);
        router.push(`/news/${newsItem.id}`);
      }}
      disabled={notPressable}
    >
      <View className=" self-stretch flex-row gap-2">
        <View style={{ width: 60, height: 60 }}>
          <Image
            source={{ uri: newsItem.imageUrl }}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
            contentFit="cover"
          />
        </View>
        <View className=" flex-1 grow shrink">
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
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                {formatTime(newsItem.time)}
              </Text>
            </View>
          </View>
          <Text
            className="text-sm mt-1"
            style={{ color: colors.textSecondary }}
            numberOfLines={1}
          >
            {newsItem.sourceDomain}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsCard;
