import { useIsAppInitialized } from "@/hooks/useIsAppInitialized";
import { useColors, useThemeMode } from "@/redux/slices/themeSlice/colorsHooks";
import { store } from "@/redux/store";
import "@/utils/ReactQueryReactNativeSetup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import "../../global.css";

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppInsideRedux />
      </QueryClientProvider>
    </ReduxProvider>
  );
}

function AppInsideRedux() {
  const colors = useColors();
  const themeMode = useThemeMode();

  const isAppInitialized = useIsAppInitialized();

  if (!isAppInitialized) {
    return (
      <View className=" self-stretch flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background }}
      className=" self-stretch flex-1"
      edges={["top", "right", "left"]}
    >
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />

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
    </SafeAreaView>
  );
}

export default RootLayout;
