import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../ThemeContext"; // adjust path if needed

export default function DashboardScreen() {
  const { darkMode, toggleTheme } = useTheme();

  const statusBoxes = [
    {
      title: "DNP",
      count: "50",
      color: "#1D4ED8", // Royal Blue
      bgColor: "#D6E4FF", // Light Blue
      status: "dnp",
      route: "/dnp",
    },
    {
      title: "Demo",
      count: "45",
      color: "#F59E0B", // Amber
      bgColor: "#FFEFC7", // Warm Yellow
      status: "demo",
      route: "/demoClients",
    },
    {
      title: "Call me Later",
      count: "23",
      color: "#10B981", // Emerald Green
      bgColor: "#D1FADF", // Bright Mint
      status: "dormats",
      route: "/callmeLater",
    },
    {
      title: "Wrong Number",
      count: "98",
      color: "#DC2626", // Soft Red
      bgColor: "#FFD6D6", // Prominent Pink-Red
      status: "Wrong Number",
      route: "/wrongNumber",
    },
    {
      title: "Converted",
      count: "56",
      color: "#9333EA", // Deep Purple
      bgColor: "#E9D5FF", // Lilac
      status: "Converted",
      route: "/convertedClients",
    },
    {
      title: "Busy",
      count: "56",
      color: "#0EA5E9", // Cyan Blue
      bgColor: "#C7F0FF", // Light Cyan
      status: "busy",
      route: "/busy",
    },
    {
      title: "Emails",
      count: "34",
      color: "#0D9488", // Teal Green (distinct from violet)
      bgColor: "#CCFBF1", // Soft Aqua-Mint
      status: "email",
      route: "/email",
    },
    {
      title: "Out of station",
      count: "72",
      color: "#D97706", // Warm Amber (Orange-Brown)
      bgColor: "#FFF3D9", // Light Tan/Peach
      status: "out of station",
      route: "/outOfStation",
    },
    {
      title: "Not Interested",
      count: "56",
      color: "#6B7280", // Cool Gray
      bgColor: "#E5E7EB", // Light Gray
      status: "not interested",
      route: "/notInterested",
    },
    {
      title: "Dormants",
      count: "40",
      color: "#EC4899", // Pink
      bgColor: "#FFD6EC", // Light Pink
      status: "later",
      route: "/dormant",
    },
  ];

  const handleStatusPress = (box: (typeof statusBoxes)[0]) => {
    router.push({
      pathname: (box.route || "/dashboard") as "/dashboard",
      params: { filter: box.status },
    });
  };

  const user = { name: "Guest" };

  return (
    <SafeAreaView
      style={[styles.container, darkMode && { backgroundColor: "#222" }]}
      edges={["top"]}
    >
      <DashboardHeader user={user} />
      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, darkMode && { color: "#fff" }]}>
          Lead Status Overview
        </Text>

        <View style={styles.statusGrid}>
          {statusBoxes.map((box, index) => (
            <TouchableOpacity
              key={box.status}
              style={[styles.statusBox, { backgroundColor: box.bgColor }]}
              onPress={() => handleStatusPress(box)}
            >
              <View style={styles.box1}>
                <Text
                  style={[styles.statusNumber, darkMode && { color: "#000" }]}
                >
                  {box.count}
                </Text>
                <Text
                  style={[styles.statusTitle, darkMode && { color: "#000" }]}
                >
                  {box.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: "#333",
    marginBottom: 16,
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    paddingBottom: 70,
  },
  statusBox: {
    width: "47%",
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusNumber: {
    fontSize: 36,
    fontFamily: "Inter-Bold",
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#333",
    textAlign: "center",
  },

  box1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
