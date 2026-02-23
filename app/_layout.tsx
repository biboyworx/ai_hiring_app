/**
 * Root Layout — Registers all app routes and handles font loading.
 * Uses expo-router Stack navigator for screen transitions.
 */
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { useAuthStore } from "@/hooks/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/global.css";

export { ErrorBoundary } from "expo-router";

// for tanstack query wrapper
const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const initialize = useAuthStore((state) => state.initialize);

  // Kick off the auth session check as early as possible.
  useEffect(() => {
    initialize();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* ── Entry & Onboarding ── */}
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />

          {/* ── Auth flow ── */}
          <Stack.Screen name="(auth)" />

          {/* ── Main tabs ── */}
          <Stack.Screen name="(tabs)" />

          {/* ── Resume flow ── */}
          <Stack.Screen name="resume-upload" />
          <Stack.Screen name="resume-parsing" />
          <Stack.Screen name="resume-preview" />

          {/* ── Interview flow ── */}
          <Stack.Screen name="interview-instructions" />
          <Stack.Screen name="interview-live" />
          <Stack.Screen name="interview-processing" />
          <Stack.Screen name="interview-completed" />

          {/* ── Scoring / Results ── */}
          <Stack.Screen name="score-summary" />
          <Stack.Screen name="score-detailed" />
          <Stack.Screen name="score-feedback" />

          {/* ── Notifications ── */}
          <Stack.Screen name="notifications" />

          {/* ── Profile & Career ── */}
          <Stack.Screen name="edit-profile" />
          <Stack.Screen name="career-info" />

          {/* ── Jobs & Application flow ── */}
          <Stack.Screen name="job-detail" />
          <Stack.Screen name="job-preferences" />
          <Stack.Screen name="application-match" />
          <Stack.Screen name="application-status" />

          {/* ── Settings detail ── */}
          <Stack.Screen name="account-info" />
          <Stack.Screen name="change-password" />
          <Stack.Screen name="notification-settings" />
          <Stack.Screen name="language-settings" />
          <Stack.Screen name="privacy-policy" />
          <Stack.Screen name="terms-of-service" />
          <Stack.Screen name="delete-account" />

          {/* ── Support ── */}
          <Stack.Screen name="faq" />
          <Stack.Screen name="contact-support" />
          <Stack.Screen name="submit-ticket" />

          {/* ── Modal ── */}
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", headerShown: true }}
          />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
