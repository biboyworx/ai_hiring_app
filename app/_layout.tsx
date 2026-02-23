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
import * as QueryParams from "expo-auth-session/build/QueryParams";
import { useFonts } from "expo-font";
import * as Linking from "expo-linking";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { useAuthStore } from "@/hooks/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

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

  /**
   * Deep-link handler — catches the Supabase email confirmation redirect.
   *
   * When the user taps the confirmation link in their email, it opens the app
   * via the `myapp://` scheme with tokens in the URL fragment:
   *   myapp://...#access_token=...&refresh_token=...
   *
   * We parse those tokens and call supabase.auth.setSession() to log them in.
   */
  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const url = event.url;
      console.log(url);
      if (!url) return;

      // The tokens live in the URL fragment (#access_token=...&refresh_token=...)
      const hashIndex = url.indexOf("#");
      if (hashIndex === -1) return;

      const fragment = url.substring(hashIndex + 1);
      const { params } = QueryParams.getQueryParams(`?${fragment}`);

      const accessToken = params?.access_token;
      const refreshToken = params?.refresh_token;

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error("[DeepLink] Failed to set session:", error.message);
        } else {
          // Session is set — onAuthStateChange in AuthContext will update the
          // store automatically, which triggers the index route to redirect
          // to /(tabs).
          router.replace("/(tabs)");
        }
      }
    };

    // Handle the URL that opened the app (cold start)
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    // Handle URLs while the app is already open (warm start)
    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => subscription.remove();
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
        <Toast />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
