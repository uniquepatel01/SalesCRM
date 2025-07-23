import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import { setAgentName } from "../../store/agentSlice";
import { ActivityIndicator } from "react-native";
import Loading from "../../components/ui/Loading"
import { useTheme } from "../../ThemeContext";
  
export default function Profile() {
  const { darkMode } = useTheme();
  const [profile, setProfile] = useState({
    name: "",
    designation: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    country: "",
    imageUri: "", // Keep as imageUri for frontend consistency
  });

  const [imagePreview, setImagePreview] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [mobileError, setMobileError] = useState("");
  const [loading, setLoading] = useState(false);
  const agentEmail = useSelector((state) => state.agent.assignedTo);

  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      setLoading(true);
    
      
      const res = await fetch(`${apiUrl}/agentProfile/fetch?email=${agentEmail}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();

      
      // Backend returns the profile data directly
      const mappedProfile = {
        name: data.name || "",
        designation: data.designation || "",
        email: data.email || "",
        mobile: data.mobile || "",
        city: data.city || "",
        state: data.state || "",
        country: data.country || "",
        imageUri: data.imageUri || "", // Backend uses imageUri field
      };
      
      setProfile(mappedProfile);
      setImagePreview(mappedProfile.imageUri);
      
      // Update agent name in Redux store if available
      if (mappedProfile.name) {
        dispatch(setAgentName(mappedProfile.name));
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

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission denied", "Allow access to photo library");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImagePreview(uri);
        setProfile({ ...profile, imageUri: uri });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const validateProfile = () => {
    // Check for empty required fields
    const requiredFields = ["name", "designation", "mobile", "city", "state", "country"];
    
    for (const fieldKey of requiredFields) {
      if (!profile[fieldKey] || profile[fieldKey].trim() === "") {
        const field = fields.find(f => f.key === fieldKey);
        Alert.alert("Error", `${field?.label || fieldKey} is required.`);
        return false;
      }
    }

    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(profile.mobile)) {
      setMobileError("Mobile number must be exactly 10 digits.");
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
      
      // Create FormData for multipart upload
      const formData = new FormData();
      
      // Add all profile fields exactly as backend expects
      formData.append("email", profile.email);
      formData.append("name", profile.name.trim());
      formData.append("designation", profile.designation.trim());
      formData.append("mobile", profile.mobile);
      formData.append("city", profile.city.trim());
      formData.append("state", profile.state.trim());
      formData.append("country", profile.country.trim());

      // Add image if selected and it's a new local file
      // Backend expects field name to be 'profileImage'
      if (profile.imageUri && profile.imageUri.startsWith("file://")) {
        // Get file info
        const uriParts = profile.imageUri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        
        formData.append("profileImage", {
          uri: profile.imageUri,
          type: `image/${fileType}`,
          name: `profile_${Date.now()}.${fileType}`,
        });
      }

      // Make the API call to the correct endpoint
      const res = await fetch(`${apiUrl}/agentProfile/update`, {
        method: "POST", // Backend uses POST for update
        body: formData,
        headers: {
          "Accept": "application/json",
          // Don't set Content-Type header for FormData - let the browser set it with boundary
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      
      // Backend returns { message: "...", profile: {...} }
      const updatedProfile = data.profile;
      
      // Update local state with response data
      const mappedProfile = {
        name: updatedProfile.name || profile.name,
        designation: updatedProfile.designation || profile.designation,
        email: updatedProfile.email || profile.email,
        mobile: updatedProfile.mobile || profile.mobile,
        city: updatedProfile.city || profile.city,
        state: updatedProfile.state || profile.state,
        country: updatedProfile.country || profile.country,
        imageUri: updatedProfile.imageUri || profile.imageUri,
      };
      
      setProfile(mappedProfile);
      setImagePreview(mappedProfile.imageUri);
      
      // Update agent name in Redux store
      if (mappedProfile.name) {
        dispatch(setAgentName(mappedProfile.name));
      }
      
      Alert.alert("Success", "Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      Alert.alert("Error", `Failed to update profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
    router.back()
  };

  const fields = [
    { label: "Name", key: "name", required: true },
    { label: "Designation", key: "designation", required: true },
    { label: "Email", key: "email", required: true },
    { label: "Mobile", key: "mobile", required: true },
    { label: "City", key: "city", required: false },
    { label: "State", key: "state", required: false },
    { label: "Country", key: "country", required: false },
  ];


  
    const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Camera access is required to take a photo.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImagePreview(uri);
        setProfile({ ...profile, imageUri: uri });
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo.");
    }
  };

  const handleImageOptions = () => {
    Alert.alert(
    "Upload Profile Picture",
    "Select an option",
    [
        { text: "Cancel", style: "cancel" },
      { text: "Take Photo", onPress: takePhoto },
      { text: "Choose from Gallery", onPress: pickImage },
    
    ],
    { cancelable: true }
  );
  };

  const handleRemoveImage = async () => {
  Alert.alert("Remove Image", "Are you sure you want to remove your profile picture?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Remove",
      style: "destructive",
      onPress: async () => {
        try {
          setLoading(true);
          const res = await fetch(`${apiUrl}/agentProfile/delete-image`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ email: profile.email }),
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to delete image");
          }

          const data = await res.json();
         

          // Update local state
          setImagePreview("");
          setProfile((prev) => ({
            ...prev,
            imageUri: "",
          }));

          Alert.alert("Success", "Profile image removed successfully.");
        } catch (error) {
          console.error("❌ Failed to delete image:", error);
          Alert.alert("Error", error.message);
        } finally {
          setLoading(false);
        }
      },
    },
  ]);
};


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.outerContainer}
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {loading ?(
    <Loading/>
):(<ScrollView
        contentContainerStyle={[styles.container,darkMode && { backgroundColor: "#181A20" }]}
        keyboardShouldPersistTaps="handled"
        
      >
        <View style={{ position: "absolute", top: 50, left:"auto", zIndex: 500 ,}}>
  <Text style={[styles.headerTitle,darkMode&&{color:"#fff"}]}>Profile</Text>
</View>
       {/* ✅ Back Button */}
    <View style={{ position: "absolute", top: 50, left: 16, zIndex: 100 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons
                   name="arrow-back"
                   size={28}
                   color={darkMode ? "#fff" : "#000"}
                 />
      </TouchableOpacity>
    </View>
    
        {/* Large Image Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setModalVisible(false)}
              activeOpacity={1}
            >
              {imagePreview ? (
                <Image source={{ uri: imagePreview }} style={styles.largeImage} />
              ) : null}
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Image Preview (tap to enlarge) */}
     <View style={{ alignItems: "center", justifyContent: "center"
      }}>
  <TouchableOpacity
    onPress={() => imagePreview && setModalVisible(true)}
    activeOpacity={0.8}
  >
    {imagePreview ? (
      <Image source={{ uri: imagePreview }} style={styles.profileImage} />
    ) : (
      <View style={styles.placeholderImage}>
        <MaterialIcons name="person" size={40} color="#888" />
        <Text style={{ color: "#888", fontSize: 12 }}>Upload Image</Text>
      </View>
    )}
  </TouchableOpacity>

  {editMode && (
    <View style={{ flexDirection: "row", marginTop: -10, gap: 10, }}>
            <TouchableOpacity
        onPress={handleImageOptions}
        activeOpacity={0.8}
        style={styles.uploadIconTouchable}
      >

        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          easing="ease-out"
          style={styles.uploadIcon}
        >
          <MaterialIcons name="file-upload" size={24} color="#3790a1" />
        </Animatable.View>
      </TouchableOpacity>

      {imagePreview ? (
        <TouchableOpacity
          onPress={handleRemoveImage}
          activeOpacity={0.8}
          style={styles.uploadIconTouchable}
        >
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            easing="ease-out"
            style={[styles.uploadIcon, { backgroundColor: "#fdd", borderColor: "#f00" }]}
          >
            <MaterialIcons name="delete" size={24} color="#d00" />
          </Animatable.View>
        </TouchableOpacity>
      ) : null}
    </View>
  )}
</View>


        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setEditMode((prev) => !prev)}
          disabled={loading}
        >
          <MaterialIcons name={editMode ? "close" : "edit"} size={20} color="#3790a1" />
          <Text style={styles.editBtnText}>{editMode ? "Cancel" : "Edit"}</Text>
        </TouchableOpacity>

        {/* Table-like Profile Fields */}
        <View style={[styles.table,darkMode&&{backgroundColor:"#3f3f3ffd"}]}>
          {fields.map((field) => (
            <View style={styles.tableRow} key={field.key}>
              <Text style={styles.tableLabel}>
                {field.label}
                {field.required && <Text style={styles.requiredAsterisk}>*</Text>}:
              </Text>
              <View style={{ flex: 2 }}>
                {editMode && field.key !== "email" ? (
                  <>
                    <TextInput
                      style={styles.tableValueInput}
                      value={profile[field.key]}
                      onChangeText={(text) => {
                        if (field.key === "mobile") {
                          const numeric = text.replace(/[^0-9]/g, "");
                          setProfile({ ...profile, [field.key]: numeric });
                          if (numeric.length !== 10) {
                            setMobileError("Mobile number must be exactly 10 digits.");
                          } else {
                            setMobileError("");
                          }
                        } else {
                          setProfile({ ...profile, [field.key]: text });
                        }
                      }}
                      placeholder={`Enter ${field.label}`}
                      placeholderTextColor="#888"
                      keyboardType={field.key === "mobile" ? "numeric" : "default"}
                      maxLength={field.key === "mobile" ? 10 : 30}
                      multiline={field.key !== "mobile" && field.key !== "email"}
                    />
                    {field.key === "mobile" && mobileError ? (
                      <Text style={styles.errorMsg}>{mobileError}</Text>
                    ) : null}
                  </>
                ) : (
                  <Text
  style={[
    styles.tableValue,
    field.key === "email" && { flexShrink: 1, width: '100%' }
  ]}
  numberOfLines={1}
  ellipsizeMode="middle"
>
  {profile[field.key] || "Not provided"}
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
      </ScrollView>)}
      
   
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
    alignItems:"center",
    paddingHorizontal:8
},

  loadingText: {
    fontSize: 16,
    color: "#3790a1",
    fontWeight: "bold",
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginBottom: 10,
    resizeMode: "cover",
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
  uploadIcon: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 6,
    elevation: 5,
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
  

  uploadIconTouchable: {
    position: "absolute",
    bottom: -20,
    right: 30,
    zIndex: 99,
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
    backgroundColor:"#dadada88",
    padding: 10,
    borderRadius:8

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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.68)",
    justifyContent: "center",
  },
  largeImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    resizeMode: "cover",
    alignSelf: "center",
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 2,
  },
});