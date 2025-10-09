import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector } from "react-redux";
import { useTheme } from "../../../ThemeContext"; // adjust path if needed

export default function BucketIndexScreen() {
  const { darkMode } = useTheme();
  const { bucket } = useLocalSearchParams() as any;

  const assignedGroupLeads = useSelector(
    (state: any) => state.leads.assignedGroupLeads || {}
  );

  // pick leads for this bucket (fallback empty array)
  const leads = assignedGroupLeads?.[bucket] ?? [];

  const handlePress = (idx: string) => {
    // navigate to /buckets/[bucket]/[id]
    router.push({
      pathname: "/buckets/[bucket]/[id]",
      params: { bucket, id: idx },
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, darkMode && { backgroundColor: "#181A20" }]}
    >
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
          {bucket?.toString().toUpperCase() || "BUCKET"} CLIENTS
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {leads?.length > 0 ? (
          leads.map((client: any) => {
            const {
              _id,
              Company_name,
              updatedAt,
            } = client;

            return (
              <TouchableOpacity
                key={_id}
                onPress={() => handlePress(_id)}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.card,
                    darkMode && { backgroundColor: "#23262F" },
                  ]}
                >
                  <Text style={[styles.company, darkMode && { color: "#fff" }]}>
                    {Company_name || "no company name found"}
                  </Text>
                  <View
                    style={[
                      styles.infoBox,
                      darkMode && { backgroundColor: "#35383F" },
                    ]}
                  >
                    <Text style={[styles.name, darkMode && { color: "#fff" }]}>
                      Name : {client.name || "N/A"}
                    </Text>

                    <Text style={[darkMode && { color: "#bbb" }]}>
                      Updated :
                      <Text style={{ color: "#08af3aff", fontWeight: "500" }}>
                        {" "}
                        {updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A"}
                      </Text>
                    </Text>
                    <Text style={[styles.days, darkMode && { color: "#bbb" }]}>
                      Days Ago :
                      <Text style={{ color: "#ff2929ff", fontWeight: "500" }}>
                        {(() => {
                          if (!updatedAt) return "N/A";
                          const updated = new Date(updatedAt);
                          const now = new Date();
                          const diffDays = Math.floor(
                            (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
                              Date.UTC(updated.getFullYear(), updated.getMonth(), updated.getDate())) /
                              (1000 * 60 * 60 * 24)
                          );
                          return diffDays <= 1 ? `${diffDays} day` : `${diffDays} days`;
                        })()}
                      </Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20, color: darkMode ? "#bbb" : "#444" }}>
            No leads found in {bucket}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    color: "#323232ff",
    textAlign: "center",
  },
});
