import ActionSelector from "@/components/ui/ActionSelector";
import RemarksSection from "@/components/ui/RemarkSelector";

import { setChangedStatus, setCurrentFetchedLead, unsetCurrentLead } from "@/store/assignedLeadSlice";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
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
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../ThemeContext";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;



const actions = [

    "converted",
      "demo",
      "dnp",
      "wrong number",
      "call me later",
      "busy",
      "out of station",
      "not interested",
      "dormants",
      "emails"
  

];

// Default lead for testing


export default function FetchLead() {
  const { darkMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addRemarkVisible, setAddRemarkVisible] = useState(false);
  const [remarkInput, setRemarkInput] = useState("");
  const [, forceUpdate] = useState({});
const [changeStatus,setStatus]=useState("")
 const agentId=useSelector((state: any) => state.agent.assignedTo);
  const { _id: leadId } = useSelector((state:any)=>state.leads.currentFetchedLead)

const dispatch=useDispatch()
useEffect(()=>{
dispatch(setChangedStatus(changeStatus))
},[changeStatus])
const handleSave= async()=>{
  await fetch(`${apiUrl}/lead/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: agentId,leadId:leadId,status:changeStatus.toLowerCase()}) 
    });

  dispatch(unsetCurrentLead()) //set the current assigned lead to empty {}
router.push("/dashboard")
}
const handleEmail = (recipientEmail: string) => {
if(!recipientEmail || recipientEmail.trim() === ""|| recipientEmail === "N/A") {
    Alert.alert("No email provided", "This lead does not have an email address.");
    return;
  }
  const emailUrl = `mailto:${recipientEmail}`;
  Linking.openURL(emailUrl).catch((err) =>
    console.error("Failed to open email client:", err)
  );
};


const handleAddRemark = async() => {
  if(!remarkInput.trim()) return;
     const res=await fetch(`${apiUrl}/lead/add-remark`,{

      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: agentId,leadId:leadId,commentText:remarkInput}) 
     })
     const data=await res.json()
     dispatch(setCurrentFetchedLead(data));
     setRemarkInput("")
     setAddRemarkVisible(false)
  };

  const {
  Company_name,
      Business_vol_Lakh_Per_Year,
      Address,
      City,
      Mobile_no,
      Landline_no,
      E_mail_id,
      Remarks,
      status,
      assignedTo,
      business_type,
      city,
      contact_person,
      source,
      State
  
} = useSelector((state:any)=>state.leads.currentFetchedLead)

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
          {Company_name || ""}
        </Text>

        
        <View style={styles.inputBox}>
          <Text>{contact_person || "contact person not found"}</Text>
        </View>
        <View style={styles.inputBox}>
          <Text>{Business_vol_Lakh_Per_Year+ " lakhs per year"}</Text>
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

        {/* Action Dropdown */}
        <ActionSelector
          selectedAction={changeStatus}
          actions={actions}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          setSelectedAction={setStatus}
          darkMode={darkMode}
        />

        {/* Email and Call Buttons */}
        <View style={styles.row}>
          <Text style={styles.emailText}>{E_mail_id || "N/A"}</Text>
         <TouchableOpacity
  style={styles.emailBtn}
  onPress={() => handleEmail(E_mail_id)} // assuming `email` is your variable
>
  <Text style={{ color: "#fff" }}>E-mail</Text>
</TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.phoneText}>{ Mobile_no?.length>10?Mobile_no.slice(2):Mobile_no || "N/A"}</Text>
          <TouchableOpacity style={styles.callBtn}
         onPress={()=>{
                               if(Mobile_no)
                               {
                                 Linking.openURL(`tel:${Mobile_no?.length>10?Mobile_no.slice(2):Mobile_no}`)
                               }
                             }}
          >
            <Text style={{ color: "#fff" }}>Call</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={styles.phoneText}>{Landline_no || "N/A"}</Text>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={{ color: "#fff" }}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={[styles.saveBtn,changeStatus.trim()===""&& styles.disabledSaveBtn]} onPress={handleSave} disabled={changeStatus.trim()===""}>
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
    paddingTop: 50,
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
