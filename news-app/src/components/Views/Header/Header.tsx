import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNetworkState } from "expo-network";
import { router, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Header({
  title,
  shouldHideSettings = true,
  shouldHideBackButton = true,
}: {
  title: string;
  shouldHideSettings?: boolean;
  shouldHideBackButton?: boolean;
}) {
  const colors = useColors();
  const { canGoBack, back } = useRouter();

  const { isInternetReachable, isConnected, type } = useNetworkState();

  // console.log(isInternetReachable, isConnected, type);

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

      <TouchableOpacity
        className=" rounded-full self-stretch aspect-square justify-center items-center"
        style={{
          borderColor: isInternetReachable ? colors.primary : colors.error,
        }}
      >
        <MaterialCommunityIcons
          name={isInternetReachable ? "wifi" : "wifi-off"}
          size={20}
          color={isInternetReachable ? colors.primary : colors.error}
        />
      </TouchableOpacity>
    </View>
  );
}

export { Header };
