// components/RemarksSection.tsx
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSelector } from "react-redux";

type Remark = {
  comment: string;
  date: string;
  _id: string;
};

type Props = {
  remarks: any[];
  onAddPress: () => void;
  darkMode: boolean;
  showError?: boolean; // optional boolean to control error
};
export default function RemarksSection({
  remarks,
  onAddPress,
  darkMode,showError
}: Props) {
  
  return (
   <>
      <View style={styles.remarksHeaderRow}>
        <Text style={[styles.remarksHeader, darkMode && { color: "#fff" }]}>
          Remarks
        </Text>
        <TouchableOpacity style={styles.addBtn} onPress={onAddPress}>
          <Text style={styles.addBtnText}>ADD</Text>
        </TouchableOpacity>
      </View>
    <View style={{ maxHeight: 150 }}>
      <ScrollView
        style={[
          styles.remarksTable,
          darkMode && { backgroundColor: "#23262F" },
       
        ]}
    
  showsVerticalScrollIndicator={true}
      >
        {remarks?.map((remark:Remark) => (
          <View key={remark._id} style={styles.remarksRow}>
         <View style={[{flexDirection:"column",gap:3, alignItems:"center"}]}>
            <Text
  style={[
    styles.remarksDate,
    darkMode && { backgroundColor: "#444", color: "#fff" },
  ]}
>
  {new Date(remark.date)
  .toLocaleDateString("en-GB")
  .split("/")
  .map((part, index) => index === 2 ? part.slice(-2) : part)
  .join("/")}
 
</Text>
<Text  style={[
    styles.remarksDate,
    darkMode && { backgroundColor: "#444", color: "#fff" },
  ]}> {new Date(remark.date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12:true, // change to true for AM/PM
  })}</Text>
         </View>
          
             <Text
              style={[
                styles.remarksText,
                darkMode && { color: "#fff" },
              ]}
            >
              {remark.comment}
            </Text>
           
          </View>
        ))}
      </ScrollView>
      </View>
      </>
    
  );
}

const styles = StyleSheet.create({
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
    maxHeight: 200,
  },
  remarksRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 2,
    paddingHorizontal: 4,
    minHeight: 40,
  },
  remarksDate: {
    backgroundColor: "#3ac11cff",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical:1,
    marginRight: 8,
    fontSize: 13,
    fontWeight:600,
    color: "#fff",
    minWidth: 60,
    textAlign: "center",
  },
  remarksText: {
    flex: 1,
    fontSize: 14,
    color: "#222",
  },
});
