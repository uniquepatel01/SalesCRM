<<<<<<< HEAD
// components/ActionSelector.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  selectedAction: string;
  actions: string[];
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  setSelectedAction: (action: string) => void;
  darkMode: boolean;
};

export default function ActionSelector({
  selectedAction,
  actions,
  dropdownOpen,
  setDropdownOpen,
  setSelectedAction,
  darkMode,
}: Props) {
  
 
  return (
    <>
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => setDropdownOpen(!dropdownOpen)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.actionLabel,
              darkMode && { color: "#fff" },
            ]}
          >
            {selectedAction || "ACTION"}
          </Text>
          <Text
            style={[
              styles.actionArrow,
              darkMode && { color: "#fff" },
            ]}
          >
            {dropdownOpen ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
      </View>
      {dropdownOpen && (
        <View
          style={[
            styles.dropdown,
            darkMode && {
              backgroundColor: "#23262F",
              borderColor: "#444",
            },
          ]}
        >
          {actions.map((action) => (
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
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
});
=======
// components/ActionSelector.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  selectedAction: string;
  actions: string[];
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  setSelectedAction: (action: string) => void;
  darkMode: boolean;
};

export default function ActionSelector({
  selectedAction,
  actions,
  dropdownOpen,
  setDropdownOpen,
  setSelectedAction,
  darkMode,
}: Props) {
  
 
  return (
    <>
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => setDropdownOpen(!dropdownOpen)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.actionLabel,
              darkMode && { color: "#f00" },
            ]}
          >
            {selectedAction || "ACTION"}
          </Text>
          <Text
            style={[
              styles.actionArrow,
              darkMode && { color: "#fff" },
            ]}
          >
            {dropdownOpen ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
      </View>
      {dropdownOpen && (
        <View
          style={[
            styles.dropdown,
            darkMode && {
              backgroundColor: "#23262F",
              borderColor: "#444",
            },
          ]}
        >
          {actions.map((action) => (
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
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
    color: "#f82929ff",
    marginRight: 8,
  },
  actionArrow: {
    fontSize: 18,
    color: "#222",
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
});
>>>>>>> 80530c0e1ce2f0de6e9f15ab7869442ae1267f66
