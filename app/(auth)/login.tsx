/**
 * Login Screen — Email/password authentication with social login options.
 * Includes form validation, password visibility toggle, and navigation links.
 */

import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// components
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput, { ThemedInputProps } from "@/components/ui/ThemedInput";

// hooks
import { LoginCredentials, useLoginUser } from "@/hooks/auth/Login";

export default function LoginScreen() {
  // Initialize React Hook Form
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // fields for form generation
  const fields: ThemedInputProps[] = [
    {
      label: "Email",
      name: "email",
      autoComplete: "email",
      helperText: "you@gmail.com",
      leftIcon: "envelope",
      keyboardType: "email-address",
    },
    {
      label: "Password",
      name: "password",
      autoComplete: "current-password",
      helperText: "Enter your password",
      leftIcon: "lock",
      keyboardType: "default",
      isPassword: true,
    },
  ];
  // Hook for login mutation
  const { mutate: login, isPending } = useLoginUser();

  const handleSocialLogin = (provider: string) => {
    // Simulate social login → navigate to dashboard
    router.replace("/(tabs)");
  };

  const onSubmit = (data: LoginCredentials) => {
    login(data, {
      onSuccess: () => {
        router.replace("/(tabs)");
      },
      onError: (error: Error) => {
        setError("root", { message: error.message });
        console.warn("Login failed:", error.message);
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo / Brand Header */}
        <View style={styles.header}>
          <Text style={styles.brandName}>NexHire</Text>
          <Text style={styles.tagline}>Welcome back! Sign in to continue.</Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          {/* Error UI for login failure */}
          {errors.root?.message && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errors.root.message}</Text>
            </View>
          )}
          {/* Maps the field array to generate form avoiding repetition. */}
          {fields.map(({ label, name, helperText, leftIcon, keyboardType }) => {
            if (name === "email") {
              return (
                <Controller
                  key={name}
                  control={control}
                  name={name}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Enter a valid email",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <ThemedInput
                      label={label}
                      placeholder={helperText}
                      leftIcon={leftIcon || "envelope"}
                      keyboardType={keyboardType}
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors[name]?.message}
                    />
                  )}
                />
              );
            }

            if (name === "password") {
              return (
                <Controller
                  key={name}
                  control={control}
                  name={name}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <ThemedInput
                      label={label}
                      placeholder={helperText}
                      leftIcon={leftIcon || "lock"}
                      keyboardType={keyboardType}
                      isPassword
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      error={errors[name]?.message}
                    />
                  )}
                />
              );
            }
          })}

          {/* Forgot password link */}
          <Pressable
            onPress={() => router.push("/(auth)/forgot-password")}
            style={styles.forgotLink}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>

          {/* Login button */}
          <ThemedButton
            title="Sign In"
            onPress={handleSubmit(onSubmit)}
            loading={isPending}
            fullWidth
            size="lg"
          />
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social login buttons */}
        <View style={styles.socialRow}>
          <Pressable
            style={styles.socialButton}
            onPress={() => handleSocialLogin("google")}
          >
            <FontAwesome name="google" size={20} color="#DB4437" />
            <Text style={styles.socialLabel}>Google</Text>
          </Pressable>

          <Pressable
            style={styles.socialButton}
            onPress={() => handleSocialLogin("linkedin")}
          >
            <FontAwesome name="linkedin-square" size={22} color="#0A66C2" />
            <Text style={styles.socialLabel}>LinkedIn</Text>
          </Pressable>
        </View>

        {/* Sign up link */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Pressable onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </Pressable>
        </View>
        <View style={{ alignItems: "center", marginTop: "25%" }}>
          <Pressable
            onPress={() => router.push("/onboarding")}
            style={styles.backButton}
          >
            <FontAwesome name="chevron-left" size={16} color={Colors.primary} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
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
  brandName: {
    fontSize: 36,
    fontWeight: "800",
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    color: Colors.text.secondary,
    marginTop: 8,
  },
  form: {
    marginBottom: 24,
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: -8,
  },
  forgotText: {
    fontSize: 13,
    color: Colors.secondary,
    fontWeight: "500",
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
    marginBottom: 32,
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
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.secondary,
  },
});
