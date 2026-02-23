/**
 * Settings Tab Screen — Settings menu with grouped navigation items.
 */
import Avatar from "@/components/ui/Avatar";
import { DUMMY_USER } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
// hooks
import { useLogout } from "@/hooks/auth/Logout";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SETTINGS_GROUPS } from "@/constants/Settings";

export default function SettingsScreen() {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          logout(undefined, {
            onSuccess: () => router.replace("/(auth)/login"),
            onError: () => {
              Alert.alert("Error", "Failed to sign out. Please try again.", [
                { text: "OK", style: "default" },
              ]);
            },
          });
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent and cannot be undone. All your data will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => router.replace("/(auth)/login"),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Settings</Text>

        {/* User card */}
        <Pressable
          onPress={() => router.push("/(tabs)/profile")}
          style={styles.userCard}
        >
          <Avatar
            name={`${DUMMY_USER.firstName} ${DUMMY_USER.lastName}`}
            size={52}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {DUMMY_USER.firstName} {DUMMY_USER.lastName}
            </Text>
            <Text style={styles.userEmail}>{DUMMY_USER.email}</Text>
          </View>
          <FontAwesome name="chevron-right" size={14} color={Colors.muted} />
        </Pressable>

        {/* Settings groups */}
        {SETTINGS_GROUPS.map((group) => (
          <View key={group.title} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupCard}>
              {group.items.map((item, index) => (
                <Pressable
                  key={item.label}
                  onPress={() => router.push(item.route as any)}
                  style={({ pressed }) => [
                    styles.menuItem,
                    index < group.items.length - 1 && styles.menuDivider,
                    pressed && { backgroundColor: `${Colors.primary}05` },
                  ]}
                >
                  <View style={styles.menuIconContainer}>
                    <FontAwesome
                      name={item.icon as any}
                      size={16}
                      color={Colors.secondary}
                    />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <FontAwesome
                    name="chevron-right"
                    size={12}
                    color={Colors.muted}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Danger zone */}
        <View style={styles.group}>
          <Text style={styles.groupTitle}>Danger Zone</Text>
          <View style={styles.groupCard}>
            <Pressable
              onPress={handleDeleteAccount}
              style={[styles.menuItem, styles.menuDivider]}
            >
              <View
                style={[
                  styles.menuIconContainer,
                  { backgroundColor: `${Colors.danger}12` },
                ]}
              >
                <FontAwesome name="trash-o" size={16} color={Colors.danger} />
              </View>
              <Text style={[styles.menuLabel, { color: Colors.danger }]}>
                Delete Account
              </Text>
              <FontAwesome
                name="chevron-right"
                size={12}
                color={Colors.danger}
              />
            </Pressable>
          </View>
        </View>

        {/* Sign out button */}
        <Pressable
          onPress={handleLogout}
          style={styles.logoutButton}
          disabled={isLoggingOut}
        >
          <FontAwesome name="sign-out" size={18} color={Colors.danger} />
          <Text style={styles.logoutText}>
            {isLoggingOut ? "Signing Out..." : "Sign Out"}
          </Text>
        </Pressable>

        {/* Version info */}
        <Text style={styles.version}>MyApp v1.0.0</Text>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  userInfo: { flex: 1 },
  userName: { fontSize: 17, fontWeight: "600", color: Colors.text.primary },
  userEmail: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
  group: { marginBottom: 20 },
  groupTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  groupCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: `${Colors.border}80`,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: `${Colors.secondary}10`,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: { flex: 1, fontSize: 15, color: Colors.text.primary },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: `${Colors.danger}08`,
    borderWidth: 1,
    borderColor: `${Colors.danger}20`,
  },
  logoutText: { fontSize: 15, fontWeight: "600", color: Colors.danger },
  version: {
    fontSize: 12,
    color: Colors.muted,
    textAlign: "center",
    marginTop: 16,
  },
});
