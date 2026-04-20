import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import * as colorsHooks from "@/redux/slices/themeSlice/colorsHooks";
import { useRouter } from "expo-router";
import { Header } from "./Header";
import darkColors from "@/redux/slices/themeSlice/colors/darkColors";

// --- FIX STARTS HERE ---
// Mocking @expo/vector-icons prevents the async font-loading state updates
jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    Ionicons: (props: any) => <View {...props} />,
    MaterialIcons: (props: any) => <View {...props} />,
    MaterialCommunityIcons: (props: any) => <View {...props} />,
    // Add any other specific icon sets you use in Header here
  };
});
// --- FIX ENDS HERE ---

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

  it("renders with title only (default settings and back button hidden)", async () => {
    const { toJSON } = render(
      <Header
        title="Home"
        shouldHideSettings={true}
        shouldHideBackButton={true}
      />,
    );

    // Using waitFor is a safety net for any other minor async updates
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("renders with back button visible", async () => {
    mockCanGoBack.mockReturnValue(true);
    const { toJSON } = render(
      <Header
        title="Details"
        shouldHideSettings={true}
        shouldHideBackButton={false}
      />,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("renders with settings button visible", async () => {
    const { toJSON } = render(
      <Header
        title="Home"
        shouldHideSettings={false}
        shouldHideBackButton={true}
      />,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("renders with both back and settings buttons visible", async () => {
    mockCanGoBack.mockReturnValue(true);
    const { toJSON } = render(
      <Header
        title="Details"
        shouldHideSettings={false}
        shouldHideBackButton={false}
      />,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
