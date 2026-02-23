/**
 * Job Preferences Screen — Work type, salary, location, and skills preferences.
 */
import Header from "@/components/ui/Header";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WORK_TYPES = ["Remote", "Hybrid", "On-site", "Any"];
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Freelance"];

export default function JobPreferencesScreen() {
  const [selectedWork, setSelectedWork] = useState("Remote");
  const [selectedJob, setSelectedJob] = useState("Full-time");
  const [salaryMin, setSalaryMin] = useState("80000");
  const [salaryMax, setSalaryMax] = useState("120000");
  const [location, setLocation] = useState("San Francisco, CA");
  const [willingToRelocate, setWillingToRelocate] = useState(false);

  const handleSave = () => {
    Alert.alert(
      "Preferences Saved",
      "Your job preferences have been updated.",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Job Preferences" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Work type */}
        <Text style={styles.sectionTitle}>Work Setup</Text>
        <View style={styles.chipRow}>
          {WORK_TYPES.map((type) => (
            <Pressable key={type} onPress={() => setSelectedWork(type)}>
              <View
                style={[
                  styles.chip,
                  selectedWork === type && styles.chipActive,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedWork === type && styles.chipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Job type */}
        <Text style={styles.sectionTitle}>Job Type</Text>
        <View style={styles.chipRow}>
          {JOB_TYPES.map((type) => (
            <Pressable key={type} onPress={() => setSelectedJob(type)}>
              <View
                style={[styles.chip, selectedJob === type && styles.chipActive]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedJob === type && styles.chipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Salary range */}
        <Text style={styles.sectionTitle}>Salary Range (Annual)</Text>
        <View style={styles.salaryRow}>
          <View style={styles.salaryInput}>
            <ThemedInput
              label="Minimum"
              value={salaryMin}
              onChangeText={setSalaryMin}
              keyboardType="numeric"
              leftIcon={
                "dollar"
              }
            />
          </View>
          <Text style={styles.salaryDash}>—</Text>
          <View style={styles.salaryInput}>
            <ThemedInput
              label="Maximum"
              value={salaryMax}
              onChangeText={setSalaryMax}
              keyboardType="numeric"
              leftIcon={"dollar"}
            />
          </View>
        </View>

        {/* Location */}
        <ThemedInput
          label="Preferred Location"
          value={location}
          onChangeText={setLocation}
          leftIcon={"map-marker"}
        />

        {/* Willing to relocate toggle */}
        <Pressable
          onPress={() => setWillingToRelocate(!willingToRelocate)}
          style={styles.toggleRow}
        >
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleLabel}>Willing to Relocate</Text>
            <Text style={styles.toggleSub}>
              Open to moving for the right opportunity
            </Text>
          </View>
          <View
            style={[styles.toggle, willingToRelocate && styles.toggleActive]}
          >
            <View
              style={[
                styles.toggleThumb,
                willingToRelocate && styles.toggleThumbActive,
              ]}
            />
          </View>
        </Pressable>

        <ThemedButton
          title="Save Preferences"
          onPress={handleSave}
          fullWidth
          size="lg"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 12,
    marginTop: 16,
  },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 14, fontWeight: "500", color: Colors.text.secondary },
  chipTextActive: { color: "#FFF" },
  salaryRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    marginBottom: 4,
  },
  salaryInput: { flex: 1 },
  salaryDash: { fontSize: 18, color: Colors.muted, paddingBottom: 20 },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 16,
  },
  toggleInfo: { flex: 1 },
  toggleLabel: { fontSize: 14, fontWeight: "600", color: Colors.text.primary },
  toggleSub: { fontSize: 12, color: Colors.text.secondary, marginTop: 2 },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.border,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  toggleActive: { backgroundColor: Colors.success },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFF",
  },
  toggleThumbActive: { alignSelf: "flex-end" },
});
