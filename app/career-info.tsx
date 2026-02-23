/**
 * Career Info Screen — Skills and career preferences editor.
 */
import Header from "@/components/ui/Header";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { DUMMY_PARSED_RESUME, DUMMY_USER } from "@/constants/dummyData";
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

export default function CareerInfoScreen() {
  const [skills, setSkills] = useState(
    DUMMY_PARSED_RESUME.skills.map((s) => s.name),
  );
  const [newSkill, setNewSkill] = useState("");
  const [experience, setExperience] = useState(
    DUMMY_USER.experience?.toString() || "5",
  );
  const [industry, setIndustry] = useState("Technology");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSave = () => {
    Alert.alert(
      "Career Info Saved",
      "Your career information has been updated.",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Career Info" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsWrap}>
          {skills.map((skill) => (
            <Pressable key={skill} onPress={() => removeSkill(skill)}>
              <View style={styles.skillTag}>
                <Text style={styles.skillTagText}>{skill}</Text>
                <FontAwesome name="times" size={10} color={Colors.muted} />
              </View>
            </Pressable>
          ))}
        </View>
        <View style={styles.addRow}>
          <View style={styles.addInput}>
            <ThemedInput
              value={newSkill}
              onChangeText={setNewSkill}
              placeholder="Add a skill"
              onSubmitEditing={addSkill}
            />
          </View>
          <ThemedButton title="Add" size="sm" onPress={addSkill} />
        </View>

        {/* Experience */}
        <ThemedInput
          label="Years of Experience"
          value={experience}
          onChangeText={setExperience}
          keyboardType="numeric"
          leftIcon={"history"}
        />

        {/* Industry */}
        <ThemedInput
          label="Industry"
          value={industry}
          onChangeText={setIndustry}
          leftIcon={"industry"}
        />

        {/* Education summary */}
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.card}>
          {DUMMY_PARSED_RESUME.education.map((edu, i) => (
            <View key={i} style={styles.eduItem}>
              <FontAwesome
                name="graduation-cap"
                size={14}
                color={Colors.secondary}
              />
              <View style={styles.eduContent}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduSchool}>
                  {edu.school} • {edu.year}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Experience summary */}
        <Text style={styles.sectionTitle}>Experience</Text>
        <View style={styles.card}>
          {DUMMY_PARSED_RESUME.experience.map((exp, i) => (
            <View key={i} style={styles.expItem}>
              <View style={styles.expDot} />
              <View style={styles.expContent}>
                <Text style={styles.expRole}>{exp.role}</Text>
                <Text style={styles.expCompany}>
                  {exp.company} • {exp.duration}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <ThemedButton
          title="Save Changes"
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
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  skillTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: `${Colors.secondary}10`,
    borderWidth: 1,
    borderColor: `${Colors.secondary}20`,
  },
  skillTagText: { fontSize: 13, color: Colors.secondary, fontWeight: "500" },
  addRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    marginBottom: 8,
  },
  addInput: { flex: 1 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 14,
    marginBottom: 16,
  },
  eduItem: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  eduContent: { flex: 1 },
  eduDegree: { fontSize: 14, fontWeight: "600", color: Colors.text.primary },
  eduSchool: { fontSize: 12, color: Colors.text.secondary },
  expItem: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  expDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    marginTop: 5,
  },
  expContent: { flex: 1 },
  expRole: { fontSize: 14, fontWeight: "600", color: Colors.text.primary },
  expCompany: { fontSize: 12, color: Colors.text.secondary },
});
