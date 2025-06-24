import { router } from "expo-router";
import { Moon, Plus, Search, Sun, User } from "lucide-react-native";
import React, { useState } from "react";


import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useTheme } from "../../ThemeContext"; // adjust path as needed

type DashboardHeaderProps = {
  user: any;
};

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [companyName, setCompanyName] = useState("No Company Assigned");
  const { darkMode, toggleTheme } = useTheme();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [search, setSearch] = useState("");
  const colorScheme = useColorScheme();

  const greeting = () => {
    return "Welcome john Doe";
  };
  const handleFetchLead = async () => {
  const response = await fetch("http://192.168.29.123:3000/forex-leads/assign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: "aks"}) // 👈 your user ID here
    });
   const data = await response.json();
  setCompanyName(data.Company_name.replace(/^->\s*/, "") || "No Company Assigned");
console.log("Assigned lead:", { Company_name: data.Company_name, assignedTo: data.assignedTo });
  };

  const handleLogout = () => {
    router.push("/auth/login");
  };
  const handleProfile = () => {
    router.push("/profile");
  };
  const handleAnalytics = () => {
    router.push("/myAnalytics");
  };
  const handleSearch = () => {
    Alert.alert("Search", `You searched for: ${search}`);
  };

  // Example: apply dark mode styles conditionally
  const containerStyle = [
    styles.container,
    darkMode && { backgroundColor: "#222", borderBottomColor: "#444" },
  ];
  const textStyle = [styles.name, darkMode && { color: "#fff" }];
  const greetingStyle = [styles.greeting, darkMode && { color: "#ccc" }];

  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.titleContainer}>
            <Text style={textStyle}>{"Gold CRM"}</Text>
            <Text style={greetingStyle}>{greeting()}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View>
            <TouchableOpacity
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <User size={28} color={darkMode ? "#fff" : "#222"} />
            </TouchableOpacity>
            {/* Dropdown with outside click handling */}
            <Modal
              visible={dropdownVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setDropdownVisible(false)}
            >
              <Pressable
                style={styles.modalOverlay}
                onPress={() => setDropdownVisible(false)}
              >
                <View style={styles.dropdownWrapper}>
                  <View
                    style={[
                      styles.dropdown,
                      darkMode && { backgroundColor: "#333" },
                    ]}
                  >
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setDropdownVisible(false);
                        handleProfile();
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          darkMode && { color: "#fff" },
                        ]}
                      >
                        Profile
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setDropdownVisible(false);
                        handleAnalytics();
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          darkMode && { color: "#fff" },
                        ]}
                      >
                        Analytics
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setDropdownVisible(false);
                        handleLogout();
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownText,
                          darkMode && { color: "#fff" },
                        ]}
                      >
                        Logout
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            </Modal>
          </View>
          <TouchableOpacity onPress={toggleTheme}>
            {darkMode ? (
              <Sun size={28} color="#FFD700" />
            ) : (
              <Moon size={28} color="#222" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>

        {/* fetch lead btn */}
        <TouchableOpacity
          style={[
            styles.customButton,
            {
              backgroundColor: "#A6B7DC",
              paddingHorizontal: 20,
              maxHeight: 50,
            },
          ]}
          onPress={handleFetchLead} 
        >
          <Text style={styles.buttonText}>Fetch Lead</Text>
        </TouchableOpacity>

        {/* Company Name Box */}
        <TouchableOpacity style={styles.leadBtn} onPress={() => router.push("./fetchLead")}>
          <Text style={styles.leadCompanyName} >
          {companyName }
          </Text>
          
        </TouchableOpacity>


      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: darkMode ? "#222" : "#f0f0f0",
              borderRadius: 24,
              paddingHorizontal: 14,
              paddingVertical: 6,
              marginTop: 10,
              marginBottom: 10,
              flex: 1,
              marginRight: 10,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                color: darkMode ? "#fff" : "#222",
                fontSize: 20,
                opacity: 0.7,
                padding: 5,
                marginBottom: 0,
              }}
              placeholder="Search..."
              placeholderTextColor={darkMode ? "#aaa" : "#888"}
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Search size={22} color={darkMode ? "#fff" : "#222"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addLeadCircle}
            onPress={() => router.push("/addLead/addlead")}
          >
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f5fb",
    paddingVertical: 0,
    paddingHorizontal: 18,
    maxHeight: "70%",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  leadBtn: {
    backgroundColor: "#3790a1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    marginRight: 10,
    alignItems: "center",
    minWidth: "50%",
    maxWidth: "65%",
  },
  leadCompanyName: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
    letterSpacing: 0.6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSection: {
    flexDirection: "row",
    gap: 18,
  },

  buttonContainer: {
    marginTop: 0,
    gap: 12,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    minHeight: 120,
    position: "relative",
  },

  customButton: {
    borderRadius: 100,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    marginLeft: 12,
  },
  greeting: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#666",
    letterSpacing: 0.7,
  },
  name: {
    fontFamily: "Inter-SemiBold",
    fontSize: 38,
    letterSpacing: 0.8,
    fontWeight: "semibold",
    color: "#000000",

    textDecorationLine: "underline",
  },
  // Add dropdown styles
  dropdownWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 50,
    marginRight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.01)",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    minWidth: 120,
    paddingVertical: 8,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  addLeadCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#3790a1",
    alignItems: "center",
    justifyContent: "center",
    // Optional: add shadow for better appearance
    shadowColor: "#3790a1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
});
