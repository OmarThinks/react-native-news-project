import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NewsItemType } from "@/types/NewsItemType";
import * as colorsHooks from "@/redux/slices/themeSlice/colorsHooks";
import { router } from "expo-router";
import NewsCard from "./NewsCard";
import darkColors from "@/redux/slices/themeSlice/colors/darkColors";

jest.mock("@/redux/slices/themeSlice/colorsHooks");
jest.mock("expo-router");

const mockColors = darkColors;

describe("NewsCard", () => {
  beforeEach(() => {
    jest.spyOn(colorsHooks, "useColors").mockReturnValue(mockColors);
    jest.spyOn(router, "push").mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders news item correctly", () => {
    const mockNews: NewsItemType = {
      by: "testuser",
      id: 123456,
      score: 150,
      title: "Test News Title",
      time: Math.floor(Date.now() / 1000),
      type: "story",
      url: "https://example.com",
      descendants: 10,
      kids: [123457, 123458],
    };

    const { toJSON } = render(<NewsCard newsItem={mockNews} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with long title correctly", () => {
    const mockNews: NewsItemType = {
      by: "testuser",
      id: 123456,
      score: 150,
      title:
        "This is a very long news title that spans multiple lines and tests how the component handles lengthy titles in the UI",
      time: Math.floor(Date.now() / 1000),
      type: "story",
      url: "https://example.com",
      descendants: 0,
      kids: [],
    };

    const { toJSON } = render(<NewsCard newsItem={mockNews} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with high score correctly", () => {
    const mockNews: NewsItemType = {
      by: "testuser",
      id: 123456,
      score: 5000,
      title: "Popular News Item",
      time: Math.floor(Date.now() / 1000),
      type: "story",
      url: "https://example.com",
      descendants: 100,
      kids: [123457, 123458, 123459],
    };

    const { toJSON } = render(<NewsCard newsItem={mockNews} />);
    expect(toJSON()).toMatchSnapshot();
  });

  /*
  it("calls router.push when pressed", () => {
    const mockNews: NewsItemType = {
      by: "testuser",
      id: 123456,
      score: 150,
      title: "Test News Title",
      time: Math.floor(Date.now() / 1000),
      type: "story",
      url: "https://example.com",
      descendants: 10,
      kids: [123457, 123458],
    };

    const { getByRole } = render(<NewsCard newsItem={mockNews} />);
    const touchable = getByRole("button");
    fireEvent.press(touchable);

    expect(router.push).toHaveBeenCalledWith("/news/123456");
  });
  */

  it("returns null when newsItem is null", () => {
    const { toJSON } = render(<NewsCard newsItem={null as any} />);
    expect(toJSON()).toBeNull();
  });
});
