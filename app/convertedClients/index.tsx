import { router } from "expo-router";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../ThemeContext";
import { ConvertedClient, convertedClients } from "../../data/convertedClientsData";
import { Ionicons } from "@expo/vector-icons";

export default function ConvertedClientsScreen() {
  const { darkMode } = useTheme();

  const handlePress = (client: ConvertedClient, idx: number) => {
    router.push(`/convertedClients/${idx}`);
  };

  return (
    <SafeAreaView style={[
      styles.container,
      darkMode && { backgroundColor: "#181A20" }
    ]}>

      {/* Back Arrow Icon */}
      <Pressable
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 100,
          backgroundColor: "transparent",
          padding: 4,
        }}
      >
        <Ionicons name="arrow-back" size={28} color={darkMode ? "#fff" : "#000"} />
      </Pressable>

      <Text style={[
        styles.sectionTitle,
        darkMode && { color: "#fff", backgroundColor: "#181A20" }
      ]}>
        Converted Clients
      </Text>
      <ScrollView contentContainerStyle={styles.content}>
        {convertedClients.map((client, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handlePress(client, idx)}
            activeOpacity={0.85}
          >
            <View style={[
              styles.box,
              darkMode && { backgroundColor: "#23262F" }
            ]}>
              <Text style={[
                styles.company,
                darkMode && { color: "#7BB1FF" }
              ]}>
                {client.company}
              </Text>
              <View style={styles.row}>
                <Text style={[
                  styles.label,
                  darkMode && { color: "#fff" }
                ]}>
                  <Text style={[
                    styles.value,
                    darkMode && { color: "#fff" }
                  ]}>{client.name}</Text>
                </Text>
                <Text style={[
                  styles.label,
                  { marginLeft: 16 },
                  darkMode && { color: "#fff" }
                ]}>
                  <Text style={[
                    styles.value,
                    darkMode && { color: "#fff" }
                  ]}>{client.mobile}</Text>
                </Text>
              </View>
              <View style={styles.dateRow}>
                <View style={[
                  styles.dateBadge,
                  darkMode && { backgroundColor: "#1ED760" }
                ]}>
                  <Text style={[
                    styles.value,
                    { color: "white" }
                  ]}>{client.convertedDate || "-"}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    marginTop: 40
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    margin: 5,
    textAlign: 'center',
    backgroundColor: '#F7F9FC',
    paddingVertical: 12,
    zIndex: 1,
  },
  box: {
    backgroundColor: '#E6F0FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  company: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#0062FF',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 2,
    textAlign: 'center',
  },
  value: {
    fontFamily: 'Inter-Regular',
    color: '#222',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    gap: 16,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  dateBadge: {
    backgroundColor: "#1ED760",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});