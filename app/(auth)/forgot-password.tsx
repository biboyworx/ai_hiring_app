/**
 * Forgot Password Screen — Email-based password reset flow.
 */
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate sending reset email
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Back button */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={16} color={Colors.primary} />
        </Pressable>

        {sent ? (
          // ── Success state ──
          <View style={styles.successContainer}>
            <View style={styles.iconCircle}>
              <FontAwesome
                name="envelope-o"
                size={40}
                color={Colors.secondary}
              />
            </View>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successText}>
              We've sent a password reset link to{"\n"}
              <Text style={styles.emailBold}>{email}</Text>
            </Text>
            <ThemedButton
              title="Open Email App"
              onPress={() => {}}
              variant="secondary"
              fullWidth
              size="lg"
            />
            <Pressable
              onPress={() => {
                setSent(false);
                setEmail("");
              }}
              style={styles.tryAgain}
            >
              <Text style={styles.tryAgainText}>
                Didn't receive it?{" "}
                <Text style={styles.tryAgainLink}>Try again</Text>
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(auth)/login")}
              style={styles.backLink}
            >
              <FontAwesome
                name="arrow-left"
                size={12}
                color={Colors.secondary}
              />
              <Text style={styles.backLinkText}>Back to Sign In</Text>
            </Pressable>
          </View>
        ) : (
          // ── Form state ──
          <>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              No worries! Enter the email address associated with your account
              and we'll send you a reset link.
            </Text>

            <View style={styles.form}>
              <ThemedInput
                label="Email Address"
                placeholder="you@example.com"
                leftIcon="envelope"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(v) => {
                  setEmail(v);
                  if (error) setError("");
                }}
                error={error}
              />

              <ThemedButton
                title="Send Reset Link"
                onPress={handleSend}
                loading={loading}
                fullWidth
                size="lg"
              />
            </View>

            <Pressable onPress={() => router.back()} style={styles.backLink}>
              <FontAwesome
                name="arrow-left"
                size={12}
                color={Colors.secondary}
              />
              <Text style={styles.backLinkText}>Back to Sign In</Text>
            </Pressable>
          </>
        )}
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
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${Colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 32,
  },
  form: {
    gap: 8,
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 32,
  },
  backLinkText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.secondary,
  },
  // ── Success state
  successContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 48,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${Colors.secondary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 12,
  },
  successText: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  emailBold: {
    fontWeight: "600",
    color: Colors.text.primary,
  },
  tryAgain: {
    marginTop: 16,
  },
  tryAgainText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  tryAgainLink: {
    fontWeight: "600",
    color: Colors.secondary,
  },
});
