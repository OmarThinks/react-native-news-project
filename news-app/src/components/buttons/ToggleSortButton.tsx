import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { SortingEnum, type SortingEnumType } from "@/types/SortingEnum";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

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
        return "sort-ascending";
      case SortingEnum.DESC:
        return "sort-descending";
      case SortingEnum.NONE:
      default:
        return "sort";
    }
  };

  const buttonColor = isActive ? colors.primary : colors.text;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center gap-2 rounded-lg px-3 py-2"
      style={{
        opacity: isActive ? 1 : 0.6,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: buttonColor,
      }}
    >
      <MaterialCommunityIcons name={getIcon()} size={18} color={buttonColor} />
      <Text style={{ color: buttonColor }} className="font-semibold">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleSortButton;
