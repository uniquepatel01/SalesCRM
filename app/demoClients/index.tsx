import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"; // Import router
import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "../../ThemeContext"; // Adjust path if needed

export default function DemoClientsScreen() {
  const { darkMode } = useTheme();

 const {demo}= useSelector((state:any)=>state.leads.assignedGroupLeads)

  const handlePress = ( idx: string) => {
      router.push({
        pathname: "/demoClients/[id]",
        params: { id: idx },
      });
    };

  return (
    <SafeAreaView
      style={[
        styles.container,
        darkMode && { backgroundColor: "#181A20" },
      ]}
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
          <Ionicons name="arrow-back" size={28} color={darkMode ? "#fff" : "#000"} />
        </Pressable>
        <Text
          style={[
            styles.header,
            darkMode && { color: "#fff" },
          ]}
        >
          DEMO CLIENTS
        </Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {demo?.map((client:any, idx: number) => {
           const {
  Address="",
  "Business_vol Lakh / Year": BusinessVolLakhPerYear="",
  Company_name,
  "E-mail id": EmailId="",
  "Landline no": LandlineNo="",
  "Mobile no": MobileNo="",
  Remarks,
  State="",
  Status="",        // OR `status` if case-insensitive
  _id="",
  assignedTo="",
  status="",        // Note: you have both `Status` and `status`
  updatedAt="",
  
}=client


          return <TouchableOpacity
          key={idx}
            onPress={() => handlePress( _id)}
            activeOpacity={0.85}
          >
            <View
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
               {Company_name}
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
                  Demo Started : {new Date(updatedAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
})}
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

