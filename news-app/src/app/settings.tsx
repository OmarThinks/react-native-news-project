import { Header } from "@/components/Views/Header";
import { useColors, useThemeMode } from "@/redux/slices/themeSlice/colorsHooks";
import { setThemeMode } from "@/redux/slices/themeSlice/themeSlice";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const Settings = () => {
  const colors = useColors();

  return (
    <View
      className=" flex-1 self-stretch"
      style={{ backgroundColor: colors.background }}
    >
      <Header title="Settings" shouldHideSettings />
      <View className=" flex-1 self-stretch px-3">
        <View className=" self-stretch gap-2">
          <Text
            style={{ color: colors.text, fontSize: 44, fontWeight: "bold" }}
          >
            Theme:
          </Text>

          <ThemeModeComponent themeMode="light" />
          <ThemeModeComponent themeMode="dark" />
        </View>
      </View>
    </View>
  );
};

const ThemeModeComponent = ({ themeMode }: { themeMode: "light" | "dark" }) => {
  const colors = useColors();
  const activeThemeMode = useThemeMode();

  const isActive = activeThemeMode === themeMode;
  const backgroundColor = isActive ? colors.secondary : colors.background;

  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity
      style={{ backgroundColor, borderColor: colors.text }}
      className=" self-stretch border rounded-md px-4 py-2 mb-4 justify-center items-center"
      onPress={() => {
        if (!isActive) {
          dispatch(setThemeMode({ mode: themeMode }));
        }
      }}
    >
      <Text
        style={{ color: colors.text }}
        className="text-[32px] font-semibold"
      >
        {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)} Theme
      </Text>
    </TouchableOpacity>
  );
};

export default Settings;
