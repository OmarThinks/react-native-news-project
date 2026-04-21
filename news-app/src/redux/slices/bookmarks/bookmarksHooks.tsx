import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { removeAllBookmarks, toggleBookmark } from "./bookmarksSlice";

const useBookmarks = () => {
  const bookmarks = useSelector((state: RootState) => state.bookmarks);
  const dispatch = useDispatch();

  const _toggleBookmark = (articleId: number) => {
    dispatch(toggleBookmark({ articleId }));
  };

  const _removeAllBookmarks = () => {
    dispatch(removeAllBookmarks());
  };

  return {
    bookmarks,
    toggleBookmark: _toggleBookmark,
    removeAllBookmarks: _removeAllBookmarks,
  };
};

export default useBookmarks;
