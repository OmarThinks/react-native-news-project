import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { TouchableOpacity } from "react-native";

const CircleIcon = ({
  size,
  onPress,
  borderRadius,
  color,
  borderWidth = 1,
  iconName,
}: {
  size: number;
  onPress: () => void;
  borderRadius: number;
  color: string;
  borderWidth?: number;
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderColor: color,
        width: size,
        height: size,
        borderRadius: borderRadius ?? size / 2,
        borderWidth,
      }}
      className=" justify-center items-center"
    >
      <MaterialCommunityIcons name={iconName} size={size / 2} color={color} />
    </TouchableOpacity>
  );
};

export default CircleIcon;
