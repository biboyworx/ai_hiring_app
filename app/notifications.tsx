/**
 * Notifications Screen — Full notification list with read/unread state.
 */
import Header from "@/components/ui/Header";
import { DUMMY_NOTIFICATIONS } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Notification = (typeof DUMMY_NOTIFICATIONS)[number] & { read: boolean };

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(
    DUMMY_NOTIFICATIONS.map((n, i) => ({ ...n, read: i >= 2 })),
  );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const toggleRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );

  const iconMap: Record<
    string,
    React.ComponentProps<typeof FontAwesome>["name"]
  > = {
    score: "bar-chart",
    job: "briefcase",
    interview: "microphone",
    system: "bell",
  };

  const iconColorMap: Record<string, string> = {
    score: Colors.success,
    job: Colors.secondary,
    interview: Colors.accent,
    system: Colors.primary,
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Notifications"
        rightIcon={
          unreadCount > 0 ? (
            <Pressable onPress={markAllRead} style={styles.markAllBtn}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </Pressable>
          ) : undefined
        }
      />

      {unreadCount > 0 && (
        <View style={styles.unreadBanner}>
          <Text style={styles.unreadText}>
            {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
          </Text>
        </View>
      )}

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleRead(item.id)}
            style={[styles.card, !item.read && styles.cardUnread]}
          >
            <View
              style={[
                styles.iconWrap,
                {
                  backgroundColor: `${iconColorMap[item.type] || Colors.primary}12`,
                },
              ]}
            >
              <FontAwesome
                name={iconMap[item.type] || "bell"}
                size={18}
                color={iconColorMap[item.type] || Colors.primary}
              />
            </View>
            <View style={styles.content}>
              <Text style={[styles.title, !item.read && styles.titleUnread]}>
                {item.title}
              </Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            {!item.read && <View style={styles.dot} />}
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <FontAwesome name="bell-slash-o" size={40} color={Colors.border} />
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  markAllBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  markAllText: { fontSize: 12, fontWeight: "600", color: Colors.secondary },
  unreadBanner: {
    backgroundColor: `${Colors.secondary}08`,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  unreadText: { fontSize: 12, fontWeight: "500", color: Colors.secondary },
  list: { paddingHorizontal: 20, paddingBottom: 24, gap: 10 },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardUnread: {
    backgroundColor: `${Colors.secondary}04`,
    borderColor: `${Colors.secondary}20`,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { flex: 1, gap: 4 },
  title: { fontSize: 14, fontWeight: "500", color: Colors.text.primary },
  titleUnread: { fontWeight: "700" },
  message: { fontSize: 13, color: Colors.text.secondary, lineHeight: 19 },
  time: { fontSize: 11, color: Colors.muted },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    marginTop: 6,
  },
  empty: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyText: { fontSize: 14, color: Colors.muted },
});
