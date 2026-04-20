import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { store } from "@/redux/store";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Provider as ReduxProvider } from "react-redux";
import "../../global.css";

function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <AppInsideRedux />
    </ReduxProvider>
  );
}

function AppInsideRedux() {
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

export default RootLayout;
