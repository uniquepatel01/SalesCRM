import ActionSelector from "@/components/ui/ActionSelector";
import RemarksSection from "@/components/ui/RemarkSelector";

import {
  setChangedStatus,
  setCurrentFetchedLead,
  unsetCurrentLead,
} from "@/store/assignedLeadSlice";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function FetchLead() {
  const { darkMode } = useTheme();
  const [addRemarkVisible, setAddRemarkVisible] = useState(false);
  const [remarkInput, setRemarkInput] = useState("");
  const [, forceUpdate] = useState({});
  const [changeStatus, setStatus] = useState("");
  const [actions, setActions] = useState<string[]>([]); // ✅ dynamic buckets

  const { _id: leadId, status: currentStatus } = useSelector(
    (state: any) => state.leads.currentFetchedLead
  );
  const token = useSelector((state: any) => state.agent.token);

  const dispatch = useDispatch();

  // Update global state when status changes
  useEffect(() => {
    dispatch(setChangedStatus(changeStatus));
  }, [changeStatus]);

  // ✅ Fetch dynamic buckets on mount
  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const res = await fetch(`${apiUrl}/apk/buckets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data?.buckets && Array.isArray(data.buckets)) {
          setActions(data.buckets);
        } else {
          setActions([]);
        }
      } catch (err) {
        
        setActions([]);
      }
    };
    fetchBuckets();
  }, []);

  // ✅ Set default action as current lead status
  useEffect(() => {
    if (currentStatus) setStatus(currentStatus);
  }, [currentStatus]);

  const handleSave = async () => {
    if (!changeStatus.trim()) return;
    try {
      const response = await fetch(`${apiUrl}/apk/update-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leadId,
          bucketName: changeStatus.toLowerCase(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        return Alert.alert("Error", data.message || "Failed to update status");
      }
      dispatch(unsetCurrentLead());
      router.push("/dashboard");
    } catch (err) {
     
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleAddRemark = async () => {
    if (!remarkInput.trim()) return;
    try {
      const response = await fetch(`${apiUrl}/apk/add-remarks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ leadId, remark: remarkInput }),
      });
      const data = await response.json();
      if (!response.ok || !data.updateLead) {
        return Alert.alert("Error", data.message || "Failed to add remark");
      }
      dispatch(setCurrentFetchedLead(data.updateLead));
      setRemarkInput("");
      setAddRemarkVisible(false);
    } catch (err) {
      
      Alert.alert("Error", "Something went wrong");
    }
  };

  const {
    Company_name,
    Business_vol_Lakh_Per_Year,
    Address,
    State,
    contact_person,
    Remarks,
    E_mail_id,
    Mobile_no,
    Landline_no,
  } = useSelector((state: any) => state.leads.currentFetchedLead);

  const handleEmail = (recipientEmail: string) => {
    if (
      !recipientEmail ||
      recipientEmail.trim() === "" ||
      recipientEmail === "N/A"
    ) {
      Alert.alert(
        "No email provided",
        "This lead does not have an email address."
      );
      return;
    }
    const emailUrl = `mailto:${recipientEmail}`;
    Linking.openURL(emailUrl).catch((err) =>
      console.error("Failed to open email client:", err)
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, darkMode && { backgroundColor: "#181A20" }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
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

        <Text style={[styles.header, darkMode && { color: "#fff" }]}>
          Details
        </Text>
        <Text style={[styles.company, darkMode && { color: "#7BB1FF" }]}>
          {Company_name || ""}
        </Text>

        <View style={styles.inputBox}>
          <Text>{contact_person || "contact person not found"}</Text>
        </View>
        <View style={styles.inputBox}>
          <Text>{Business_vol_Lakh_Per_Year || 0}</Text>
        </View>
        <View style={styles.inputBox}>
          <Text>{Address || ""}</Text>
        </View>
        <View style={styles.inputBox}>
          <Text>{State || "State not found"}</Text>
        </View>

        {/* Remarks Section */}
        <RemarksSection
          remarks={Remarks}
          onAddPress={() => setAddRemarkVisible(true)}
          darkMode={darkMode}
        />

        {/* ✅ Dynamic Action Dropdown */}
        <ActionSelector
          selectedAction={changeStatus}
          actions={actions}
          setSelectedAction={setStatus}
          darkMode={darkMode}
        />

        {/* Buttons */}
        <View style={styles.row}>
          <Text style={[styles.emailText, darkMode && { color: "#fff" }]}>
            {E_mail_id || "N/A"}
          </Text>
          <TouchableOpacity
            style={styles.emailBtn}
            onPress={() => handleEmail(E_mail_id)}
          >
            <Text selectable style={{ color: "#fff" }}>
              E-mail
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text
            selectable
            style={[styles.phoneText, darkMode && { color: "#fff" }]}
          >
            {Mobile_no
              ? Mobile_no.replace(/\s+/g, "").length > 10
                ? Mobile_no.replace(/\s+/g, "").slice(2)
                : Mobile_no.replace(/\s+/g, "")
              : "N/A"}
          </Text>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => {
              if (Mobile_no) {
                const cleanNumber = Mobile_no.replace(/\s+/g, ""); // remove all spaces
                const formatted =
                  cleanNumber.length > 10 ? cleanNumber.slice(2) : cleanNumber;
                Linking.openURL(`tel:${formatted}`);
              }
            }}
          >
            <Text style={{ color: "#fff" }}>Call</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.saveBtn,
            changeStatus.trim() === "" && styles.disabledSaveBtn,
          ]}
          onPress={handleSave}
          disabled={changeStatus.trim() === ""}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Remark Modal */}
      <Modal
        visible={addRemarkVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAddRemarkVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              darkMode && { backgroundColor: "#23262F" },
            ]}
          >
            <Text style={[styles.modalTitle, darkMode && { color: "#fff" }]}>
              Add Remark
            </Text>
            <TextInput
              maxLength={200}
              style={[
                styles.input,
                darkMode && {
                  backgroundColor: "#181A20",
                  color: "#fff",
                  borderColor: "#444",
                },
              ]}
              placeholder="Enter remark"
              placeholderTextColor={darkMode ? "#aaa" : "#888"}
              value={remarkInput}
              onChangeText={setRemarkInput}
              multiline
              autoFocus
            />
            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <TouchableOpacity
                style={[styles.saveBtn, { flex: 1, marginRight: 8 }]}
                onPress={handleAddRemark}
              >
                <Text style={styles.saveBtnText}>ADD</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  { flex: 1, marginLeft: 8, backgroundColor: "red" },
                ]}
                onPress={() => setAddRemarkVisible(false)}
              >
                <Text style={[styles.callBtnText]}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 8,
  },
  disabledSaveBtn: {
    opacity: 0.4, // visually indicate disabled
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 8,
    color: "#222",
  },
  company: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#f82929ff",
  },
  backBtn: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 10,
    backgroundColor: "transparent",
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 24,
    letterSpacing: 2,
  },
  inputBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  remarksBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  remarksLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  addBtn: {
    backgroundColor: "#22C55E",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  remarkInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 6,
    padding: 8,
    marginVertical: 8,
  },
  remarkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  remarkDate: {
    backgroundColor: "#A7F3D0",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
    fontSize: 12,
  },
  remarkText: {
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    width: "100%",
    justifyContent: "space-between",
  },
  emailText: {
    fontSize: 14,
    color: "#222",
    flex: 1,
  },
  phoneText: {
    fontSize: 14,
    color: "#222",
    flex: 1,
  },
  emailBtn: {
    backgroundColor: "#38BDF8",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 8,
  },
  callBtn: {
    backgroundColor: "#38BDF8",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 8,
  },
  saveBtn: {
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "85%",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 60,
    fontSize: 16,
    backgroundColor: "#f7f7f7",
    color: "#222",
  },
  callBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
});
