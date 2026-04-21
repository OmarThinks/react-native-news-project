import type { CommentItemType } from "@/types/CommentItemType";
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
    data.by ??= "unknown";
    data.descendants ??= 0;
    data.id ??= id;
    data.kids ??= [];
    data.score ??= 0;
    data.time ??= Math.floor(Date.now() / 1000);
    data.title ??= "No title";
    data.url ??= "";

    // source domain
    try {
      const urlObj = new URL(data.url);
      data.sourceDomain = urlObj.hostname.replace("www.", "");
    } catch (error) {
      data.sourceDomain = "unknown";
    }
  } else if (data.type === "comment") {
    data.by ??= "unknown";
    data.id ??= id;
    data.parent ??= 0;
    data.text ??= "";
    data.time ??= Math.floor(Date.now() / 1000);
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
