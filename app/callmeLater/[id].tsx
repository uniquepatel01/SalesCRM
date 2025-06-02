import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Linking, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../ThemeContext";
import { CallmeLater, callmeLaterClients } from "../../data/callmeLaterData"; // Changed import

export default function callmeLaterDetails() {
  const { id } = useLocalSearchParams();
  const client = callmeLaterClients[Number(id)] as CallmeLater; // Changed data source and added type assertion
  const { darkMode } = useTheme();

  const [selectedAction, setSelectedAction] = useState<string>(client.action || "");

  // Add Remark State
  const [addRemarkVisible, setAddRemarkVisible] = useState(false);
  const [remarkInput, setRemarkInput] = useState("");

  // For re-rendering after adding a remark
  const [, forceUpdate] = useState({});

  // Assuming CallmeLater type might not have 'statuses'. If it does, this is fine.
  const actions = client.statuses || []; // Added fallback for statuses

  const handleSave = () => {
    client.action = selectedAction;
    alert(`Saved action: ${selectedAction || "None"}`);
  };

  const handleAddRemark = () => {
    if (remarkInput.trim()) {
      const today = new Date();
      const dateStr = today.toLocaleDateString("en-GB").replace(/\//g, "/");
      client.remarks.push({ date: dateStr, text: remarkInput });
      setRemarkInput("");
      setAddRemarkVisible(false);
      forceUpdate({});
    }
  };

  return (
    <SafeAreaView style={[
      styles.container,
      darkMode && { backgroundColor: "#181A20" }
    ]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[
          styles.header,
          darkMode && { color: "#fff" }
        ]}>CALL ME LATER</Text> {/* Changed title */}

        <Text style={[
          styles.company,
          darkMode && { color: "#7BB1FF" }
        ]}>{client.company}</Text>

        {/* Details Table */}
        <View style={[
          styles.table,
          darkMode && { backgroundColor: "#23262F" }
        ]}>
          <Row label="Contact person" value={client.contactPerson} darkMode={darkMode} />
          <Row label="Source" value={client.source} darkMode={darkMode} />
          <Row label="Business Type" value={client.businessType} darkMode={darkMode} />
          <Row label="Business Volume" value={client.businessVolume} darkMode={darkMode} />
          <Row label="Email" value={client.email} darkMode={darkMode} />
          <Row label="Mobile" value={client.mobile} darkMode={darkMode} />
          <Row label="Alternate Mobile" value={client.altMobile} darkMode={darkMode} />
          <Row label="Demo Taken" value={client.demoTaken} darkMode={darkMode} />
          <Row label="Address" value={client.address} darkMode={darkMode} multiline />
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellLabel, darkMode && { backgroundColor: "#23262F" }]}>
              <Text style={[styles.tableCellText, darkMode && { color: "#fff" }]}>Converted Date</Text>
            </View>
            <View style={[styles.tableCell, styles.tableCellValue, darkMode && { backgroundColor: "#181A20" }]}>
              <View style={styles.convertedDateBadge}>
                <Text style={styles.convertedDateText}>
                  {client.convertedDate || "-"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Remarks Section */}
        <View style={styles.remarksHeaderRow}>
          <Text style={[
            styles.remarksHeader,
            darkMode && { color: "#fff" }
          ]}>Remarks</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setAddRemarkVisible(true)}>
            <Text style={styles.addBtnText}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View style={[
          styles.remarksTable,
          darkMode && { backgroundColor: "#23262F" }
        ]}>
          {client.remarks.map((remark, idx) => (
            <View key={idx} style={styles.remarksRow}>
              <Text style={styles.remarksDate}>{remark.date}</Text>
              <Text style={styles.remarksText}>{remark.text}</Text>
            </View>
          ))}
        </View>

       

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => {
              if (client.mobile) {
                Linking.openURL(`tel:${client.mobile.replace(/\s+/g, "")}`);
              }
            }}
          >
            <Text style={styles.callBtnText}>CALL</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Remark Popup */}
      <Modal
        visible={addRemarkVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAddRemarkVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
            darkMode && { backgroundColor: "#23262F" }
          ]}>
            <Text style={[
              styles.modalTitle,
              darkMode && { color: "#fff" }
            ]}>Add Remark</Text>
            <TextInput
              style={[
                styles.input,
                darkMode && { backgroundColor: "#181A20", color: "#fff", borderColor: "#444" }
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
                style={[styles.callBtn, { flex: 1, marginLeft: 8 }]}
                onPress={() => setAddRemarkVisible(false)}
              >
                <Text style={styles.callBtnText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// You can reuse the Row component and styles from demoClients/[id].tsx

type RowProps = {
  label: string;
  value: string;
  darkMode: boolean;
  multiline?: boolean;
};

const Row: React.FC<RowProps> = ({ label, value, darkMode, multiline }) => (
  <View style={styles.tableRow}>
    <View style={[styles.tableCell, styles.tableCellLabel, darkMode && { backgroundColor: "#23262F" }]}>
      <Text style={[styles.tableCellText, darkMode && { color: "#fff" }]}>{label}</Text>
    </View>
    <View style={[styles.tableCell, styles.tableCellValue, darkMode && { backgroundColor: "#181A20" }]}>
      <Text
        style={[styles.tableCellText, darkMode && { color: "#fff" }]}
        numberOfLines={multiline ? 0 : 1}
      >
        {value}
      </Text>
    </View>
  </View>
);



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
  tableCell: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  tableCellLabel: {
    backgroundColor: "#ededed",
    minWidth: 110,
  },
  tableCellValue: {
    backgroundColor: "#f7f7f7",
    minWidth: 140,
  },
  tableCellText: {
    fontSize: 15,
    color: "#222",
  },
  remarksHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 8,
  },
  remarksHeader: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    color: "#222",
  },
  addBtn: {
    backgroundColor: "#1ED760",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginLeft: 8,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 1,
  },
  remarksTable: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  remarksRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 2,
    paddingHorizontal: 4,
    minHeight: 50,
  },
  remarksDate: {
    backgroundColor: "#B6F7A7",
    borderRadius: 4,
    paddingHorizontal: 6,
    marginRight: 8,
    fontSize: 13,
    color: "#222",
    minWidth: 60,
    textAlign: "center",
  },
  remarksText: {
    flex: 1,
    fontSize: 14,
    color: "#222",
  },
  actionSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#222",
    marginRight: 8,
  },
  actionArrow: {
    fontSize: 18,
    color: "#222",
  },
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
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginHorizontal: 40,
    marginBottom: 12,
    backgroundColor: "#fff",
    zIndex: 10,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemSelected: {
    backgroundColor: "#A9D2FF",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#222",
    textAlign: "center",
  },
  dropdownItemTextSelected: {
    fontWeight: "bold",
    color: "#0062FF",
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
  convertedDateBadge: {
    backgroundColor: "#1ED760",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  convertedDateText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 1,
  },
});