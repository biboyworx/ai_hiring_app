/**
 * Language Settings Screen — Select app language.
 */
import Header from "@/components/ui/Header";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "fil", label: "Filipino", native: "Filipino" },
];

export default function LanguageSettingsScreen() {
  const [selected, setSelected] = useState("en");

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Language" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.hint}>
          Select your preferred language for the app interface.
        </Text>
        {LANGUAGES.map((lang) => (
          <Pressable
            key={lang.code}
            onPress={() => setSelected(lang.code)}
            style={[styles.row, selected === lang.code && styles.rowActive]}
          >
            <View style={styles.langInfo}>
              <Text
                style={[
                  styles.langLabel,
                  selected === lang.code && styles.langLabelActive,
                ]}
              >
                {lang.label}
              </Text>
              <Text style={styles.langNative}>{lang.native}</Text>
            </View>
            {selected === lang.code && (
              <FontAwesome
                name="check-circle"
                size={20}
                color={Colors.success}
              />
            )}
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  hint: { fontSize: 13, color: Colors.text.secondary, marginVertical: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  rowActive: {
    borderColor: Colors.success,
    backgroundColor: `${Colors.success}06`,
  },
  langInfo: { flex: 1 },
  langLabel: { fontSize: 15, fontWeight: "500", color: Colors.text.primary },
  langLabelActive: { fontWeight: "700", color: Colors.success },
  langNative: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
});
