import React, { useMemo } from "react";
import { Text, View } from "react-native";

const ToggleSortButton = ({
  options,
  activeId,
  defaultId,
  setActiveId,
  resetOtherSorts,
}: {
  options: ToggleSortButtonItemType[];
  activeId: number;
  defaultId: number;
  setActiveId: (newActiveId: number) => void;
  resetOtherSorts: () => void;
}) => {
  const isActive = activeId === defaultId;

  let currentOptionIndex = useMemo(() => {
    for (let index = 0; index < options.length; index++) {
      const _option = options[index];
      if (_option.id === activeId) {
        return index;
      }
    }

    return 0;
  }, [options, activeId]);

  const nextOptionIndex =
    currentOptionIndex + 1 >= options.length ? 0 : currentOptionIndex + 1;

  const onPress = () => {
    resetOtherSorts();
    setActiveId(nextOptionIndex);
  };

  const currentObject: ToggleSortButtonItemType = useMemo(() => {
    return options[0];
  }, []);

  return (
    <View>
      <Text>ToggleSortButton</Text>
    </View>
  );
};

type ToggleSortButtonItemType = {
  id: number;
  iconName: string;
  text: string;
};

export default ToggleSortButton;
export type { ToggleSortButtonItemType };
