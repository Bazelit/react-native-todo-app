import { Button, Spinner } from "heroui-native";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/src/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import Header from "@/src/components/header";
import TodoInput from "@/src/components/todo-input";
import Todos from "@/src/components/todos";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />

      <SafeAreaView style={homeStyles.safeArea}>
        {todos === undefined ? (
          <Spinner className="mx-auto my-auto" size="lg" />
        ) : (
          <>
            <Header />
            <TodoInput />
            <Todos />
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
