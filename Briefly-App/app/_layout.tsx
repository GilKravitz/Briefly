import { Slot, SplashScreen, Stack } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useEffect } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme } from "@/components/useColorScheme";
import { ArticleProvider } from "@/core/store/articleContext";
import i18n from "@/core/i18n";
import { SessionProvider } from "@/core/store/sessionContext";
import { FontSizeProvider } from "@/core/store/fontSizeContext";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import { useAppState } from "@/core/hooks/useAppState";
import { AppStateStatus, Platform } from "react-native";

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    i18n.locale = "he";
    console.log("ok");
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      // SplashScreen.hideAsync();
      timeout = setTimeout(() => {
        SplashScreen.hideAsync();
      }, 750);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Providers>
      {/* <Slot /> */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Providers>
  );
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <FontSizeProvider>
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
              <ArticleProvider>{children}</ArticleProvider>
            </SafeAreaProvider>
          </ThemeProvider>
        </FontSizeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};
