<<<<<<< HEAD
import { router } from "expo-router";
import { Moon, Plus, Search, Sun, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';


import { setCurrentFetchedLead, unsetCurrentLead, } from "@/store/assignedLeadSlice";
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




export default function DashboardHeader() {
   
  const { darkMode, toggleTheme } = useTheme();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [search, setSearch] = useState("");
  const colorScheme = useColorScheme();
  const[CRMName,setCRM]=useState("");
  const [prev,setPrev]=useState({});
 const agentEmail = useSelector((state: any) => state.agent.assignedTo);
 const dispatch=useDispatch();
  const greeting = () => {
    return `welcome ${agentEmail || "Agent"}`;
  };
  useEffect(()=>{
    const crmName=async()=>{
     const res= await fetch('http://192.168.29.123:3000/crm-name')
     const data=await res.json()
    setCRM(data)
    }
    crmName()
    dispatch(unsetCurrentLead())
  },[agentEmail])
  
 
 //----------------------handle click on fetch Lead Button------------------------------------------
  const handleFetchLead = async () => {
  const response = await fetch("http://192.168.29.123:3000/forex-leads/assign", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: agentEmail}) // 👈 your user ID here
    });
    
   const data = await response.json();
  
    dispatch(setCurrentFetchedLead(data.assignedLead))
  };

  
  const Company_name= useSelector((state:any)=>state.leads.currentFetchedLead?.Company_name || "No Lead Assigned")



  const handleLogout = () => {
    if(Company_name!=="No Lead Assigned")
    {
        alert("Can't logout Lead Assigned")
        return;
    }
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
            <Text style={textStyle}>{CRMName.slice(0,-2).toUpperCase()} CRM</Text>
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
              backgroundColor: "#815355",
              paddingHorizontal: 20,
              maxHeight: 50,
            },
            Company_name!="No Lead Assigned"&&styles.disabledSaveBtn
          ]}
          onPress={handleFetchLead} 
          disabled={Company_name!=="No Lead Assigned"}
        >
          <Text style={styles.buttonText}>Fetch Lead</Text>
        </TouchableOpacity>

        {/* Company Name Box */}
        <TouchableOpacity style={[styles.leadBtn,Company_name=="No Lead Assigned"&&styles.disabledSaveBtn]} onPress={() => router.push("./fetchLead")} disabled={Company_name=="No Lead Assigned"}>
          <Text style={styles.leadCompanyName} >
          {Company_name?.replace(/^->\s*/, "") || "No Lead Assigned" }
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
              backgroundColor: darkMode ? "#888" : "#f0f0f0",
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
                opacity: 0.8,
                padding: 8,
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
  disabledSaveBtn: {
    opacity: 0.4, // visually indicate disabled
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
=======

import { router } from "expo-router";
import { Moon, Plus, Search, Sun, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentFetchedLead } from "@/store/assignedLeadSlice";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { useTheme } from "../../ThemeContext"; // adjust path as needed


const apiUrl = process.env.EXPO_PUBLIC_API_URL;
function debounce(func: (...args: any[]) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}


export default function DashboardHeader() {
   
  const { darkMode, toggleTheme } = useTheme();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [search, setSearch] = useState("");
  const colorScheme = useColorScheme();
  const[CRMName,setCRM]=useState("");

  const [suggestions, setSuggestions] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);
const [agentName, setAgentName] = useState("");
 const agentEmail = useSelector((state: any) => state.agent.assignedTo);
 const dispatch=useDispatch();
  const greeting = () => {
    return `Welcome ${agentName || "Agent"}`;
  };
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${apiUrl}/agentProfile/fetch?email=${agentEmail}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setAgentName(data.name);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to load profile");
    }
  };
 
  useEffect(() => {
  const crmName = async () => {
    try {
      const res = await fetch(`${apiUrl}/crm-name`);
      const data = await res.json();
      setCRM(data);
    } catch (err) {
      console.error("Error fetching CRM name:", err);
    }
  };

  const normalizeLeads = async () => {
    try {
      const res = await fetch(`${apiUrl}/agents/normalize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
    } catch (err) {
      console.error("❌ Error normalizing leads:", err);
    }
  };

  crmName();
  fetchProfile();
  normalizeLeads();
}, []);

  useEffect(() => {
  if (search.trim()) {
    debouncedSearch(search);
  } else {
    setSuggestions([]);
    setShowSuggestions(false);
  }
}, [search]);

  
 
 //----------------------handle click on fetch Lead Button------------------------------------------
  const handleFetchLead = async () => {
  const response = await fetch(`${apiUrl}/forex-leads/assign`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: agentEmail}) // 👈 your user ID here
    });
   const data = await response.json();
    dispatch(setCurrentFetchedLead(data.assignedLead))
  };

  
  const Company_name= useSelector((state:any)=>state.leads.currentFetchedLead?.Company_name || "No Lead Assigned")



  const handleLogout = () => {
    if(Company_name!=="No Lead Assigned")
    {
        alert("Can't logout Lead Assigned")
        return;
    }
    router.push("/auth/login");
  };
  const handleProfile = () => {
    router.push("/profile");
  };
  const handleAnalytics = () => {
    router.push("/myAnalytics");
  };
  //handle search functionality
  const handleSearch = async (query: string) => {
  if (!query.trim()) {
    setSuggestions([]);
    setShowSuggestions(false);
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/search-companies?q=${query}&agentId=${agentEmail}`);
    const data = await res.json();
    setSuggestions(data); // Array of { _id, Company_name, status }
    setShowSuggestions(true);
  } catch (err) {
    console.error("Search error:", err);
    Alert.alert("Error", "Failed to fetch suggestions");
  }
};
const debouncedSearch = debounce(handleSearch, 300);

//handle suggestion click
const handleSelectCompany = (item:any) => {
  setSearch('');
  setShowSuggestions(false);

  router.push({
    pathname: `${item.status === "out of station" ? "outofstation" : item.status=="call me later"?"callmelater":item.status}/[id]`,
    params: { id: item._id },
  });
};


  // Example: apply dark mode styles conditionally
  const containerStyle = [
    styles.container,
    darkMode && { backgroundColor: "#222", borderBottomColor: "#444" },
  ];
  const textStyle = [styles.name, darkMode && { color: "#fff" }];
  const greetingStyle = [styles.greeting, darkMode && { color: "#ccc" }];

  return (
    <View style={[containerStyle,]}>
      <View style={[styles.header,]}>
          <View style={styles.titleContainer}>
            <Text style={textStyle} numberOfLines={1}
  ellipsizeMode="tail">{CRMName.slice(0,-2).toUpperCase()} CRM</Text>
        </View>
          <View style={[styles.rightSection,]}>
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
      <Text style={greetingStyle}>{greeting()}</Text>

      <View style={styles.buttonContainer}>

        {/* fetch lead btn */}
        
        <TouchableOpacity
          style={[
            styles.customButton,
            {
              backgroundColor: "#815355",
              paddingHorizontal: 20,
              maxHeight: 50,
            },
            Company_name!="No Lead Assigned"&&styles.disabledSaveBtn
          ]}
          onPress={handleFetchLead} 
          disabled={Company_name!=="No Lead Assigned"}
        >
          <Text style={styles.buttonText}>Fetch Lead</Text>
        </TouchableOpacity>

        {/* Company Name Box */}
        <TouchableOpacity style={[styles.leadBtn,Company_name=="No Lead Assigned"&&styles.disabledSaveBtn]} onPress={() => router.push("./fetchLead")} disabled={Company_name=="No Lead Assigned"}>
          <Text style={styles.leadCompanyName} >
          {Company_name?.replace(/^->\s*/, "") || "No Lead Assigned" }
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
              backgroundColor: darkMode ? "#444" : "#f0f0f0",
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
                color: darkMode ? "#fff" : "#000",
                fontSize: 20,
                opacity: 0.8,
                padding: 8,
                marginBottom: 0,
              }}
              placeholder="Search..."
              placeholderTextColor={darkMode ? "#fff" : "#888"}
              value={search}
             onChangeText={(text) => {
  setSearch(text);
  debouncedSearch(text);
}}
            />
            <TouchableOpacity disabled>
              <Search size={22} color={darkMode ? "#fff" : "#222"} />
            </TouchableOpacity>
            {showSuggestions && suggestions.length > 0 && (
  <ScrollView
    style={{
      position: "absolute",
      top: 54,
      left: 0,
      right: 60,
      zIndex: 10,
      backgroundColor: darkMode ? "#444" : "#f2f2efff",
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      maxHeight: 500,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      padding: 10,
      marginTop: 5,
      maxWidth: 350,

    }}
  >
    {suggestions.map((item:any, index) => (
      <TouchableOpacity
        key={item._id}
        onPress={() => handleSelectCompany(item)}
        style={{
          padding: 10,
          borderBottomColor: "#eee",
          borderBottomWidth: index === suggestions.length - 1 ? 0 : 1,
        }}
      >
        <Text style={{ color: darkMode ? "#fff" : "#222" }}>
          {item.Company_name}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
)}

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
    paddingHorizontal: 12,
    maxHeight: "70%",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    maxWidth: "100%",
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
    marginVertical: 10,
 
  },
  rightSection: {
    flexDirection: "row",
    gap:16,
  },
  disabledSaveBtn: {
    opacity: 0.4, // visually indicate disabled
  },

  buttonContainer: {
    marginVertical: 10,
    gap: 12,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
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
    flex: 3,               // take 3 parts of space
  justifyContent: "center",
  marginRight: 8,

  },
  greeting: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
    color: "#666",
    letterSpacing: 0.7,
    maxWidth:300,
  },
  name: {
     fontFamily: "Inter-SemiBold",
  fontSize: 28,
  fontWeight: "600",
  color: "#000000",
  textDecorationLine: "underline",
  flexShrink: 1,
  
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
>>>>>>> 80530c0e1ce2f0de6e9f15ab7869442ae1267f66
