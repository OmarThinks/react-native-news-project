import { NewsItemType } from "@/types/NewsItemType";
import { SortingEnum, SortingEnumType } from "@/types/SortingEnum";

const getFilteredAndSortedNews = ({
  newsItems,
  searchText,
  scoreSorting,
  timeSorting,
}: {
  newsItems: (NewsItemType | undefined)[];
  searchText: string;
  scoreSorting: SortingEnumType;
  timeSorting: SortingEnumType;
}) => {
  const filteredNews = newsItems.filter((item) => {
    if (item == null) return false;
    if (item == undefined) return false;
    if (typeof item !== "object") return false;
    if (!("title" in item)) return false;
    if (!("url" in item)) return false;
    if (!(item?.type === "story")) return false;
    if (!searchText) return true;
    return item.title
      .trim()
      .toLowerCase()
      .includes(searchText.trim().toLowerCase());
  }) as NewsItemType[];

  if (scoreSorting === SortingEnum.NONE && timeSorting === SortingEnum.NONE) {
    return filteredNews;
  }
  if (scoreSorting !== SortingEnum.NONE) {
    filteredNews.sort((b, a) => {
      if (scoreSorting === SortingEnum.ASC) {
        return (a.score ?? 0) - (b.score ?? 0);
      } else {
        return (b.score ?? 0) - (a.score ?? 0);
      }
    });
  }
  if (timeSorting !== SortingEnum.NONE) {
    filteredNews.sort((b, a) => {
      if (timeSorting === SortingEnum.ASC) {
        return (a.time ?? 0) - (b.time ?? 0);
      } else {
        return (b.time ?? 0) - (a.time ?? 0);
      }
    });
  }

  // Apply sorting logic here if needed
  return filteredNews;
};

export { getFilteredAndSortedNews };
