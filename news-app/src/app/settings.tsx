import { View, Text } from "react-native";
import React from "react";
import { useColors } from "@/colors/useColors";

const settings = () => {
  const colors = useColors();
  return (
    <View
      className=" flex-1 justify-center items-center"
      style={{ backgroundColor: colors.background }}
    >
      <Text className="text-xl font-bold" style={{ color: colors.text }}>
        Settings
      </Text>
    </View>
  );
};

export default settings;
