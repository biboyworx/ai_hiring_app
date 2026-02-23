/**
 * PublicRoute — Wraps screens that should only be accessible when logged OUT.
 *
 * Behavior:
 *  - While auth is still initializing: shows a loading spinner.
 *  - Once initialized with an active session: redirects to /(tabs) (dashboard).
 *  - Once initialized with no session: renders children normally.
 */

import { Colors } from "@/constants/theme";
import { useAuthStore } from "@/hooks/context/AuthContext";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { session, isLoading, isInitialized } = useAuthStore();

  useEffect(() => {
    // Only redirect once the auth check has fully completed.
    if (!isInitialized || isLoading) return;
    if (session) {
      router.replace("/(tabs)");
    }
  }, [session, isLoading, isInitialized]);

  // Show spinner while checking session.
  if (isLoading || !isInitialized) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Prevent flash of public content while redirect fires.
  if (session) return null;

  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
});
