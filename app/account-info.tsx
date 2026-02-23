/**
 * Account Info Screen — View and update account details.
 */
import Avatar from "@/components/ui/Avatar";
import Header from "@/components/ui/Header";
import ThemedButton from "@/components/ui/ThemedButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { DUMMY_USER } from "@/constants/dummyData";
import { Colors } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountInfoScreen() {
  const [name, setName] = useState(
    DUMMY_USER.firstName + " " + DUMMY_USER.lastName,
  );
  const [email, setEmail] = useState(DUMMY_USER.email);
  const [phone, setPhone] = useState(DUMMY_USER.phone);

  const handleSave = () => {
    Alert.alert("Saved", "Account information updated.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Account Info" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarRow}>
          <Avatar name={name} size={72} />
          <View style={styles.avatarInfo}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>

        <ThemedInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          leftIcon={"user"}
        />
        <ThemedInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          leftIcon={"envelope"}
        />
        <ThemedInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          leftIcon={"phone"}
        />

        <View style={styles.infoCard}>
          <FontAwesome name="info-circle" size={14} color={Colors.secondary} />
          <Text style={styles.infoText}>
            Your email is used for login and notifications. Changing it will
            require re-verification.
          </Text>
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
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 32 },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 20,
  },
  avatarInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: "700", color: Colors.text.primary },
  userEmail: { fontSize: 13, color: Colors.text.secondary, marginTop: 2 },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: `${Colors.secondary}08`,
    borderRadius: 10,
    padding: 14,
    marginVertical: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});
