import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice/themeSlice";

const store = configureStore({
  reducer: {
    [themeSlice.name]: themeSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => store.dispatch as AppDispatch;

export { store, useAppDispatch };
export type { AppDispatch, RootState };
