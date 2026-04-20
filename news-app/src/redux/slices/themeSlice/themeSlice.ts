import { StorageKeysEnum } from "@/storage/StorageKeysEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeColorsType } from "./colors/ThemeColorsType";
import darkColors from "./colors/darkColors";
import lightColors from "./colors/lightColors";

type ThemeState = {
  colors: ThemeColorsType;
  themeMode: "light" | "dark";
};

let initialState: ThemeState = {
  colors: darkColors,
  themeMode: "dark",
};

/*
initialState = {
  colors: lightColors,
  themeMode: "light",
};*/

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (
      state,
      action: PayloadAction<{ mode: "light" | "dark" }>,
    ) => {
      const mode = action.payload.mode;
      state.themeMode = mode;
      state.colors = mode === "light" ? lightColors : darkColors;
      AsyncStorage.setItem(StorageKeysEnum.THEME_MODE, mode);
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice;
