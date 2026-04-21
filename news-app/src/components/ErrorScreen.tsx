import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";

const ErrorScreen = ({
  refetch,
  isRefetching,
  error,
}: {
  refetch: () => void;
  isRefetching: boolean;
  error?: string;
}) => {
  const colors = useColors();

  return (
    <View
      className="self-stretch flex-1 justify-center items-center px-6"
      style={{ backgroundColor: colors.background }}
    >
      <View className="items-center">
        <Text
          className="text-2xl font-bold mb-3"
          style={{ color: colors.text }}
        >
          Oops! Something went wrong
        </Text>
        <Text
          className="text-center text-base mb-6"
          style={{ color: colors.text }}
        >
          {error || "An unexpected error occurred. Please try again."}
        </Text>
        <TouchableOpacity
          onPress={refetch}
          disabled={isRefetching}
          className="px-6 py-3 rounded-lg"
          style={{
            backgroundColor: colors.primary,
            opacity: isRefetching ? 0.6 : 1,
          }}
        >
          <Text
            className=" font-semibold text-center"
            style={{ color: colors.background }}
          >
            {isRefetching ? "Retrying..." : "Try Again"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorScreen;
