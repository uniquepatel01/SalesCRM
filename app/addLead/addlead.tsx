import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "../../ThemeContext";
import ActionSelector from "@/components/ui/ActionSelector";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function AddLead() {
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState({
    businessType: "",
    businessVolume: "",
    fullName: "",
    companyName: "",
    address: "",
    email: "",
    mobile: "",
    alternate: "",
    selectedAction: "",
    source: "",
  });

  const [actions, setActions] = useState<string[]>([]);
  const [businessTypes, setBusinessTypes] = useState<any[]>([]);
  const [businessVolumes, setBusinessVolumes] = useState<any[]>([]);

  const agent = useSelector((state: any) => state.agent);
  const token = agent.token;

  const isAgent = !!agent.assignedTo;

  // 🔹 Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Buckets (Statuses)
        const bucketRes = await fetch(`${apiUrl}/apk/buckets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bucketData = await bucketRes.json();
        setActions(bucketData?.buckets || []);

        // 🔹 Business Types
        const typeRes = await fetch(
          `${apiUrl}/api/crm/dropdown/business-types`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const typeData = await typeRes.json();
        setBusinessTypes(typeData.businessTypes || []);

        // 🔹 Business Volumes
        const volRes = await fetch(
          `${apiUrl}/api/crm/dropdown/business-volumes`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const volData = await volRes.json();
        setBusinessVolumes(volData.businessVolumes || []);
      } catch (err) {
        console.error("❌ Error fetching dropdown data:", err);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🔹 Save lead
  const handleSave = async () => {
    const requiredFields = [
      "companyName",
      "fullName",
      "address",
      "mobile", // always required
      ...(isAgent ? ["selectedAction"] : []),
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]?.trim()
    );

    if (missingFields.length > 0) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    const payload = {
      Company_name: formData.companyName,
      Business_vol_Lakh_Per_Year: formData.businessVolume || "N/A",
      Address: formData.address,
      Mobile_no: formData.mobile,
      Landline_no: formData.alternate || "N/A",
      E_mail_id: formData.email || "N/A",
      status: formData.selectedAction || "",
      assignedTo: isAgent ? agent.assignedTo : null,
      business_type: formData.businessType || "",
      City: "",
      State: "",
      Country: "",
      contact_person: formData.fullName,
      source: formData.source || "",
      Remarks: [],
    };

    try {
      const res = await fetch(`${apiUrl}/api/crm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to save lead");

      Alert.alert("Success", "Lead saved successfully");
      router.back();
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to save lead");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          darkMode && { backgroundColor: "#181A20" },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
            style={{ position: "absolute", top: 0, left: 10, zIndex: 100 }}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={darkMode ? "#fff" : "#000"}
            />
          </Pressable>
          <Text style={[styles.headerTitle, darkMode && { color: "#fff" }]}>
            New Lead Entry
          </Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Source */}
        <TextInput
          style={styles.input}
          placeholder="Enter Source"
          placeholderTextColor="#888"
          value={formData.source}
          onChangeText={(val) => handleChange("source", val)}
        />

        {/* Business Type */}
        <View style={styles.dropdownContainerFull}>
          <Picker
            selectedValue={formData.businessType}
            onValueChange={(val) => handleChange("businessType", val)}
            style={styles.picker}
          >
            <Picker.Item label="Select Business Type" value="" color="#888" />
            {businessTypes.map((type) => (
              <Picker.Item
                key={type._id}
                label={type.businessTypeName}
                value={type.businessTypeName}
              />
            ))}
          </Picker>
        </View>

        {/* Business Volume */}
        <View style={styles.dropdownContainerFull}>
          <Picker
            selectedValue={formData.businessVolume}
            onValueChange={(val) => handleChange("businessVolume", val)}
            style={styles.picker}
          >
            <Picker.Item label="Select Business Volume" value="" color="#888" />
            {businessVolumes.map((vol) => (
              <Picker.Item
                key={vol._id}
                label={vol.businessVolumeName}
                value={vol.businessVolumeName}
              />
            ))}
          </Picker>
        </View>

        {/* Name, Company, Address */}
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#888"
          value={formData.fullName}
          onChangeText={(val) => handleChange("fullName", val)}
        />
        <TextInput
          style={[
            styles.input,
            
          ]}
          placeholder="Enter Company Name"
          placeholderTextColor="#888"
          value={formData.companyName}
          onChangeText={(val) => handleChange("companyName", val)}
        />
        <TextInput
          style={[
            styles.input,
            styles.addressInput,
            
          ]}
          placeholder="Enter Complete Address"
          placeholderTextColor="#888"
          value={formData.address}
          onChangeText={(val) => handleChange("address", val)}
          multiline
        />

        {/* Mobile (Required) */}
        <TextInput
          style={[
            styles.input,
            !formData.mobile && {
              borderBottomColor: "red",
              borderBottomWidth: 1,
            },
          ]}
          placeholder="Enter Mobile Number"
          placeholderTextColor="#888"
          value={formData.mobile}
          onChangeText={(val) => handleChange("mobile", val)}
          keyboardType="phone-pad"
        />

        {/* Alternate */}
        <TextInput
          style={styles.input}
          placeholder="Enter Alternate Number"
          placeholderTextColor="#888"
          value={formData.alternate}
          onChangeText={(val) => handleChange("alternate", val)}
          keyboardType="phone-pad"
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#888"
          value={formData.email}
          onChangeText={(val) => handleChange("email", val)}
          keyboardType="email-address"
        />

        {/* Status (only for Agent) */}
        {isAgent && (
          <View style={{ marginBottom: 8 }}>
            <ActionSelector
              selectedAction={formData.selectedAction}
              setSelectedAction={(val) => handleChange("selectedAction", val)}
              darkMode={darkMode}
              actions={actions}
            />
          </View>
        )}

        {/* Save / Call Buttons */}
        <View style={styles.bottomRow}>
          <TouchableOpacity
            style={[
              styles.saveBtn,
              !formData.mobile && styles.disabledSaveBtn,
              isAgent && !formData.selectedAction && styles.disabledSaveBtn,
            ]}
            onPress={handleSave}
            disabled={!formData.mobile || (isAgent && !formData.selectedAction)}
          >
            <Text style={styles.saveBtnText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() =>
              formData.mobile && Linking.openURL(`tel:${formData.mobile}`)
            }
          >
            <Text style={styles.callBtnText}>CALL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#fff",
    // flexGrow: 1,
  },
  addressInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#111",
    marginLeft: "30%",
  },
  disabledSaveBtn: {
    opacity: 0.4,
  },
  dropdownContainerFull: {
    flex: 1,
    height:50,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    justifyContent: "center",
  },
  picker: {
    height: 55,
    color: "#222",
    fontSize: 16,
    width: "100%",
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#222",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 24,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#1da1f2",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginRight: 8,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  callBtn: {
    flex: 1,
    backgroundColor: "#19c37d",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginLeft: 8,
  },
  callBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
});
