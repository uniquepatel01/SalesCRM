import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { authedFetch } from "../../services/authedFetch";
import { getSavedAgent, getToken } from "../../services/auth";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import { setAgent } from "../../store/agentSlice";
import Loading from "../../components/ui/Loading";
import { useTheme } from "../../ThemeContext";

export default function Profile() {
  const { darkMode } = useTheme();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    crmType: "",
    number: "",
    joining: "",
    address: "",
    gender: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);
  const agentEmail = useSelector((state) => state.agent.assignedTo);
  const agentId = useSelector((state) => state.agent.assignedTo);
  const token = useSelector((state) => state.agent.token); // ✅ store JWT in Redux after login
  // ✅ store JWT in Redux after login

  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      setLoading(true);

      if (!agentId) {
        throw new Error("Agent ID not found");
      }

      const res = await authedFetch(`${apiUrl}/api/agent/${agentId}`, {
        method: "GET",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // The API might return the profile data directly or nested in a data/profile property
      const profileData = data.data || data.profile || data;

      // Map the new API response structure to our profile state
      const mappedProfile = {
        name: profileData.name || "",
        email: profileData.email || "",
        crmType: profileData.crmKey,
        number: profileData.number || "",
        joining: profileData.joining || "",
        address: profileData.address || "",
        gender: profileData.gender || "",
      };

      setProfile(mappedProfile);

      // Update agent info in Redux store if available
      if (mappedProfile.name) {
        const { id: agentId } = await getSavedAgent();
        const token = await getToken();
        dispatch(
          setAgent({
            id: agentId || "",
            name: mappedProfile.name,
            token: token || "",
          })
        );
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      Alert.alert("Error", `Failed to fetch profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agentEmail) {
      setProfile((prev) => ({ ...prev, email: agentEmail }));
      fetchProfile();
    }
  }, []);

  const validateProfile = () => {
    // Check for empty required fields
    const requiredFields = ["name", "email", "crmType"];

    for (const fieldKey of requiredFields) {
      if (!profile[fieldKey] || profile[fieldKey].trim() === "") {
        const field = fields.find((f) => f.key === fieldKey);
        Alert.alert("Error", `${field?.label || fieldKey} is required.`);
        return false;
      }
    }

    // Validate number if provided
    if (profile.number && !/^[0-9]{10}$/.test(profile.number)) {
      setMobileError("Number must be exactly 10 digits.");
      return false;
    }

    setMobileError("");
    return true;
  };

  const handleSave = async () => {
    if (!validateProfile()) {
      return;
    }

    try {
      setLoading(true);

      const updateData = {
        name: profile.name.trim(),
        email: profile.email,
        // crmType: profile.crmType.trim(),
        number: profile.number,
        joining: profile.joining,
        address: profile.address.trim(),
        gender: profile.gender.trim(),
      };

      // Get the agent ID from SecureStore
      const { id: agentId } = await getSavedAgent();
      if (!agentId) {
        throw new Error("Agent ID not found");
      }

      // Update profile data
      const res = await fetch(`${apiUrl}/api/agent/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // The API might return the profile data directly or nested in a data/profile property
      const profileData = data.data || data.profile || data;

      // Update local state with response data
      const mappedProfile = {
        name: profileData.name || profile.name,
        email: profileData.email || profile.email,
        // crmType: profileData.crmType || profile.crmType,
        number: profileData.number || profile.number,
        joining: profileData.joining || profile.joining,
        address: profileData.address || profile.address,
        gender: profileData.gender || profile.gender,
        imageUri: profileData.imageUri || profile.imageUri,
      };

      setProfile(mappedProfile);
      if (mappedProfile.imageUri) {
        setImagePreview(mappedProfile.imageUri);
      }

      // Update agent info in Redux store
      if (mappedProfile.name) {
        const { id: agentId } = await getSavedAgent();
        const token = await getToken();
        dispatch(
          setAgent({
            id: agentId || "",
            name: mappedProfile.name,
            token: token || "",
          })
        );
      }

      Alert.alert("Success", "Profile updated successfully!");
      setEditMode(false);
      router.back();
    } catch (err) {
      console.error("Error updating profile:", err);
      Alert.alert("Error", `Failed to update profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
  { label: "Name", key: "name", required: true, type: "text" },
  { label: "Email", key: "email", required: true, type: "text" },
  { label: "CRM Type", key: "crmType", required: true, type: "text" },
  { label: "Number", key: "number", required: false, type: "number" },
  { label: "Joining Date", key: "joining", required: false, type: "date" },
  { label: "Address", key: "address", required: false, type: "text" },
  { label: "Gender", key: "gender", required: false, type: "text" },
];

const formatValue = (field, value) => {
  if (!value) return "Not provided";

  if (field.type === "date") {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return value;
};



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.outerContainer}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={{ flex: 1, backgroundColor: darkMode ? "#181A20" : "#fff" }}>
    {/* 🔹 Fixed Header */}
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 50, // status bar spacing
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: darkMode ? "#181A20" : "#f5f5f5",
        borderBottomWidth: 1,
        borderBottomColor: darkMode ? "#333" : "#ccc",
      }}
    >
      <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
        <Ionicons
          name="arrow-back"
          size={28}
          color={darkMode ? "#fff" : "#000"}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.headerTitle,
          { flex: 1, textAlign: "center" },
          darkMode && { color: "#fff" },
        ]}
      >
        Profile
      </Text>
      {/* Optional right side space filler */}
      <View style={{ width: 28 }} />
    </View>

    {/* 🔹 Scrollable content */}
    {loading ? (
      <Loading />
    ) : (
      <ScrollView
        contentContainerStyle={[
          styles.container,
          darkMode && { backgroundColor: "#181A20" },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <View style={styles.placeholderImage}>
            <MaterialIcons name="person" size={40} color="#888" />
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setEditMode((prev) => !prev)}
          disabled={loading}
        >
          <MaterialIcons
            name={editMode ? "close" : "edit"}
            size={20}
            color="#3790a1"
          />
          <Text style={styles.editBtnText}>
            {editMode ? "Cancel" : "Edit"}
          </Text>
        </TouchableOpacity>

        {/* Table Fields */}
        <View
          style={[
            styles.table,
            darkMode && { backgroundColor: "#3f3f3ffd" },
          ]}
        >
          {fields.map((field) => (
            <View style={styles.tableRow} key={field.key}>
              <Text style={styles.tableLabel}>
                {field.label}
                {field.required && (
                  <Text style={styles.requiredAsterisk}>*</Text>
                )}
                :
              </Text>
              <View style={{ flex: 2 }}>
                {editMode && field.key !== "email" ? (
                  <>
                    <TextInput
                      style={styles.tableValueInput}
                      value={profile[field.key]}
                      onChangeText={(text) => {
                        if (field.key === "number") {
                          const numeric = text.replace(/[^0-9]/g, "");
                          setProfile({ ...profile, [field.key]: numeric });
                          if (numeric.length !== 10 && numeric.length > 0) {
                            setMobileError("Number must be exactly 10 digits.");
                          } else {
                            setMobileError("");
                          }
                        } else {
                          setProfile({ ...profile, [field.key]: text });
                        }
                      }}
                      placeholder={`Enter ${field.label}`}
                      placeholderTextColor="#888"
                      keyboardType={
                        field.key === "number" ? "numeric" : "default"
                      }
                      maxLength={field.key === "number" ? 10 : 30}
                      multiline={
                        field.key !== "number" && field.key !== "email"
                      }
                    />
                    {field.key === "number" && mobileError ? (
                      <Text style={styles.errorMsg}>{mobileError}</Text>
                    ) : null}
                  </>
                ) : (
                  <Text
                    style={[
                      styles.tableValue,
                      field.key === "email" && {
                        flexShrink: 1,
                        width: "100%",
                      },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {formatValue(field, profile[field.key])}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Save Button */}
        {editMode && (
          <TouchableOpacity
            style={[styles.saveBtn, loading && styles.disabledBtn]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveBtnText}>
              {loading ? "Saving..." : "Save Profile"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    )}
  </View>
</TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "rgba(252, 250, 250, 1)",
    justifyContent: "center",
  },
  container: {
    // full screen width
    flex: 1,
    backgroundColor: "rgba(255, 253, 253, 0.96)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  loadingText: {
    fontSize: 16,
    color: "#3790a1",
    fontWeight: "bold",
  },
  placeholderImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    position: "relative",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000ff",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 12,
    backgroundColor: "#e6f3f7",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  editBtnText: {
    color: "#3790a1",
    fontSize: 15,
    marginLeft: 4,
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    minWidth: 320,
    maxWidth: 370,
    marginBottom: 10,
    backgroundColor: "#f2f5f7ff",
    borderRadius: 10,
    padding: 14,
    elevation: 1,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    backgroundColor: "#dadada88",
    padding: 10,
    borderRadius: 8,
  },
  tableLabel: {
    width: 110,
    fontWeight: "bold",
    color: "#3790a1",
    fontSize: 15,
  },
  requiredAsterisk: {
    color: "red",
    fontSize: 16,
  },
  tableValue: {
    color: "#222",
    fontSize: 15,
    paddingLeft: 8,
    width: "100%",
    textAlignVertical: "center",
  },
  tableValueInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    color: "#222",
    fontSize: 15,
    paddingLeft: 8,
    paddingVertical: 4,
    width: "100%",
  },
  saveBtn: {
    backgroundColor: "#3790a1",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "center",
  },
  disabledBtn: {
    backgroundColor: "#ccc",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  errorMsg: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 2,
  },
});
