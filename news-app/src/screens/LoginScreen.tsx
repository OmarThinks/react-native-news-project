import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { getAuth, signInAnonymously } from "@react-native-firebase/auth";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const colors = useColors();

  const handleSignIn = async () => {
    setIsLoading(true);
    signInAnonymously(getAuth())
      .then(() => {
        console.log("User signed in anonymously");
      })
      .catch((error) => {
        if (error.code === "auth/operation-not-allowed") {
          console.log("Enable anonymous in your firebase console.");
        }

        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View
      className="flex-1 items-center justify-center px-6"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header Section */}
      <View className="mb-12 items-center">
        <Text className="text-4xl font-bold" style={{ color: colors.primary }}>
          NewsHub
        </Text>
        <Text className="mt-2 text-lg" style={{ color: colors.textSecondary }}>
          Stay informed, stay ahead
        </Text>
      </View>

      {/* Description Section */}
      <View
        className="mb-16 rounded-lg p-6"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <Text
          className="text-center text-base leading-6"
          style={{ color: colors.text }}
        >
          Welcome to your personalized news experience. Get access to trending
          stories, breaking news, and topics that matter to you.
        </Text>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={handleSignIn}
        disabled={isLoading}
        className="w-full rounded-lg py-4"
        style={{
          backgroundColor: isLoading ? colors.secondary : colors.primary,
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator color={colors.background} size="small" />
            <Text
              className="ml-2 text-center text-lg font-semibold"
              style={{ color: colors.background }}
            >
              Signing in...
            </Text>
          </View>
        ) : (
          <Text
            className="text-center text-lg font-semibold"
            style={{ color: colors.background }}
          >
            Get Started
          </Text>
        )}
      </TouchableOpacity>

      {/* Footer Text */}
      <View className="mt-8 items-center">
        <Text className="text-sm" style={{ color: colors.textSecondary }}>
          Sign in anonymously to continue
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
