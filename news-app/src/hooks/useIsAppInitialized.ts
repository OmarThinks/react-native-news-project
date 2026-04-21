import { setUser } from "@/redux/slices/auth/authSlice";
import { initializeBookMarks } from "@/redux/slices/bookmarks/bookmarksSlice";
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
    dispatch(initializeBookMarks());
  }, [dispatch]);

  useEffect(() => {
    const initializeAuth = () => {
      //console.log("initializing auth...");
      AsyncStorage.getItem(StorageKeysEnum.USER)
        .then((storedUser) => {
          if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)));
          } else {
            dispatch(setUser(null));
          }
        })
        .catch((error) => {
          console.error("Error initializing auth:", error);
          dispatch(setUser(null));
        })
        .finally(() => {
          setIsAuthInitialized(true);
        });
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    const initializeTheme = async () => {
      //console.log("initializing theme...");
      const storedThemeMode = await AsyncStorage.getItem(
        StorageKeysEnum.THEME_MODE,
      );

      if (storedThemeMode === "light") {
        dispatch(setThemeMode({ mode: "light" }));
      } else if (storedThemeMode === "dark") {
        dispatch(setThemeMode({ mode: "dark" }));
      } else {
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
