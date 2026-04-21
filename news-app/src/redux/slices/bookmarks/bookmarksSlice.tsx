import { StorageKeysEnum } from "@/storage/StorageKeysEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookmarksState = {
  bookmarks: number[];
};

const initialState: BookmarksState = {
  bookmarks: [],
};

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    removeAllBookmarks: (state) => {
      state.bookmarks = [];
      AsyncStorage.removeItem(StorageKeysEnum.BOOKMARKS);
    },

    toggleBookmark: (state, action: PayloadAction<{ articleId: number }>) => {
      const articleId = action.payload.articleId;
      if (state.bookmarks.includes(articleId)) {
        state.bookmarks = state.bookmarks.filter((id) => id !== articleId);
      } else {
        state.bookmarks.push(articleId);
      }
      AsyncStorage.setItem(
        StorageKeysEnum.BOOKMARKS,
        JSON.stringify([...state.bookmarks]),
      );
    },

    initializeBookMarks: (state) => {
      try {
        AsyncStorage.getItem(StorageKeysEnum.BOOKMARKS).then((value) => {
          if (value) {
            const bookmarksArray: number[] = JSON.parse(value);
            state.bookmarks = bookmarksArray;
          }
        });
      } catch (error) {
        console.error("Error initializing bookmarks:", error);
      }
    },
  },
});

export const { toggleBookmark, removeAllBookmarks, initializeBookMarks } =
  bookmarksSlice.actions;
export default bookmarksSlice;
