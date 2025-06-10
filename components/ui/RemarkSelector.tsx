// components/RemarksSection.tsx
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

type Remark = {
  date: string;
  text: string;
};

type Props = {
  remarks: Remark[];
  onAddPress: () => void;
  darkMode: boolean;
};

export default function RemarksSection({
  remarks,
  onAddPress,
  darkMode,
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
      <View
        style={[
          styles.remarksTable,
          darkMode && { backgroundColor: "#23262F" },
        ]}
      >
        {remarks.map((remark, idx) => (
          <View key={idx} style={styles.remarksRow}>
            <Text
              style={[
                styles.remarksDate,
                darkMode && { backgroundColor: "#444", color: "#fff" },
              ]}
            >
              {remark.date}
            </Text>
            <Text
              style={[
                styles.remarksText,
                darkMode && { color: "#fff" },
              ]}
            >
              {remark.text}
            </Text>
          </View>
        ))}
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
});
