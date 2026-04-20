import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { CommentItemType } from "@/types/CommentItemType";

const CommentCard = ({ commentItem }: { commentItem: CommentItemType }) => {
  const colors = useColors();
  const [isExpanded, setIsExpanded] = useState(false);
  const CHARACTER_LIMIT = 300;

  if (!commentItem) {
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

  const cleanText = commentItem.text
    .replace(/<p>/g, "\n\n")
    .replace(/<\/p>/g, "")
    .replace(/&#x27;/g, "'")
    .trim();

  const isLongComment = cleanText.length > CHARACTER_LIMIT;
  const displayText = isExpanded
    ? cleanText
    : cleanText.substring(0, CHARACTER_LIMIT) + (isLongComment ? "..." : "");

  return (
    <View
      className="p-4 m-2 rounded-lg shadow-sm"
      style={{ backgroundColor: colors.surface, borderColor: colors.border }}
    >
      <Text className="text-base mb-2 leading-5" style={{ color: colors.text }}>
        {displayText}
      </Text>
      {isLongComment && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text
            className="text-sm font-semibold mb-3"
            style={{ color: colors.textSecondary }}
          >
            {isExpanded ? "Show Less" : "Show More"}
          </Text>
        </TouchableOpacity>
      )}
      <View className="flex-row justify-between items-center">
        <Text className="text-sm" style={{ color: colors.textSecondary }}>
          by {commentItem.by}
        </Text>
        <View className="flex-row items-center">
          <Text
            className="text-sm mr-2"
            style={{ color: colors.textSecondary }}
          >
            {commentItem.id}
          </Text>
          <Text className="text-sm" style={{ color: colors.textSecondary }}>
            {formatTime(commentItem.time)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
