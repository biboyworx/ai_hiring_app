/**
 * Email Verification Screen — OTP input after signup.
 * User enters the 6-digit code sent to their email.
 */
import ThemedButton from "@/components/ui/ThemedButton";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CODE_LENGTH = 6;

export default function EmailVerificationScreen() {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputs = useRef<(TextInput | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Handle digit input — auto-advance to next input
  const handleChange = (text: string, index: number) => {
    if (text.length > 1) text = text[text.length - 1]; // Take last char
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-advance to next input
    if (text && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Handle backspace — go to previous input
  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length < CODE_LENGTH) return;

    setLoading(true);
    // Simulate verification → go to main app
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 1500);
  };

  const handleResend = () => {
    setTimer(60);
    setCode(Array(CODE_LENGTH).fill(""));
    inputs.current[0]?.focus();
  };

  const isComplete = code.every((c) => c !== "");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Back button */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={16} color={Colors.primary} />
        </Pressable>

        {/* Icon */}
        <View style={styles.iconCircle}>
          <FontAwesome name="shield" size={36} color={Colors.secondary} />
        </View>

        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code we sent to your email address.
        </Text>

        {/* OTP Input Row */}
        <View style={styles.codeRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[styles.codeInput, digit ? styles.codeInputFilled : null]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify button */}
        <ThemedButton
          title="Verify Email"
          onPress={handleVerify}
          loading={loading}
          disabled={!isComplete}
          fullWidth
          size="lg"
        />

        {/* Resend timer */}
        <View style={styles.resendRow}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in <Text style={styles.timerBold}>{timer}s</Text>
            </Text>
          ) : (
            <Pressable onPress={handleResend}>
              <Text style={styles.resendLink}>Resend Code</Text>
            </Pressable>
          )}
        </View>
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
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${Colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.secondary}15`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  codeRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 32,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: Colors.primary,
  },
  codeInputFilled: {
    borderColor: Colors.secondary,
    backgroundColor: `${Colors.secondary}08`,
  },
  resendRow: {
    marginTop: 24,
  },
  timerText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  timerBold: {
    fontWeight: "600",
    color: Colors.primary,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.secondary,
  },
});
