import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "../../ThemeContext";

export default function CallMeLaterScreen() {
  const { darkMode } = useTheme();
  const callmelater = useSelector(
    (state: any) => state.leads.assignedGroupLeads["call me later"]
  );

  const handlePress = (idx: string) => {
    router.push({
      pathname: "/callmelater/[id]",
      params: { id: idx },
    });
  };
  return (
    <SafeAreaView
      style={[styles.container, darkMode && { backgroundColor: "#181A20" }]}
    >
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
      <Text
        style={[
          styles.sectionTitle,
          darkMode && { color: "#fff", backgroundColor: "#181A20" },
        ]}
      >
        CALL ME LATER CLIENTS
      </Text>
      <ScrollView contentContainerStyle={styles.content}>
        {callmelater?.map((client: any, idx: number) => {
          const {
            _id,
  Company_name,
      Business_vol_Lakh_Per_Year,
      Address,
      City,
      Mobile_no,
      Landline_no,
      E_mail_id,
      Remarks,
      status,
      assignedTo,
      business_type,
      city,
      contact_person,
      source,
      updatedAt,
  } = client;

          return (
            <TouchableOpacity
              key={idx}
              onPress={() => handlePress(_id)}
              activeOpacity={0.85}
            >
              <View
                style={[styles.box, darkMode && { backgroundColor: "#23262F" }]}
              >
                <Text
                  style={[styles.company, darkMode && { color: "#818CF8" }]}
                >
                  {Company_name}
                </Text>
                <View style={styles.row}>
                  <Text style={[styles.value, darkMode && { color: "#fff" }]}>
                    {Remarks?.[Remarks.length - 1]?.comment || ""}
                  </Text>
                  <Text
                    style={[
                      styles.value,
                      { marginLeft: 16 },
                      darkMode && { color: "#fff" },
                    ]}
                  >
                   {Mobile_no || Landline_no || "No contact number"}
                  </Text>
                </View>
                <View style={styles.dateRow}>
                  <View
                    style={[
                      styles.dateBadge,
                      darkMode
                        ? { backgroundColor: "#FBCFE8" }
                        : { backgroundColor: "#FBCFE8" },
                    ]}
                  >
                    <Text style={[styles.value, { color: "#000" }]}>
                      {client.updatedAt.slice(0, -14)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
    backgroundColor: "#FFD6D6", // default soft red
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
