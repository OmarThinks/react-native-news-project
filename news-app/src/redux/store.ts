import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import bookmarksSlice from "./slices/bookmarks/bookmarksSlice";
import themeSlice from "./slices/themeSlice/themeSlice";

const store = configureStore({
  reducer: {
    [themeSlice.name]: themeSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [bookmarksSlice.name]: bookmarksSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => store.dispatch as AppDispatch;

export { store, useAppDispatch };
export type { AppDispatch, RootState };
