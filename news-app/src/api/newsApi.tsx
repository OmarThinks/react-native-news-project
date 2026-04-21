import { CommentItemType } from "@/types/CommentItemType";
import type { NewsItemType } from "@/types/NewsItemType";

// https://hacker-news.firebaseio.com/v0/topstories.json
const getAllTopNewsQueryFn = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );
  const data = (await response.json()) as number[];
  return data;
};

// /item/{id}.json
// Example: https://hacker-news.firebaseio.com/v0/item/47796264.json

const getNewsByIdQueryFn = async <T extends NewsItemType | CommentItemType>(
  id: number,
): Promise<T> => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  );
  const data = (await response.json()) as T;

  if (data.type === "story") {
    // random from 1 to 70
    const randomNumber = Math.floor(Math.random() * 70) + 1;
    data.imageUrl = `https://picsum.photos/300/300?random=${randomNumber}`;
  }

  return data;
};

/*
{
  "by": "mfiguiere",
  "descendants": 1,
  "id": 47796264,
  "kids": [47797004],
  "score": 6,
  "time": 1776358694,
  "title": "Best practices for using Claude Opus 4.7 with Claude Code",
  "type": "story",
  "url": "https://claude.com/blog/best-practices-for-using-claude-opus-4-7-with-claude-code"
}
*/

export { getAllTopNewsQueryFn, getNewsByIdQueryFn };
