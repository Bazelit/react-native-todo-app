import useTheme from "@/src/hooks/use-theme";
import { View, Text } from "react-native";

const Settings = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.surface,
      }}
    >
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
