// https://hacker-news.firebaseio.com/v0/topstories.json
const getAllTopNewsQueryFn = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );
  const data = (await response.json()) as number[];
  return data;
};

export { getAllTopNewsQueryFn };
