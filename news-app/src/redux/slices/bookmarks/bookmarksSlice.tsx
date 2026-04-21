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

    setBookMarks: (state, action: PayloadAction<{ bookmarks: number[] }>) => {
      state.bookmarks = action.payload.bookmarks;
    },


  },
});

export const { toggleBookmark, removeAllBookmarks, setBookMarks } =
  bookmarksSlice.actions;
export default bookmarksSlice;
