import { Stack } from "expo-router";
import { ThemeProvider } from "../hooks/use-theme";
import { HeroUINativeProvider, ToastProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "../global.css";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <HeroUINativeProvider>
          <ToastProvider>
            <ThemeProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
              </Stack>
            </ThemeProvider>
          </ToastProvider>
        </HeroUINativeProvider>
      </GestureHandlerRootView>
    </ConvexProvider>
  );
}
