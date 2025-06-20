import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../ThemeContext"; // Adjust path if needed
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function WrongNumber() {
    const { darkMode } = useTheme();

    const dnpBoxes = [
        { companyName : "Start Exporter", Name: "Manish Gupta", MobileNo: "+91 9876543210", Date: "20/05/25" },
        { companyName : "Three Marin Start Exporter", Name: "Manish Gupta", MobileNo: "+91 9876543210", Date: "20/05/25" },
        { companyName : "Adani BsL Group", Name: "Manish Gupta", MobileNo: "+91 9876543210", Date: "20/05/25" },
        { companyName : "Ztibra Foundation", Name: "Manish Gupta", MobileNo: "+91 9876543210", Date: "20/05/25" },
        { companyName : "Ztibra Foundation", Name: "Manish Gupta", MobileNo: "+91 9876543210", Date: "20/05/25" },
        { companyName : "Ztibra Foundation", Name: "Manish Gupta", MobileNo: "+91 9876543210", Date: "20/05/25" },
        { companyName : "Ztibra Foundation", Name: "Manish Gupta", MobileNo: "+91 9876543210", Date: "20/05/25" },
    ];

    return(
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
            ]}>Wrong Number</Text>
            <ScrollView contentContainerStyle={styles.content}>
                {dnpBoxes.map((box, idx) => (
                    <View
                        key={idx}
                        style={[
                            styles.box,
                            darkMode && { backgroundColor: "#23262F" }
                        ]}
                    >
                        <Text style={[
                            styles.company,
                            darkMode && { color: "#7BB1FF" }
                        ]}>{box.companyName}</Text>
                        <View style={styles.row}>
                            <Text style={[
                                styles.label,
                                darkMode && { color: "#fff" }
                            ]}>
                                <Text style={[
                                    styles.value,
                                    darkMode && { color: "#fff" }
                                ]}>{box.Name}</Text>
                            </Text>
                            <Text style={[
                                styles.label,
                                { marginLeft: 16 },
                                darkMode && { color: "#fff" }
                            ]}>
                                <Text style={[
                                    styles.value,
                                    darkMode && { color: "#fff" }
                                ]}>{box.MobileNo}</Text>
                            </Text>
                        </View>
                        <View style={styles.dateRow}>
                            <View style={[
                                styles.dateBadge,
                                darkMode && { backgroundColor: "#E94444" }
                            ]}>
                                <Text style={[
                                    styles.value,
                                    { color: "white" }
                                ]}>{box.Date}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
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
        backgroundColor: "red",
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
});