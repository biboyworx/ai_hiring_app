/**
 * Change Password Screen — Secure password update form.
 */
import Header from "@/components/ui/Header";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePasswordScreen() {
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!current) e.current = "Current password is required";
    if (newPw.length < 8) e.newPw = "Must be at least 8 characters";
    if (newPw !== confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    Alert.alert(
      "Password Changed",
      "Your password has been updated successfully.",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Change Password" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.lockIcon}>
          <FontAwesome name="lock" size={32} color={Colors.primary} />
        </View>

        <ThemedInput
          label="Current Password"
          value={current}
          onChangeText={setCurrent}
          secureTextEntry
          error={errors.current}
          leftIcon={"key"}
        />
        <ThemedInput
          label="New Password"
          value={newPw}
          onChangeText={setNewPw}
          secureTextEntry
          error={errors.newPw}
          helperText="Minimum 8 characters"
          leftIcon={"lock"}
        />
        <ThemedInput
          label="Confirm New Password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          error={errors.confirm}
          leftIcon={"lock"}
        />

        <View style={styles.tips}>
          <Text style={styles.tipTitle}>Password Tips</Text>
          {[
            "Use a mix of letters, numbers, and symbols",
            "Avoid common words or patterns",
            "Don't reuse passwords from other accounts",
          ].map((t, i) => (
            <View key={i} style={styles.tipRow}>
              <FontAwesome name="check" size={10} color={Colors.success} />
              <Text style={styles.tipText}>{t}</Text>
            </View>
          ))}
        </View>

        <ThemedButton
          title="Update Password"
          onPress={handleSubmit}
          fullWidth
          size="lg"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  lockIcon: {
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: `${Colors.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  tips: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 16,
    gap: 10,
  },
  tipTitle: { fontSize: 14, fontWeight: "600", color: Colors.text.primary },
  tipRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  tipText: { fontSize: 13, color: Colors.text.secondary },
});
