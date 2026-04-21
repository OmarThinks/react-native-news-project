type NewsItemType = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
  sourceDomain: string;
  imageUrl: string;
};

export type { NewsItemType };
