import { useColors } from "@/redux/slices/themeSlice/colorsHooks";
import { Text, View } from "react-native";

function Index() {
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

export default Index;
