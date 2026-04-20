import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getNewsByIdQueryFn } from "@/api/newsApi";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import NewsCard from "@/components/cards/NewsCard";
import { NewsItemType } from "@/types/NewsItemType";
import { CommentItemType } from "@/types/CommentItemType";
import CommentCard from "@/components/cards/CommentCard";

const NewsDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useQuery({
    queryKey: ["news-item", id],
    queryFn: () => getNewsByIdQueryFn<NewsItemType>(Number(id)),
  });

  console.log(
    "NewsDetailsScreen rendered with id:",
    id,
    "data:",
    JSON.stringify(data, null, 2),
  );

  const colors = useColors();

  // getting the kids news
  const { data: _comments, pending: commentsPending } = useQueries({
    queries:
      data?.kids.map((kidId) => ({
        queryKey: ["news-item", kidId],
        queryFn: () => getNewsByIdQueryFn<CommentItemType>(kidId),
      })) ?? [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const comments = _comments.filter((item) => item != null);

  console.log("kidNews", JSON.stringify(comments, null, 2));

  const handleOpenURL = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
    >
      {/* Main Article Title */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: colors.text,
          marginBottom: 16,
          lineHeight: 32,
        }}
      >
        {data.title}
      </Text>

      {/* Article Metadata */}
      <View
        style={{
          backgroundColor: colors.card || colors.background,
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: colors.border || "transparent",
        }}
      >
        <View style={{ marginBottom: 8 }}>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
            By <Text style={{ fontWeight: "600" }}>{data.by}</Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
            ⬆️ Score: {data.score}
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
            💬 Comments: {data.descendants}
          </Text>
        </View>

        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
          📅 {formatDate(data.time)}
        </Text>
      </View>

      {/* URL Link */}
      {data.url && (
        <TouchableOpacity
          onPress={() => handleOpenURL(data.url)}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Read Full Article →
          </Text>
        </TouchableOpacity>
      )}

      {/* Related News/Comments Section */}
      {comments && comments.length > 0 && (
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text,
              marginBottom: 12,
            }}
          >
            Related Discussion ({comments.length})
          </Text>

          {commentsPending && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 16,
              }}
            >
              <ActivityIndicator color={colors.primary} />
            </View>
          )}

          <View style={{ gap: 12 }}>
            {comments.map(
              (item, index) =>
                item && (
                  <CommentCard key={`${item.id}-${index}`} commentItem={item} />
                ),
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default NewsDetailsScreen;
