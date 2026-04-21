import { setUser } from "@/redux/slices/auth/authSlice";
import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const colors = useColors();

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (isLoading) {
      return;
    }
    dispatch(setUser({ id: "123", name: "John Doe" }));
    setIsLoading(true);
  };

  return (
    <View
      className="flex-1 items-center justify-center px-6"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header Section */}
      <View className="mb-12 items-center">
        <Text className="text-4xl font-bold" style={{ color: colors.primary }}>
          Tech News
        </Text>
        <Text className="mt-2 text-lg" style={{ color: colors.text }}>
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
        className=" rounded-lg py-4 self-stretch"
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
          <View className=" self-stretch items-center justify-center flex-row gap-2">
            <Text
              className="text-center text-lg font-semibold"
              style={{ color: colors.background }}
            >
              Get Started
            </Text>
            <MaterialCommunityIcons
              name="arrow-right-thick"
              size={24}
              color={colors.background}
            />
          </View>
        )}
      </TouchableOpacity>

      {/* Footer Text */}
      <View className="mt-8 items-center">
        <Text className="text-sm" style={{ color: colors.text }}>
          Sign in anonymously to continue
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
