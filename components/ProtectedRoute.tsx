/**
 * ProtectedRoute — Wraps screens that require an authenticated session.
 *
 * Behavior:
 *  - While auth is still initializing: shows a loading spinner.
 *  - Once initialized with no session: redirects to /(auth)/login.
 *  - Once initialized with a valid session: renders children normally.
 */

import { Colors } from "@/constants/theme";
import { useAuthStore } from "@/hooks/context/AuthContext";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, isLoading, isInitialized } = useAuthStore();

  useEffect(() => {
    // Only redirect once the auth check has fully completed.
    if (!isInitialized || isLoading) return;
    if (!session) {
      router.replace("/(auth)/login");
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

  // Prevent flash of protected content while the redirect fires.
  if (!session) return null;

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
