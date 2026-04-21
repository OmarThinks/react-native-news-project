import { setUser } from "@/redux/slices/auth/authSlice";
import { setThemeMode } from "@/redux/slices/themeSlice/themeSlice";
import { useAppDispatch } from "@/redux/store";
import { StorageKeysEnum } from "@/storage/StorageKeysEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useIsAppInitialized = () => {
  const [isThemeInitialized, setIsThemeInitialized] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeTheme = async () => {
      console.log("initializing theme...");
      const storedThemeMode = await AsyncStorage.getItem(
        StorageKeysEnum.THEME_MODE,
      );

      if (storedThemeMode === "light") {
        dispatch(setThemeMode({ mode: "light" }));
      } else if (storedThemeMode === "dark") {
        dispatch(setThemeMode({ mode: "dark" }));
      }

      setIsThemeInitialized(true);
    };

    initializeTheme();
  }, []);

  const isAppInitialized = isThemeInitialized && isAuthInitialized;

  return isAppInitialized;
};

export { useIsAppInitialized };
