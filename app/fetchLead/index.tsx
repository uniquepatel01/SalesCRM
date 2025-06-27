import ActionSelector from "@/components/ui/ActionSelector";
import RemarksSection from "@/components/ui/RemarkSelector";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../ThemeContext";

type Remark = { date: string; text: string };
type Lead = {
  businessType: string;
  company: string;
  businessVolume: string;
  address: string;
  state: string;
  action: string;
  remarks: Remark[];
  email: string;
  mobile: string;
  altMobile: string;
};

type Props = {
  lead?: Lead; // Make prop optional
  onBack?: () => void;
};

const actions = [
  "DNP",
  "Demo", 
  "Busy",
  "Future Client",
  "Call Me Later",
  "Not interested",
  "Out Of Station",
];

// Default lead for testing
const defaultLead: Lead = {
  businessType: "Forex",
  company: "ANUPAM CERAMICS",
  businessVolume: "49.99967 lakh/year",
  address: "Sindoor Hazaribagh Jharkhand India 825301",
  state: "Jharkhand",
  action: "ACTION",
  remarks: [{ date: "22/04/25", text: "Call me later" }],
  email: "manishgupta@gmail.com",
  mobile: "+91 7820500213",
  altMobile: "+91 8270187976",
};

export default function FetchLead({ lead = defaultLead, onBack }: Props) {
  const { darkMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addRemarkVisible, setAddRemarkVisible] = useState(false);
  const [remarkInput, setRemarkInput] = useState("");
  const [, forceUpdate] = useState({});
  const [selectedAction, setSelectedAction] = useState(
    lead.action || actions[0]
  );

  const handleAddRemark = () => {
    if (remarkInput.trim()) {
      const today = new Date();
      const dateStr = today.toLocaleDateString("en-GB").replace(/\//g, "/");
      lead.remarks.push({ date: dateStr, text: remarkInput });
      setRemarkInput("");
      setAddRemarkVisible(false);
      forceUpdate({});
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, darkMode && { backgroundColor: "#181A20" }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Arrow Icon */}
        <Pressable
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 0,
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
          Details
        </Text>

        <Text style={[styles.company, darkMode && { color: "#7BB1FF" }]}>
          {lead.company}
        </Text>

        <View style={styles.inputBox}>
          <Text>{lead.businessType}</Text>
        </View>
        <View style={styles.inputBox}>
          <Text>{lead.company}</Text>
        </View>
        <View style={styles.inputBox}>
          <Text>{lead.businessVolume}</Text>
        </View>
        <View style={styles.inputBox}>
          <Text>{lead.address}</Text>
        </View>
        <View style={styles.inputBox}>
          <Text>{lead.state}</Text>
        </View>

        {/* Remarks Section */}

        <RemarksSection
          remarks={lead.remarks}
          onAddPress={() => setAddRemarkVisible(true)}
          darkMode={darkMode}
        />

        {/* Action Dropdown */}
        <ActionSelector
          selectedAction={selectedAction}
          actions={actions}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          setSelectedAction={setSelectedAction}
          darkMode={darkMode}
        />

        {/* Email and Call Buttons */}
        <View style={styles.row}>
          <Text style={styles.emailText}>{lead.email}</Text>
          <TouchableOpacity style={styles.emailBtn}>
            <Text style={{ color: "#fff" }}>E-mail</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.phoneText}>{lead.mobile}</Text>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={{ color: "#fff" }}>Call</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.phoneText}>{lead.altMobile}</Text>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={{ color: "#fff" }}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Remark Popup */}
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
    paddingTop: 50,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 8,
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
    color: "#222",
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
