import { useSelector } from "react-redux";
import { RootState } from "../../store";

const useColors = () => {
  return useSelector((state: RootState) => state.theme.colors);
};

const useThemeMode = () => {
  return useSelector((state: RootState) => state.theme.themeMode);
};

export { useColors, useThemeMode };
