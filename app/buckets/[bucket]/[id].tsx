// app/buckets/[bucket]/[id].tsx
import ActionSelector from "@/components/ui/ActionSelector";
import RemarksSection from "@/components/ui/RemarkSelector";
import RemarksError from "@/components/ui/remarksError";

import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
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
import { useTheme } from "@/ThemeContext";
import { SafeAreaView } from 'react-native-safe-area-context';


const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const dummy = {
  Company_name: "Dummy Company",
  Business_vol_Lakh_Per_Year: "889.92",
  Address: "Dummy Address",
  City: "Dummy City",
  Mobile_no: "0000000000",
  Landline_no: "0000000000",
  E_mail_id: "dummy@example.com",
  Remarks: [],
  status: "demo",
  assignedTo: "agent@example.com",
  business_type: "B2B",
  city: "Dummy City",
  contact_person: "Dummy Contact",
  source: "Dummy Source",
  updatedAt: new Date().toISOString(),
};

export default function LeadDetailsPage() {
  const { id } = useLocalSearchParams() as { id: string };
  const dispatch = useDispatch();
  const { darkMode } = useTheme();
  const token = useSelector((state: any) => state.agent.token);

  const [selectedAction, setSelectedAction] = useState("");
  const [addRemarkVisible, setAddRemarkVisible] = useState(false);
  const [remarkInput, setRemarkInput] = useState("");
  const [lead, setLead] = useState<any>();
  const [remarkError, setRemarkError] = useState(true);
  const [actions, setActions] = useState<string[]>([]); // ✅ dynamic buckets here

  // ✅ Fetch lead details
  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await fetch(`${apiUrl}/apk/lead/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setLead(data);
      } catch (err) {
        console.error("Error fetching lead:", err);
      }
    };
    fetchLead();
  }, [id]);

  // ✅ Fetch dynamic buckets (actions)
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
        console.error("Error fetching buckets:", err);
        setActions([]);
      }
    };
    fetchBuckets();
  }, []);

  const {
    Company_name,
    Business_vol_Lakh_Per_Year,
    Address,
    City,
    Mobile_no,
    Landline_no,
    E_mail_id,
    Remarks,
    business_type,
    contact_person,
    source,
  } = lead || dummy;

  // ✅ Save status
  const handleSave = async () => {
    try {
      const res = await fetch(`${apiUrl}/apk/update-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leadId: id,
          bucketName: selectedAction,
        }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      const data = await res.json();
      setLead(data.lead);

      router.push("/dashboard"); // ✅ redirect after save
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add remark
  const handleAddRemark = async () => {
    if (!remarkInput.trim()) {
      setRemarkError(true);
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/apk/add-remarks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leadId: id,
          remark: remarkInput,
        }),
      });

      if (!res.ok) throw new Error("Failed to add remark");
      const data = await res.json();
      setLead(data.updateLead);
      setRemarkInput("");
      setAddRemarkVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, darkMode && { backgroundColor: "#181A20" }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back Button */}
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
          {lead?.status || "LEAD DETAILS"}
        </Text>

        <Text style={[styles.company, darkMode && { color: "#f82929ff" }]}>
          {Company_name}
        </Text>

        {/* Lead Info Table */}
        <View
          style={[styles.table, darkMode && { backgroundColor: "#23262F" }]}
        >
          <Row label="Contact person" value={contact_person || "N/A"} darkMode={darkMode} />
          <Row label="Source" value={source || "N/A"} darkMode={darkMode} />
          <Row label="Business Type" value={business_type || "N/A"} darkMode={darkMode} />
          <Row label="Business Volume" value={Business_vol_Lakh_Per_Year || "0"} darkMode={darkMode} />
          <Row label="Email" value={E_mail_id} darkMode={darkMode} />
          <Row label="Mobile" value={Mobile_no} darkMode={darkMode} />
          <Row label="Alternate Mobile" value={Landline_no} darkMode={darkMode} />
          <Row label="Address" value={Address} darkMode={darkMode} multiline />
        </View>

        {/* Remarks Section */}
        <RemarksSection
          remarks={Remarks}
          onAddPress={() => setAddRemarkVisible(true)}
          darkMode={darkMode}
        />

        {/* ✅ Dynamic Action Dropdown */}
        <ActionSelector
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          darkMode={darkMode}
          actions={actions} // ✅ pass fetched buckets
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.saveBtn,selectedAction.trim() === "" && styles.disabledSaveBtn ]} onPress={handleSave} disabled={selectedAction.trim() === ""}>
            <Text style={styles.saveBtnText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => {
  if (Mobile_no && Mobile_no !== "N/A") {
    const cleanNumber = Mobile_no.replace(/\s+/g, ""); // remove spaces
    const formatted = cleanNumber.length > 10 ? cleanNumber.slice(2) : cleanNumber;
    Linking.openURL(`tel:${formatted}`);
  }
}}

          >
            <Text style={styles.callBtnText}>CALL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Remark Popup */}
      <Modal visible={addRemarkVisible} transparent animationType="fade" onRequestClose={() => setAddRemarkVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, darkMode && { backgroundColor: "#23262F" }]}>
            <Text style={[styles.modalTitle, darkMode && { color: "#fff" }]}>Add Remark</Text>
            <TextInput
              maxLength={100}
              style={[styles.input, darkMode && { backgroundColor: "#181A20", color: "#fff", borderColor: "#444" }]}
              placeholder="Enter remark"
              placeholderTextColor={darkMode ? "#aaa" : "#888"}
              value={remarkInput}
              onChangeText={(text) => {
                setRemarkInput(text);
                if (text.trim()) setRemarkError(false);
              }}
              multiline
              autoFocus
            />
            <RemarksError remarkError={remarkError} />
            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <TouchableOpacity style={[styles.saveBtn, { flex: 1, marginRight: 8 }]} onPress={handleAddRemark}>
                <Text style={styles.saveBtnText}>ADD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.callBtn, { flex: 1, marginLeft: 8, backgroundColor: "red" }]} onPress={() => setAddRemarkVisible(false)}>
                <Text style={styles.callBtnText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Table row component
type RowProps = {
  label: string;
  value: string;
  darkMode: boolean;
  multiline?: boolean;
};

function Row({ label, value, darkMode, multiline }: RowProps) {
  return (
    <View style={styles.tableRow}>
      <View style={[styles.tableCell, styles.tableCellLabel, darkMode && { backgroundColor: "#23262F" }]}>
        <Text style={[styles.tableCellText, darkMode && { color: "#fff" }]}>{label}</Text>
      </View>
      <View style={[styles.tableCell, styles.tableCellValue, darkMode && { backgroundColor: "#23262F" }]}>
        <Text selectable style={[styles.tableCellText, darkMode && { color: "#fff" }, multiline && { fontSize: 13 }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff"},
  scrollContent: { paddingBottom: 32, paddingHorizontal: 8 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 8,
    color: "#222",
  },
    disabledSaveBtn: {
    opacity: 0.4, // visually indicate disabled
  },
  company: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#f82929ff",
  },
  table: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableCell: { flex: 1, padding: 8, justifyContent: "center" },
  tableCellLabel: { backgroundColor: "#ededed", minWidth: 110 },
  tableCellValue: { backgroundColor: "#f7f7f7", minWidth: 140 },
  tableCellText: { fontSize: 15, color: "#222" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#22A8FF",
    borderRadius: 10,
    paddingVertical: 14,
    marginRight: 8,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  callBtn: {
    flex: 1,
    backgroundColor: "#3ED778",
    borderRadius: 10,
    paddingVertical: 14,
    marginLeft: 8,
    alignItems: "center",
  },
  callBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
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
});
