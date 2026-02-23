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
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// constants
import { errorToast, successToast } from "@/components/toasts/notifications";
import { signupFields } from "@/constants/Forms";

// hooks
import { SignUpCredentials, useSignUpUser } from "@/hooks/auth/SignUp";

export default function SignupScreen() {
  const [agreed, setAgreed] = useState(false);

  // Initialize React Hook Form
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  // Hook for signup mutation
  const { mutate: signup, isPending } = useSignUpUser();

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

  const strength = getPasswordStrength(password);

  const onSubmit = (data: SignUpCredentials) => {
    if (!agreed) {
      setError("root", { message: "You must agree to the terms" });
      return;
    }
    signup(
      { ...data },
      {
        onSuccess: () => {
          router.push("/(auth)/confirm-email");
        },
        onError: (error: Error) => {
          setError("root", { message: error.message });
          errorToast();
        },
      },
    );
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
            Join MyApp and discover AI-powered hiring
          </Text>
        </View>

        {/* Error UI for signup failure */}
        {errors.root?.message && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.root.message}</Text>
          </View>
        )}

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.nameRow}>
            {signupFields.map(
              ({ label, name, keyboardType, helperText, leftIcon }) => {
                if (!name || (name !== "firstName" && name !== "lastName")) {
                  return null;
                }
                return (
                  <View key={name} style={styles.halfInput}>
                    <Controller
                      control={control}
                      name={name}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <ThemedInput
                          label={label}
                          placeholder={helperText}
                          leftIcon={leftIcon || "user"}
                          keyboardType={keyboardType}
                          autoCapitalize="words"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          error={errors[name]?.message}
                        />
                      )}
                    />
                  </View>
                );
              },
            )}
          </View>
          {/* Will implement continously the rest of the fields like email, password, 
          confirm password and the rest of the UI in the next PR to keep this one smaller and easier to review. */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                label="Email Address"
                placeholder="you@example.com"
                leftIcon="envelope"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                label="Password"
                placeholder="Create a strong password"
                leftIcon="lock"
                isPassword
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
              />
            )}
          />

          {/* Password strength indicator */}
          {password && password.length > 0 && (
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

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput
                label="Confirm Password"
                placeholder="Confirm your password"
                leftIcon="lock"
                isPassword
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          {/* Terms checkbox */}
          <Pressable onPress={() => setAgreed(!agreed)} style={styles.termsRow}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <FontAwesome name="check" size={11} color="#FFF" />}
            </View>
            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text
                style={styles.termsLink}
                onPress={() => router.push("/terms-of-service")}
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                style={styles.termsLink}
                onPress={() => router.push("/privacy-policy")}
              >
                Privacy Policy
              </Text>
            </Text>
          </Pressable>

          {/* Sign up button */}
          <ThemedButton
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
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
    textDecorationLine: "underline",
  },
  errorContainer: {
    backgroundColor: "#FDECEA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F5C6CB",
    alignItems: "center",
  },
  errorText: {
    color: "#B71C1C",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
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
