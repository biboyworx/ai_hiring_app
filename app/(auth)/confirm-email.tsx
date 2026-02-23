/**
 * Confirm Email Screen — Shown after signup to prompt user to check their inbox.
 * Supabase sends a confirmation link; this screen guides the user accordingly.
 */
import ThemedButton from "@/components/ui/ThemedButton";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useAuthStore } from "@/hooks/context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RESEND_COOLDOWN = 60;

export default function ConfirmEmailScreen() {
  const { session, isLoading, isInitialized } = useAuthStore();
  const [timer, setTimer] = useState(RESEND_COOLDOWN);

  // Countdown for resend cooldown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOpenMail = () => {
    Linking.openURL("mailto:");
  };

  const handleResend = () => {
    // TODO: call supabase.auth.resend() when wired up
    setTimer(RESEND_COOLDOWN);
  };

  // Listen for session — when the user taps the confirmation link,
  // the deep link handler in _layout.tsx sets the session.
  // Once a session exists, navigate to the main app.
  useEffect(() => {
    if (!isInitialized || isLoading) return;
    if (session) {
      router.replace("/(tabs)");
    }
  }, [session, isLoading, isInitialized]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Back button */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={16} color={Colors.primary} />
        </Pressable>

        {/* Illustration / Icon */}
        <View style={styles.iconCircle}>
          <FontAwesome name="envelope-o" size={40} color={Colors.secondary} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Check Your Email</Text>

        {/* Description */}
        <Text style={styles.subtitle}>
          We've sent a confirmation link to your email address. Please open the
          link to verify your account.
        </Text>

        {/* Info card */}
        <View style={styles.infoCard}>
          <FontAwesome
            name="info-circle"
            size={18}
            color={Colors.secondary}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            If you don't see the email, check your spam or junk folder. The link
            will expire in 24 hours.
          </Text>
        </View>

        {/* Open Mail App button */}
        <ThemedButton
          title="Open Email App"
          onPress={handleOpenMail}
          fullWidth
          size="lg"
        />

        {/* Resend section */}
        <View style={styles.resendRow}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend email in <Text style={styles.timerBold}>{timer}s</Text>
            </Text>
          ) : (
            <Pressable onPress={handleResend}>
              <Text style={styles.resendLink}>Resend Confirmation Email</Text>
            </Pressable>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Back to login */}
        <ThemedButton
          title="Back to Sign In"
          variant="outline"
          onPress={() => router.replace("/(auth)/login")}
          fullWidth
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.base,
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: `${Colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginBottom: Spacing.xl,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${Colors.secondary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: `${Colors.secondary}10`,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    marginBottom: Spacing["2xl"],
    alignItems: "flex-start",
    gap: Spacing.md,
  },
  infoIcon: {
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  resendRow: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  timerText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  timerBold: {
    fontWeight: "700",
    color: Colors.primary,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.secondary,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
    width: "100%",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: Spacing.base,
    fontSize: 13,
    color: Colors.muted,
  },
});
