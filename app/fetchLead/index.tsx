import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

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

const actions = ["ACTION", "Interested", "Call Back", "Not Interested"];

// Default lead for testing
const defaultLead: Lead = {
  businessType: "Forex",
  company: "ANUPAM CERAMICS",
  businessVolume: "49.99967 lakh/year",
  address: "Sindoor Hazaribagh Jharkhand India 825301",
  state: "Jharkhand",
  action: "ACTION",
  remarks: [
    { date: "22/04/25", text: "Call me later" },
    { date: "22/04/25", text: "Call me later" },
  ],
  email: "manishgupta@gmail.com",
  mobile: "+91 7820500213",
  altMobile: "+91 8270187976",
};

export default function FetchLead({ lead = defaultLead, onBack }: Props) {
  const [selectedAction, setSelectedAction] = useState(
    lead.action || actions[0]
  );
  const [remarkInput, setRemarkInput] = useState("");
  const [remarks, setRemarks] = useState<Remark[]>(lead.remarks || []);

  const handleAddRemark = () => {
    if (remarkInput.trim()) {
      const today = new Date();
      const dateStr = today.toISOString().slice(2, 10).replace(/-/g, "/");
      setRemarks([{ date: dateStr, text: remarkInput }, ...remarks]);
      setRemarkInput("");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Arrow */}
      <Pressable onPress={onBack} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </Pressable>
      <Text style={styles.title}>Details</Text>

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

      {/* Action Dropdown */}
      <View style={styles.inputBox}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>{selectedAction}</Text>
          <Ionicons name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>
        {/* Implement dropdown logic as needed */}
      </View>

      {/* Remarks Section */}
      <View style={styles.remarksBox}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.remarksLabel}>Remarks</Text>
          <TouchableOpacity style={styles.addBtn} onPress={handleAddRemark}>
            <Text style={{ color: "#fff" }}>ADD</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.remarkInput}
          value={remarkInput}
          onChangeText={setRemarkInput}
          placeholder="Add a remark"
        />
        {remarks.map((remark, idx) => (
          <View key={idx} style={styles.remarkRow}>
            <Text style={styles.remarkDate}>{remark.date}</Text>
            <Text style={styles.remarkText}>{remark.text}</Text>
          </View>
        ))}
      </View>

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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
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
});
