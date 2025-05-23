import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>DEMO CLIENTS</Text>
        {/* Placeholder for symmetry */}
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {demoClients.map((client, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.company}>{client.company}</Text>
            <View style={styles.infoBox}>
              <Text style={styles.name}>Name : {client.name}</Text>
              <Text style={styles.days}>Demo taken : {client.days} days</Text>
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
    marginTop:40
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
  },
  days: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});

