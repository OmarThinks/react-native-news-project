import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import * as colorsHooks from "@/redux/slices/themeSlice/colorsHooks";
import { useRouter } from "expo-router";
import { Header } from "./Header";
import darkColors from "@/redux/slices/themeSlice/colors/darkColors";

jest.mock("@/redux/slices/themeSlice/colorsHooks");
jest.mock("expo-router");

const mockColors = darkColors;

describe("Header", () => {
  const mockBack = jest.fn();
  const mockCanGoBack = jest.fn(() => false);

  beforeEach(() => {
    jest.spyOn(colorsHooks, "useColors").mockReturnValue(mockColors);
    (useRouter as jest.Mock).mockReturnValue({
      canGoBack: mockCanGoBack,
      back: mockBack,
    });
    mockBack.mockClear();
    mockCanGoBack.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders with title only (default settings and back button hidden)", () => {
    const { toJSON } = render(
      <Header
        title="Home"
        shouldHideSettings={true}
        shouldHideBackButton={true}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with back button visible", () => {
    mockCanGoBack.mockReturnValue(true);
    const { toJSON } = render(
      <Header
        title="Details"
        shouldHideSettings={true}
        shouldHideBackButton={false}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with settings button visible", () => {
    const { toJSON } = render(
      <Header
        title="Home"
        shouldHideSettings={false}
        shouldHideBackButton={true}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders with both back and settings buttons visible", () => {
    mockCanGoBack.mockReturnValue(true);
    const { toJSON } = render(
      <Header
        title="Details"
        shouldHideSettings={false}
        shouldHideBackButton={false}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
