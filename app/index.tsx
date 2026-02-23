/**
 * Root Index — App entry point.
 *
 * Waits for the Zustand auth store to finish initializing (session check),
 * then routes to:
 *  - /(tabs)        — if the user has an active session
 *  - /onboarding    — if the user is not authenticated
 */
import { Colors } from "@/constants/theme";
import { useAuthStore } from "@/hooks/context/AuthContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const { session, isLoading, isInitialized } = useAuthStore();

  useEffect(() => {
    // Wait until the auth check completes before routing.
    if (!isInitialized || isLoading) return;

    const timeout = setTimeout(() => {
      if (session) {
        router.replace("/(tabs)");
      } else {
        router.replace("/onboarding");
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [session, isLoading, isInitialized]);

  // Show a spinner while the session check is in flight.
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
});
