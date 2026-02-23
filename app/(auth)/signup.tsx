/**
 * Signup Screen — Account creation with full name, email, password fields.
 * Includes password strength indicator and social registration options.
 */
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error on typing
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: "", color: "transparent", width: 0 };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const levels = [
      { label: "Weak", color: Colors.danger, width: 25 },
      { label: "Fair", color: Colors.warning, width: 50 },
      { label: "Good", color: Colors.secondary, width: 75 },
      { label: "Strong", color: Colors.success, width: 100 },
    ];
    return levels[Math.min(score, 3)];
  };

  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!agreed) e.terms = "You must agree to the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate signup → email verification
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/email-verification");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome name="chevron-left" size={16} color={Colors.primary} />
          </Pressable>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join NexHire and discover AI-powered hiring
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.nameRow}>
            <View style={styles.halfInput}>
              <ThemedInput
                label="First Name"
                placeholder="John"
                leftIcon="user"
                value={form.firstName}
                onChangeText={(v) => updateField("firstName", v)}
                error={errors.firstName}
              />
            </View>
            <View style={styles.halfInput}>
              <ThemedInput
                label="Last Name"
                placeholder="Doe"
                value={form.lastName}
                onChangeText={(v) => updateField("lastName", v)}
                error={errors.lastName}
              />
            </View>
          </View>

          <ThemedInput
            label="Email Address"
            placeholder="you@example.com"
            leftIcon="envelope"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(v) => updateField("email", v)}
            error={errors.email}
          />

          <ThemedInput
            label="Password"
            placeholder="Create a strong password"
            leftIcon="lock"
            isPassword
            value={form.password}
            onChangeText={(v) => updateField("password", v)}
            error={errors.password}
          />

          {/* Password strength indicator */}
          {form.password.length > 0 && (
            <View style={styles.strengthRow}>
              <View style={styles.strengthTrack}>
                <View
                  style={[
                    styles.strengthFill,
                    {
                      width: `${strength.width}%`,
                      backgroundColor: strength.color,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.strengthLabel, { color: strength.color }]}>
                {strength.label}
              </Text>
            </View>
          )}

          <ThemedInput
            label="Confirm Password"
            placeholder="Confirm your password"
            leftIcon="lock"
            isPassword
            value={form.confirmPassword}
            onChangeText={(v) => updateField("confirmPassword", v)}
            error={errors.confirmPassword}
          />

          {/* Terms checkbox */}
          <Pressable onPress={() => setAgreed(!agreed)} style={styles.termsRow}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <FontAwesome name="check" size={11} color="#FFF" />}
            </View>
            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Pressable>
          {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

          {/* Sign up button */}
          <ThemedButton
            title="Create Account"
            onPress={handleSignup}
            loading={loading}
            fullWidth
            size="lg"
          />
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign up with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social buttons */}
        <View style={styles.socialRow}>
          <Pressable
            style={styles.socialButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <FontAwesome name="google" size={20} color="#DB4437" />
            <Text style={styles.socialLabel}>Google</Text>
          </Pressable>
          <Pressable
            style={styles.socialButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <FontAwesome name="linkedin-square" size={22} color="#0A66C2" />
            <Text style={styles.socialLabel}>LinkedIn</Text>
          </Pressable>
        </View>

        {/* Login link */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.loginLink}>Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 28,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${Colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.text.secondary,
  },
  form: {
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  strengthRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: -10,
    marginBottom: 12,
  },
  strengthTrack: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  strengthFill: {
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: "600",
    minWidth: 44,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 20,
    marginTop: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  termsLink: {
    color: Colors.secondary,
    fontWeight: "500",
  },
  errorText: {
    fontSize: 12,
    color: Colors.danger,
    marginTop: -12,
    marginBottom: 12,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: Colors.muted,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  socialLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.primary,
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.secondary,
  },
});
