import { View, Text, TextInput } from "react-native";
import React from "react";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import ToggleSortButton from "./ToggleSortButton";
import { SortingEnum, type SortingEnumType } from "@/types/SortingEnum";

const SortButtonsAndSearchBar = ({
  textInputValue,
  setTextInputValue,
  scoreSortingState,
  setScoreSortingState,
  timeSortingState,
  setTimeSortingState,
}: {
  textInputValue: string;
  setTextInputValue: (newValue: string) => void;
  scoreSortingState: SortingEnumType;
  setScoreSortingState: (newActiveId: SortingEnumType) => void;
  timeSortingState: SortingEnumType;
  setTimeSortingState: (newActiveId: SortingEnumType) => void;
}) => {
  const colors = useColors();

  return (
    <View className=" self-stretch gap-1 py-3">
      <TextInput
        placeholder="Search..."
        value={textInputValue}
        onChangeText={setTextInputValue}
        style={{
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          color: colors.text,
          borderColor: colors.border,
          borderWidth: 1,
        }}
      />
      <View className=" self-stretch flex-row flex-wrap gap-2">
        <ToggleSortButton
          sortingState={scoreSortingState}
          setSortingState={setScoreSortingState}
          resetOtherSorts={() => setTimeSortingState(SortingEnum.NONE)}
          text="Score"
        />
        <ToggleSortButton
          sortingState={timeSortingState}
          setSortingState={setTimeSortingState}
          resetOtherSorts={() => setScoreSortingState(SortingEnum.NONE)}
          text="Time"
        />
      </View>
    </View>
  );
};

export default SortButtonsAndSearchBar;
