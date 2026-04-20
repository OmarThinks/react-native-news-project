import { useColors } from "@/colors/useColors";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const colors = useColors();

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <Text className="text-xl font-bold" style={{ color: colors.text }}>
        Welcome to our News App!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
