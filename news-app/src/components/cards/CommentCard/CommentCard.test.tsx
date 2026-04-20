import React from "react";
import { render } from "@testing-library/react-native";
import { CommentItemType } from "@/types/CommentItemType";
import * as colorsHooks from "@/redux/slices/themeSlice/colorsHooks";
import CommentCard from "./CommentCard";
import darkColors from "@/redux/slices/themeSlice/colors/darkColors";

jest.mock("@/redux/slices/themeSlice/colorsHooks");

const mockColors = darkColors;

describe("CommentCard", () => {
  beforeEach(() => {
    jest.spyOn(colorsHooks, "useColors").mockReturnValue(mockColors);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders short comment correctly", () => {
    const mockComment: CommentItemType = {
      by: "testuser",
      id: 123456,
      parent: 123455,
      text: "This is a short comment.",
      time: Math.floor(Date.now() / 1000),
      type: "comment",
    };

    const { toJSON } = render(<CommentCard commentItem={mockComment} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders long comment correctly", () => {
    const longText = "a".repeat(350);
    const mockComment: CommentItemType = {
      by: "testuser",
      id: 123456,
      parent: 123455,
      text: longText,
      time: Math.floor(Date.now() / 1000),
      type: "comment",
    };

    const { toJSON } = render(<CommentCard commentItem={mockComment} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders comment with HTML entities correctly", () => {
    const mockComment: CommentItemType = {
      by: "testuser",
      id: 123456,
      parent: 123455,
      text: "This is a comment with &#x27;single quotes&#x27; and <p>paragraphs</p>",
      time: Math.floor(Date.now() / 1000),
      type: "comment",
    };

    const { toJSON } = render(<CommentCard commentItem={mockComment} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("returns null when commentItem is null", () => {
    const { toJSON } = render(<CommentCard commentItem={null as any} />);
    expect(toJSON()).toBeNull();
  });
});
