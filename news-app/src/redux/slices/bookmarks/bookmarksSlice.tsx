import { StorageKeysEnum } from "@/storage/StorageKeysEnum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookmarksState = {
  bookmarks: Set<number>;
};

const initialState: BookmarksState = {
  bookmarks: new Set(),
};

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    removeAllBookmarks: (state) => {
      state.bookmarks = new Set();
      AsyncStorage.removeItem(StorageKeysEnum.BOOKMARKS);
    },

    toggleBookmark: (state, action: PayloadAction<{ articleId: number }>) => {
      const articleId = action.payload.articleId;
      if (state.bookmarks.has(articleId)) {
        state.bookmarks.delete(articleId);
      } else {
        state.bookmarks.add(articleId);
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
            state.bookmarks = new Set(bookmarksArray);
          }
        });
      } catch (error) {}
    },
  },
});

export const { toggleBookmark, removeAllBookmarks, initializeBookMarks } =
  bookmarksSlice.actions;
export default bookmarksSlice;
