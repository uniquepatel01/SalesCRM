import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../ThemeContext"; // Adjust path if needed

const demoClients = [
  { company: "THREE STAR MARINE EXPORTS", name: "Rama Swami", days: 6 },
  { company: "THREE STAR MARINE EXPORTS", name: "Rama Swami", days: 6 },
  { company: "THREE STAR MARINE EXPORTS", name: "Rama Swami", days: 6 },
  { company: "THREE STAR MARINE EXPORTS", name: "Rama Swami", days: 6 },
  { company: "THREE STAR MARINE EXPORTS", name: "Rama Swami", days: 6 },
  { company: "THREE STAR MARINE EXPORTS", name: "Rama Swami", days: 6 },
  { company: "THREE STAR MARINE EXPORTS", name: "Rama Swami", days: 6 },
  { company: "THREE STAR MARINE EXPORTS", name: "Rama Swami", days: 6 },
  { company: "THREE STAR MARINE EXPORTS", name: "Rama Swami", days: 6 },
  { company: "THREE STAR MARINE EXPORTS", name: "Rama Swami", days: 6 },
];

export default function DemoClientsScreen() {
  const { darkMode } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.container,
        darkMode && { backgroundColor: "#181A20" },
      ]}
    >
      <View style={styles.headerRow}>
        <Text
          style={[
            styles.header,
            darkMode && { color: "#fff" },
          ]}
        >
          DEMO CLIENTS
        </Text>
        {/* Placeholder for symmetry */}
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {demoClients.map((client, idx) => (
          <View
            key={idx}
            style={[
              styles.card,
              darkMode && { backgroundColor: "#23262F" },
            ]}
          >
            <Text
              style={[
                styles.company,
                darkMode && { color: "#fff" },
              ]}
            >
              {client.company}
            </Text>
            <View
              style={[
                styles.infoBox,
                darkMode && { backgroundColor: "#35383F" },
              ]}
            >
              <Text
                style={[
                  styles.name,
                  darkMode && { color: "#fff" },
                ]}
              >
                Name : {client.name}
              </Text>
              <Text
                style={[
                  styles.days,
                  darkMode && { color: "#bbb" },
                ]}
              >
                Demo taken : {client.days} days
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    flex: 1,
    color: "#222",
  },
  content: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    elevation: 1,
  },
  company: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 1,
    color: "#222",
  },
  infoBox: {
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "90%",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
    textAlign: "center",
    color: "#222",
  },
  days: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});

