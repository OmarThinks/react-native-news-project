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

  /*
  example data:
  {
  "by": "rao-v",
  "id": 47829343,
  "kids": [
    47839091
  ],
  "parent": 47808956,
  "text": "I don’t really think this reflects the current era of challenges?<p>The “enforcement layer” is the hardest and most important part, and is barely addressed.<p>- is the answer structurally &#x2F; syntactically valid?<p>- is it appropriately grounded and evidenced?<p>- is it accurate? In what ways does it fall short?<p>Each of these should be triggering an agent to rework and resubmit etc. or failing that a disclosure to the user about how the answer falls short and should be reviewed &#x2F; remediated.<p>This feels like it’s from the era of trying to oneshot a good enough answer.",
  "time": 1776648396,
  "type": "comment"
}
  
  */

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
      {kidNews && kidNews.length > 0 && (
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text,
              marginBottom: 12,
            }}
          >
            Related Discussion ({kidNews.length})
          </Text>

          {kidNewsPending && (
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
            {kidNews.map(
              (item, index) =>
                item && (
                  <NewsCard key={`${item.id}-${index}`} newsItem={item} />
                ),
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default NewsDetailsScreen;
