import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from "../../ThemeContext";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loading from "../../components/ui/Loading";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function Analytics() {
  const { darkMode } = useTheme();
  const token = useSelector((state) => state.agent.token); // ✅ get token from redux

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        // small delay for smoother UX
        await new Promise((resolve) => setTimeout(resolve, 500));

        const res = await fetch(`${apiUrl}/apk/get-analytics`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ same as Postman
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  return (
    <SafeAreaView
      style={[styles.container, darkMode && { backgroundColor: "#181A20" }]}
    >
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
          <Ionicons
            name="arrow-back"
            size={28}
            color={darkMode ? "#fff" : "#000"}
          />
        </Pressable>
        <Text style={[styles.header, darkMode && { color: "#fff" }]}>
          My Analytics
        </Text>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          {[
            { label: "Today's", key: "daily" },
            { label: "Weekly", key: "weekly" },
            { label: "Monthly", key: "monthly" },
          ].map((period, i) => (
            <View
              key={period.key}
              style={[
                styles.boxContainer,
                darkMode && { backgroundColor: "#23262F" },
              ]}
            >
              <Text style={[styles.boxTitle, darkMode && { color: "#fff" }]}>
                {period.label}
              </Text>

              <View style={styles.boxContent}>
                {analytics && analytics.results[period.key]
                  ? Object.entries(analytics.results[period.key]).map(
                      ([status, count], idx) => {
                        // Pick colors dynamically (cycle through palette)
                        const colors = [
                          { bg: "#AF65CA", text: "#fff" },
                          { bg: "#3ED778", text: "#222" },
                          { bg: "#7553D5", text: "#fff" },
                          { bg: "#FF9F43", text: "#222" }, // extra
                        ];
                        const color = colors[idx % colors.length];

                        return (
                          <View
                            key={status}
                            style={[
                              styles.infobox,
                              { backgroundColor: color.bg },
                            ]}
                          >
                            <Text
                              style={{ fontWeight: "bold", color: color.text }}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </Text>
                            <Text
                              style={{ fontWeight: "bold", color: color.text }}
                            >
                              {count}
                            </Text>
                          </View>
                        );
                      }
                    )
                  : null}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
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
  boxContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    elevation: 1,
    paddingBottom: 30,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: "#222",
  },
  boxContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 5,
  },
  infobox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 67,
    width: 92,
    backgroundColor: "red",
    gap: 2,
    borderRadius: 8,
  },
});
