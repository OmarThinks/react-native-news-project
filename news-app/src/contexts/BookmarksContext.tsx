import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toggleBookmark } from "@/redux/slices/bookmarks/bookmarksSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

const BookmarksContext = createContext<{
  bookmarkSet: Set<number>;
  toggleBookmark: (id: number) => void;
}>({
  bookmarkSet: new Set(),
  toggleBookmark: () => {},
});

const useBookmarksContext = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
};

const BookmarksProvider = ({ children }: { children: React.ReactNode }) => {
  const bookmarks = useSelector(
    (state: RootState) => state.bookmarks.bookmarks,
  );
  const dispatch = useDispatch<AppDispatch>();
  const bookmarkSet = useMemo(() => new Set(bookmarks), [bookmarks]);

  const _toggleBookmark = useCallback(
    (id: number) => {
      dispatch(toggleBookmark({ articleId: id }));
    },
    [dispatch],
  );

  return (
    <BookmarksContext.Provider
      value={{ bookmarkSet, toggleBookmark: _toggleBookmark }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export { BookmarksContext, BookmarksProvider, useBookmarksContext };
