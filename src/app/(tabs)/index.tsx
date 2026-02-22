import { Button, Spinner } from "heroui-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/src/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import Header from "@/src/components/header";
import TodoInput from "@/src/components/todo-input";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const todos = useQuery(api.todos.getTodos);
  const homeStyles = createHomeStyles(colors);

  if (todos === undefined) {
    return (
      <SafeAreaView style={homeStyles.safeArea}>
        <Spinner size="lg" />
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />

      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <Button onPress={() => toggleDarkMode()}>Theme</Button>
      </SafeAreaView>
    </LinearGradient>
  );
}
