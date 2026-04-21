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
    addBookmark: (state, action: PayloadAction<{ articleId: number }>) => {
      const articleId = action.payload.articleId;
      if (!state.bookmarks.includes(articleId)) {
        state.bookmarks.push(articleId);
      }
      AsyncStorage.setItem(
        StorageKeysEnum.BOOKMARKS,
        state.bookmarks.toString(),
      );
    },
    removeBookmark: (state, action: PayloadAction<{ articleId: number }>) => {
      const articleId = action.payload.articleId;
      state.bookmarks = state.bookmarks.filter((id) => id !== articleId);
      AsyncStorage.setItem(
        StorageKeysEnum.BOOKMARKS,
        state.bookmarks.toString(),
      );
    },
    removeAllBookmarks: (state) => {
      state.bookmarks = [];
      AsyncStorage.removeItem(StorageKeysEnum.BOOKMARKS);
    },
  },
});

export const { addBookmark, removeBookmark, removeAllBookmarks } =
  bookmarksSlice.actions;
export default bookmarksSlice;
