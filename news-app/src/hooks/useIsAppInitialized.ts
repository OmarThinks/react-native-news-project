import { setUser } from "@/redux/slices/auth/authSlice";
import { setBookMarks } from "@/redux/slices/bookmarks/bookmarksSlice";
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
    try {
      AsyncStorage.getItem(StorageKeysEnum.BOOKMARKS)
        .then((storedBookmarks) => {
          if (storedBookmarks) {
            const bookmarksArray = JSON.parse(storedBookmarks);
            if (Array.isArray(bookmarksArray)) {
              dispatch(setBookMarks({ bookmarks: bookmarksArray }));
            } else {
              console.warn(
                "Invalid bookmarks data in storage, expected an array:",
                storedBookmarks,
              );
            }
          } else {
            dispatch(setBookMarks({ bookmarks: [] }));
          }
        })
        .catch((error) => {
          console.error("Error initializing bookmarks:", error);
          dispatch(setBookMarks({ bookmarks: [] }));
        });
    } catch (error) {
      console.error("Error parsing bookmarks from storage:", error);
      dispatch(setBookMarks({ bookmarks: [] }));
    }
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
