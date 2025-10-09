import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { StatusBar } from "react-native";
import { BackHandler } from "react-native";

import { setAssignLeads } from "@/store/assignedLeadSlice";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../ThemeContext";
import Loading from "@/components/ui/Loading";

export default function DashboardScreen() {
  const { darkMode } = useTheme();
  const agent = useSelector((state: any) => state.agent);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // assignedGroupLeads is an object: { demo: [...], dnp: [...], "call me later": [...] }
  const assignedGroupLeads = useSelector(
    (state: any) => state.leads.assignedGroupLeads || {}
  );

  useEffect(() => {
    const allTypes = async () => {
      if (!agent?.token) return;

      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}/apk/leads`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${agent.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch leads");
        const data = await res.json();
        dispatch(setAssignLeads(data));
      } catch (error) {
        console.error("Error loading leads:", error);
      } finally {
        setLoading(false);
      }
    };

    allTypes();
  }, [agent?.token]);

  // disable hardware back on dashboard
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  // color palette (cycled)
  const palette = [
    "#D6E4FF",
    "#FFEFC7",
    "#D1FADF",
    "#FFD6D6",
    "#E9D5FF",
    "#C7F0FF",
    "#CCFBF1",
    "#FFF3D9",
    "#E5E7EB",
    "#FFD6EC",
  ];

  const handleStatusPress = (bucketName: string) => {
    if (!bucketName) return;
    // push to dynamic bucket index: /buckets/[bucket]
    router.push({
      pathname: "/buckets/[bucket]",
      params: { bucket: bucketName },
    });
  };

  const bucketEntries = Object.entries(assignedGroupLeads);

  return (
    <SafeAreaView
      style={[styles.container, darkMode && { backgroundColor: "#222" }]}
      edges={["top"]}
    >
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={darkMode ? "#222" : "#ffffff"}
      />
      <DashboardHeader />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.content}>
          <Text style={[styles.sectionTitle, darkMode && { color: "#fff" }]}>
            Lead Status Overview
          </Text>

          <View style={styles.statusGrid}>
            {bucketEntries.length === 0 && (
              <Text style={{ textAlign: "center", width: "100%", marginTop: 20, color: darkMode ? "#bbb" : "#666" }}>
                No buckets available
              </Text>
            )}

            {bucketEntries.map(([bucketName, leads]: any, idx) => {
              // safe count
              const count = Array.isArray(leads) ? leads.length : 0;
              const bgColor = palette[idx % palette.length];

              return (
                <TouchableOpacity
                  key={bucketName}
                  style={[styles.statusBox, { backgroundColor: bgColor }]}
                  onPress={() => handleStatusPress(bucketName)}
                >
                  <View style={styles.box1}>
                    <Text style={[styles.statusNumber, darkMode && { color: "#000" }]}>
                      {count}
                    </Text>
                    <Text style={[styles.statusTitle, darkMode && { color: "#000" }]}>
                      {bucketName?.toString().toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}
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
    marginBottom: 12,
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
