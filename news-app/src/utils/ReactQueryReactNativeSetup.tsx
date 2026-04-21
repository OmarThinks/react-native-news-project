import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import { Platform } from "react-native";

if (Platform.OS === "web") {
  // Web-specific implementation
} else {
  onlineManager.setEventListener((setOnline) => {
    let initialised = false;

    const eventSubscription = Network.addNetworkStateListener((state) => {
      initialised = true;
      setOnline(!!state.isConnected);
    });

    Network.getNetworkStateAsync()
      .then((state) => {
        if (!initialised) {
          setOnline(!!state.isConnected);
        }
      })
      .catch(() => {
        // getNetworkStateAsync can reject on some platforms/SDK versions
      });

    return eventSubscription.remove;
  });
}
