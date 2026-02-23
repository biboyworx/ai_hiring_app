/**
 * Jobs Tab Screen — Browse recommended jobs with match scores.
 * Shows filterable job list with search, categories, and match indicators.
 */
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { DUMMY_JOBS } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FILTERS = ["All", "Remote", "Hybrid", "Onsite", "Contract"];

export default function JobsScreen() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter jobs based on search and category
  const filtered = DUMMY_JOBS.filter((job) => {
    const matchesSearch =
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      job.location.toLowerCase().includes(activeFilter.toLowerCase()) ||
      job.type.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Find Jobs</Text>
        <Text style={styles.subtitle}>
          {DUMMY_JOBS.length} opportunities matched to your profile
        </Text>

        {/* Search bar */}
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={16} color={Colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs, companies..."
            placeholderTextColor={Colors.muted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <FontAwesome name="times-circle" size={18} color={Colors.muted} />
            </Pressable>
          )}
        </View>

        {/* Filter chips */}
        <FlatList
          horizontal
          data={FILTERS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          style={styles.filterList}
          contentContainerStyle={styles.filterContent}
          renderItem={({ item }) => (
            <View style={styles.filterChipView}>
              <Pressable
                onPress={() => setActiveFilter(item)}
                style={[
                  styles.filterChip,
                  activeFilter === item && styles.filterChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === item && styles.filterTextActive,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item}
                </Text>
              </Pressable>
            </View>
          )}
        />

        {/* Job list */}
        <FlatList
          data={filtered}
          style={styles.jobList}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <FontAwesome name="search" size={40} color={Colors.border} />
              <Text style={styles.emptyText}>No jobs found</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Card
              onPress={() => router.push(`/job-detail?id=${item.id}`)}
              style={styles.jobCard}
            >
              <View style={styles.jobTop}>
                <View style={styles.companyAvatar}>
                  <Text style={styles.companyInitial}>{item.company[0]}</Text>
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  <Text style={styles.jobCompany}>{item.company}</Text>
                </View>
                <View style={styles.matchCircle}>
                  <Text style={styles.matchScore}>{item.matchScore}%</Text>
                  <Text style={styles.matchLabel}>match</Text>
                </View>
              </View>

              <Text style={styles.jobDesc} numberOfLines={2}>
                {item.description}
              </Text>

              <View style={styles.jobMeta}>
                <View style={styles.metaItem}>
                  <FontAwesome
                    name="map-marker"
                    size={12}
                    color={Colors.muted}
                  />
                  <Text style={styles.metaText}>{item.location}</Text>
                </View>
                <View style={styles.metaItem}>
                  <FontAwesome name="money" size={12} color={Colors.muted} />
                  <Text style={styles.metaText}>{item.salary}</Text>
                </View>
                <View style={styles.metaItem}>
                  <FontAwesome name="clock-o" size={12} color={Colors.muted} />
                  <Text style={styles.metaText}>{item.posted}</Text>
                </View>
              </View>

              <View style={styles.tagRow}>
                {item.tags.map((tag) => (
                  <Badge key={tag} label={tag} variant="primary" size="sm" />
                ))}
              </View>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingTop: 8 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: { flex: 1, fontSize: 15, color: Colors.text.primary },
  filterList: { maxHeight: 48, marginTop: 14 },
  filterContent: { paddingHorizontal: 20, gap: 8 },
  filterChipView: {
    flexDirection: "row",
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    width: 90,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.text.secondary,
    textAlign: "center",
  },
  filterTextActive: { color: "#FFFFFF" },
  listContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },
  jobList: { flex: 1 },
  jobCard: { marginBottom: 14 },
  jobTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  companyAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: `${Colors.primary}12`,
    alignItems: "center",
    justifyContent: "center",
  },
  companyInitial: { fontSize: 18, fontWeight: "700", color: Colors.primary },
  jobInfo: { flex: 1 },
  jobTitle: { fontSize: 16, fontWeight: "600", color: Colors.text.primary },
  jobCompany: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
  matchCircle: { alignItems: "center" },
  matchScore: { fontSize: 16, fontWeight: "700", color: Colors.success },
  matchLabel: { fontSize: 10, color: Colors.muted },
  jobDesc: {
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  jobMeta: { flexDirection: "row", gap: 16, marginBottom: 10 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: 12, color: Colors.text.secondary },
  tagRow: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  emptyState: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 16, color: Colors.muted },
});
