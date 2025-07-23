import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router"; // Import router
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
import { useTheme } from "../../ThemeContext"; // Adjust path if needed

export default function NotInterestedScreen() {
  const { darkMode } = useTheme();

  const notInterested = useSelector(
    (state: any) => state.leads.assignedGroupLeads["not interested"]
  );

  const handlePress = (idx: string) => {
    router.push({
      pathname: "/not interested/[id]",
      params: { id: idx },
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
       <View style={[{flexDirection:"row", position:"relative", left:50}]}>
         <Text style={[styles.header, darkMode && { color: "#fff" }]}>
          NOT INTERESTED CLIENTS
        </Text>
       </View>
     
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {notInterested?.map((client: any, idx: number) => {
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
                style={[
                  styles.card,
                  darkMode && { backgroundColor: "#23262F" },
                ]}
              >
                <Text style={[styles.company, darkMode && { color: "#fff" }]}>
                  {Company_name}
                </Text>
                <View
                  style={[
                    styles.infoBox,
                    darkMode && { backgroundColor: "#35383F" },
                  ]}
                >
                  <Text style={[styles.name, darkMode && { color: "#fff" }]}>
                    Contact : {Mobile_no || Landline_no || "No contact number"}
                  </Text>
                  
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
    backgroundColor: "#fff",
    marginTop: 40,
  },
  headerRow: {
    flexDirection: "row",
    gap:6,
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
   fontSize: 20,
   gap:10,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 8,
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
