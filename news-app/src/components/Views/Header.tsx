import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";

function Header({
  title,
  shouldHideSettings = false,
  shouldHideBackButton = false,
}: {
  title: string;
  shouldHideSettings?: boolean;
  shouldHideBackButton?: boolean;
}) {
  const colors = useColors();
  const { canGoBack, back } = useRouter();

  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: colors.secondary,
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      {canGoBack() && !shouldHideBackButton && (
        <TouchableOpacity
          className=" rounded-full self-stretch aspect-square justify-center items-center border"
          onPress={back}
          style={{ borderColor: colors.text }}
        >
          <FontAwesome6 name="chevron-left" size={24} color={colors.text} />
        </TouchableOpacity>
      )}

      <Text
        style={{ color: colors.text }}
        className="flex-1 text-[24px] font-bold"
      >
        {title}
      </Text>

      {!shouldHideSettings && (
        <TouchableOpacity
          className=" rounded-full self-stretch aspect-square justify-center items-center border"
          onPress={() => {
            router.navigate("/settings");
          }}
          style={{ borderColor: colors.text }}
        >
          <FontAwesome6 name="gear" size={24} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export { Header };
