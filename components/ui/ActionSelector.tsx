// components/ActionSelector.tsx
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  selectedAction: string;
  setSelectedAction: (action: string) => void;
  darkMode: boolean;
  actions: string[]; // now received from parent
};

export default function ActionSelector({
  selectedAction,
  setSelectedAction,
  darkMode,
  actions,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <View style={styles.actionSection}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => setDropdownOpen(!dropdownOpen)}
        activeOpacity={0.7}
      >
        <Text style={[styles.actionLabel, darkMode && { color: "#f00" }]}>
          {selectedAction || "ACTION"}
        </Text>
        <Text style={[styles.actionArrow, darkMode && { color: "#fff" }]}>
          {dropdownOpen ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {dropdownOpen && (
        <View
          style={[
            styles.dropdown,
            darkMode && { backgroundColor: "#23262F", borderColor: "#444" },
          ]}
        >
          {actions.length > 0 ? (
            actions.map((action) => (
              <TouchableOpacity
                key={action}
                style={[
                  styles.dropdownItem,
                  selectedAction === action && styles.dropdownItemSelected,
                ]}
                onPress={() => {
                  setSelectedAction(action);
                  setDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    darkMode && { color: "#fff" },
                    selectedAction === action &&
                      (darkMode
                        ? { fontWeight: "bold", color: "#A5CCFF" }
                        : styles.dropdownItemTextSelected),
                  ]}
                >
                  {action}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={{
                textAlign: "center",
                padding: 10,
                color: darkMode ? "#bbb" : "#000",
              }}
            >
              No buckets found
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  actionSection: {
    alignItems: "center",   // center horizontally
    justifyContent: "center",
    marginBottom: 12,
    marginTop: 8,
  },
    actionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#f82929ff",
    marginRight: 8,
  },
  actionArrow: {
    fontSize: 18,
    color: "#222",
  },
  dropdown: {
    marginTop: 8,           // spacing below the button
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    zIndex: 10,
    elevation: 3,
    minWidth: 150,          // adjust width
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
});
