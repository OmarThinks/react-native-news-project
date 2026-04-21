import { View, Text } from "react-native";
import React from "react";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { Header } from "@/components/Views/Header/Header";
import { Modal } from "react-native";

const Bookmarks = () => {
  const colors = useColors();

  return (
    <View
      className="self-stretch flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Bookmarks" shouldHideBackButton />
      <View className="self-stretch flex-1 justify-center items-center px-6"></View>
    </View>
  );
};

export default Bookmarks;
