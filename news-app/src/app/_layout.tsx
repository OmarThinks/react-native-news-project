import { useColors } from "@/colors/useColors";
import "../../global.css";
import { Stack } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function RootLayout() {
  const colors = useColors();

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.text}
      labelStyle={{ selected: { color: colors.text } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
