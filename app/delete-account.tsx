/**
 * Delete Account Screen — Confirm account deletion with safety checks.
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

export default function DeleteAccountScreen() {
  const [confirmation, setConfirmation] = useState("");
  const CONFIRM_PHRASE = "DELETE";

  const handleDelete = () => {
    if (confirmation !== CONFIRM_PHRASE) return;
    Alert.alert(
      "Account Deleted",
      "Your account has been permanently deleted.",
      [{ text: "OK", onPress: () => router.replace("/onboarding") }],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Delete Account" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Warning icon */}
        <View style={styles.warningIcon}>
          <FontAwesome
            name="exclamation-triangle"
            size={40}
            color={Colors.danger}
          />
        </View>

        <Text style={styles.title}>This Action is Irreversible</Text>
        <Text style={styles.subtitle}>
          Deleting your account will permanently remove all your data,
          including:
        </Text>

        {/* What gets deleted */}
        <View style={styles.listCard}>
          {[
            "Your profile and personal information",
            "All uploaded resumes and parsed data",
            "Interview recordings and scores",
            "Job applications and saved jobs",
            "Account preferences and settings",
          ].map((item, i) => (
            <View key={i} style={styles.listItem}>
              <FontAwesome
                name="times-circle"
                size={14}
                color={Colors.danger}
              />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Confirmation input */}
        <View style={styles.confirmSection}>
          <Text style={styles.confirmLabel}>
            Type <Text style={styles.confirmPhrase}>{CONFIRM_PHRASE}</Text> to
            confirm:
          </Text>
          <ThemedInput
            value={confirmation}
            onChangeText={setConfirmation}
            placeholder={`Type ${CONFIRM_PHRASE} here`}
            autoCapitalize="characters"
          />
        </View>

        <ThemedButton
          title="Permanently Delete Account"
          variant="danger"
          onPress={handleDelete}
          fullWidth
          size="lg"
          disabled={confirmation !== CONFIRM_PHRASE}
          icon={<FontAwesome name="trash" size={15} color="#FFF" />}
        />

        <ThemedButton
          title="Cancel"
          variant="ghost"
          onPress={() => router.back()}
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  warningIcon: {
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.danger}10`,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.danger,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  listCard: {
    backgroundColor: `${Colors.danger}06`,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: `${Colors.danger}15`,
    gap: 10,
    marginBottom: 20,
  },
  listItem: { flexDirection: "row", alignItems: "center", gap: 10 },
  listText: { flex: 1, fontSize: 14, color: Colors.text.primary },
  confirmSection: { marginBottom: 20 },
  confirmLabel: { fontSize: 14, color: Colors.text.primary, marginBottom: 8 },
  confirmPhrase: { fontWeight: "700", color: Colors.danger },
});
