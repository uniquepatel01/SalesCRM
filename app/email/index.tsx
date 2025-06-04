import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../ThemeContext";
import { EmailClient, emailClients } from "../../data/emailClientsData";

export default function EmailClients() {
  const { darkMode } = useTheme();

  const handlePress = (client: EmailClient, idx: number) => {
    router.push({
      pathname: "/email/[id]",
      params: { id: idx.toString() },
    });
  };
  return (
    <SafeAreaView
      style={[styles.container, darkMode && { backgroundColor: "#181A20" }]}
    >
      <Text
        style={[
          styles.sectionTitle,
          darkMode && { color: "#fff", backgroundColor: "#181A20" },
        ]}
      >
        Email Clients
      </Text>
      <ScrollView contentContainerStyle={styles.content}>
        {emailClients.map((client, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handlePress(client, idx)}
            activeOpacity={0.85}
          >
            <View
              style={[styles.box, darkMode && { backgroundColor: "#23262F" }]}
            >
              <Text style={[styles.company, darkMode && { color: "#7BB1FF" }]}>
                {client.company}
              </Text>
              <View style={styles.row}>
                <Text style={[styles.label, darkMode && { color: "#fff" }]}>
                  <Text style={[styles.value, darkMode && { color: "#fff" }]}>
                    {client.name}
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.label,
                    { marginLeft: 16 },
                    darkMode && { color: "#fff" },
                  ]}
                >
                  <Text style={[styles.value, darkMode && { color: "#fff" }]}>
                    {client.mobile}
                  </Text>
                </Text>
              </View>
              <View style={styles.dateRow}>
                <View
                  style={[
                    styles.dateBadge,
                    darkMode && { backgroundColor: "#E94444" },
                  ]}
                >
                  <Text style={[styles.value, { color: "white" }]}>
                    {client.demoTaken}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    marginTop: 40,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: "#333",
    margin: 5,
    textAlign: "center",
    backgroundColor: "#F7F9FC",
    paddingVertical: 12,
    zIndex: 1,
  },
  box: {
    backgroundColor: "#E6F0FF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  company: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: "#0062FF",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#333",
    marginBottom: 2,
    textAlign: "center",
  },
  value: {
    fontFamily: "Inter-Regular",
    color: "#222",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    gap: 16,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  dateBadge: {
    backgroundColor: "red",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
