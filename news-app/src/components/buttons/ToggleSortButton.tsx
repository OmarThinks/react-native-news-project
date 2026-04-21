import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { SortingEnum, type SortingEnumType } from "@/types/SortingEnum";
import { SymbolView } from "expo-symbols";
import React from "react";
import {
    Text,
    TouchableOpacity
} from "react-native";

const ToggleSortButton = ({
  sortingState,
  setSortingState,
  resetOtherSorts,
  text,
}: {
  sortingState: SortingEnumType;
  setSortingState: (newActiveId: SortingEnumType) => void;
  resetOtherSorts: () => void;
  text: string;
}) => {
  const isActive = sortingState !== SortingEnum.NONE;

  const nextOptionIndex =
    sortingState === SortingEnum.NONE
      ? SortingEnum.ASC
      : sortingState === SortingEnum.ASC
        ? SortingEnum.DESC
        : SortingEnum.NONE;

  const onPress = () => {
    resetOtherSorts();
    setSortingState(nextOptionIndex);
  };

  const colors = useColors();

  const getIcon = () => {
    switch (sortingState) {
      case SortingEnum.ASC:
        return "arrow.up";
      case SortingEnum.DESC:
        return "arrow.down";
      case SortingEnum.NONE:
      default:
        return "line.3.horizontal";
    }
  };

  const buttonColor = isActive ? colors.primary : colors.text;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center gap-2 rounded-lg px-3 py-2"
      style={{ opacity: isActive ? 1 : 0.6 }}
    >
      <SymbolView
        name={getIcon()}
        size={18}
        tintColor={buttonColor}
        weight="semibold"
      />
      <Text style={{ color: buttonColor }} className="font-semibold">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleSortButton;
