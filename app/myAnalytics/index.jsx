<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../ThemeContext"; // Adjust path if needed
export default function Analytics() {
  const { darkMode } = useTheme();

  return (
    <SafeAreaView style={[
      styles.container,
      darkMode && { backgroundColor: "#181A20" }
    ]}>
      {/* HeaderSection */}
      <View style={styles.headerRow}>
        {/* Back Arrow Icon */}
        <Pressable
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 100,
            backgroundColor: "transparent",
            padding: 4,
          }}
        >
          <Ionicons name="arrow-back" size={28} color={darkMode ? "#fff" : "#000"} />
        </Pressable>
        <Text style={[
          styles.header,
          darkMode && { color: "#fff" }
        ]}>My Analytics</Text>
      </View>

      <ScrollView>
        {["Today's", "Weekly", "Monthly"].map((period, i) => (
          <View
            key={period}
            style={[
              styles.boxContainer,
              darkMode && { backgroundColor: "#23262F" }
            ]}
          >
            <Text style={[
              styles.boxTitle,
              darkMode && { color: "#fff" }
            ]}>{period}</Text>
            <View style={styles.boxContent}>
              <View style={[styles.infobox, { backgroundColor: "#D8D367" }]}>
                <Text style={{ fontWeight: "bold", color: "#222" }}>Calls</Text>
                <Text style={{ fontWeight: "bold", color: "#222" }}>40</Text>
              </View>
              <View style={[styles.infobox, { backgroundColor: "#AF65CA" }]}>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>Demos</Text>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>40</Text>
              </View>
              <View style={[styles.infobox, { backgroundColor: "#7553D5" }]}>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>Others</Text>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>40</Text>
              </View>
              <View style={[styles.infobox, { backgroundColor: "#3ED778" }]}>
                <Text style={{ fontWeight: "bold", color: "#222" }}>Converted</Text>
                <Text style={{ fontWeight: "bold", color: "#222" }}>40</Text>
              </View>
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
    paddingHorizontal: 10
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
    color: "#222"
  },
  boxContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    elevation: 1,
    paddingBottom: 30
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: "#222"
  },
  boxContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 5
  },
  infobox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 67,
    width: 92,
    backgroundColor: "red",
    gap: 2,
    borderRadius: 8
  }
});
=======
import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../ThemeContext"; // Adjust path if needed
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../components/ui/Loading";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export default function Analytics() {
  const { darkMode } = useTheme();
  const agentEmail = useSelector((state) => state.agent.assignedTo);
  const [analytics, setAnalytics] = useState(null);
  const[loading,setLoading]=useState(false)

  useEffect(() => { 
  if (!agentEmail) return;

  const fetchAnalytics = async () => {
  
    try {
      setLoading(true);
      // Add a 500ms delay before the fetch
      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await fetch(`${apiUrl}/api/analytics/${agentEmail}`);
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    }
    finally {
      setLoading(false);
    }
  };

  fetchAnalytics();
}, [agentEmail]);

  return (
    <SafeAreaView style={[
      styles.container,
      darkMode && { backgroundColor: "#181A20" }
    ]}>
      {/* HeaderSection */}
      <View style={styles.headerRow}>
        {/* Back Arrow Icon */}
        <Pressable
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 100,
            backgroundColor: "transparent",
            padding: 4,
          }}
        >
          <Ionicons name="arrow-back" size={28} color={darkMode ? "#fff" : "#000"} />
        </Pressable>
        <Text style={[
          styles.header,
          darkMode && { color: "#fff" }
        ]}>My Analytics</Text>
      </View>

     {loading?<Loading/>: <ScrollView>
        {[
          { label: "Today's", key: "daily" },
          { label: "Weekly", key: "weekly" },
          { label: "Monthly", key: "monthly" }
        ].map((period, i) => (
          <View
            key={period.key}
            style={[
              styles.boxContainer,
              darkMode && { backgroundColor: "#23262F" }
            ]}
          >
            <Text style={[
              styles.boxTitle,
              darkMode && { color: "#fff" }
            ]}>{period.label}</Text>
            <View style={styles.boxContent}>
             
              <View style={[styles.infobox, { backgroundColor: "#AF65CA" }]}>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>Demos</Text>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>
                  {analytics && analytics[period.key] ? analytics[period.key].demo : "0"}
                </Text>
              </View>
              <View style={[styles.infobox, { backgroundColor: "#7553D5" }]}>
                <Text style={{ fontWeight: "bold", color: "#fff" }}>Others</Text>
                <Text style={{ fontWeight: "bold", color: "#fff" }}> {analytics && analytics[period.key] ? analytics[period.key].others : "0"}</Text>
              </View>
              <View style={[styles.infobox, { backgroundColor: "#3ED778" }]}>
                <Text style={{ fontWeight: "bold", color: "#222" }}>Converted</Text>
                <Text style={{ fontWeight: "bold", color: "#222" }}>{analytics && analytics[period.key] ? analytics[period.key].converted : "0"}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
    paddingHorizontal: 10
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
    color: "#222"
  },
  boxContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    elevation: 1,
    paddingBottom: 30
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: "#222"
  },
  boxContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 5
  },
  infobox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 67,
    width: 92,
    backgroundColor: "red",
    gap: 2,
    borderRadius: 8
  }
});
>>>>>>> 80530c0e1ce2f0de6e9f15ab7869442ae1267f66
