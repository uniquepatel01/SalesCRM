import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from "react-native";
import { useTheme } from "../../ThemeContext"; // adjust path as needed
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const STORAGE_KEY = "profile_fields";

export default function Profile() {
    const { darkMode } = useTheme();

    const [fields, setFields] = useState({
        Name: "MANISH GUPTA",
        Designation: "MANISH GUPTA",
        Email: "MANISHGUPTA123@gmail.com",
        Phone_No: "91 8270838783",
        City: "Hazaribag",
        State: "JHARKHAND",
        Country: "INDIA",
    });

    useEffect(() => {
        (async () => {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            if (saved) setFields(JSON.parse(saved));
        })();
    }, []);

    const handleChange = (key, value) => {
        setFields({ ...fields, [key]: value });
    };

    const handleSave = async () => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
        Alert.alert("Profile Saved", "Your changes have been saved.");
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "android" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
            <View style={[
                styles.profileContainer,
                darkMode && { backgroundColor: "#181818" }
            ]}>
                {/* Header */}
                <View style={styles.profileHeader}>
                          {/* Back Arrow Icon */}
                          <Pressable
                            onPress={() => router.back()}
                            style={{
                              position: "absolute",
                              top: 35,
                              left: 10,
                              zIndex: 100,
                              backgroundColor: "transparent",
                              padding: 4,
                            }}
                          >
                            <Ionicons name="arrow-back" size={28} color={darkMode ? "#fff" : "#000"} />
                          </Pressable>
                    <Text style={[
                        styles.profileTitle,
                        darkMode && { color: "#fff" }
                    ]}>Profile</Text>
                </View>

                {/* Avatar */}
                <View style={styles.profileAvatarSection}>
                    <View style={[
                        styles.profileAvatar,
                        darkMode && { backgroundColor: "#333" }
                    ]}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <View style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: darkMode ? "#444" : "#bbb",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{ color: "#fff", fontSize: 32 }}>👤</Text>
                            </View>
                        </View>
                        <View style={[
                            styles.profileAvatarCamera,
                            darkMode && { backgroundColor: "#FFD700", borderColor: "#181818" }
                        ]}>
                            <Text style={{ color: darkMode ? "#222" : "#fff", fontSize: 16 }}>+</Text>
                        </View>
                    </View>
                </View>

                {/* Profile Info */}
                <ScrollView
                    contentContainerStyle={[
                        styles.profileInfoList,
                        { paddingBottom: 250 }
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    {Object.entries(fields).map(([label, value]) => (
                        <View
                            style={[
                                styles.profileInfoRow,
                                darkMode && { backgroundColor: "#222", borderColor: "#333" }
                            ]}
                            key={label}
                        >
                            <Text style={[
                                styles.profileInfoLabel,
                                darkMode && { color: "#bbb", backgroundColor: "#222", borderRightColor: "#333" }
                            ]}>
                                {label}
                            </Text>
                            <TextInput
                                style={[
                                    styles.profileInfoValue,
                                    darkMode && { color: "#fff", backgroundColor: "#222" }
                                ]}
                                value={value}
                                onChangeText={text => handleChange(label, text)}
                                placeholder={label}
                                placeholderTextColor={darkMode ? "#888" : "#aaa"}
                                autoCapitalize="none"
                            />
                        </View>
                    ))}

                    <View style={styles.profileSaveBtnSection}>
                        <TouchableOpacity style={[
                            styles.profileSaveBtn,
                            darkMode && { backgroundColor: "#FFD700" }
                        ]} onPress={handleSave}>
                            <Text style={{
                                color: darkMode ? "#222" : "#fff",
                                fontWeight: "700",
                                fontSize: 18,
                                letterSpacing: 2
                            }}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 0,
        margin: 0,
        position: "relative",
    },
    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 8,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "transparent",
        justifyContent: "space-between"
    },
    profileTitle: {
        flex: 1,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 22,
        letterSpacing: 1,
        color: "#222"
    },
    profileAvatarSection: {
        alignItems: "center",
        marginTop: 24,
        marginBottom: 24,
    },
    profileAvatar: {
        position: "relative",
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        justifyContent: "center",
    },
    profileAvatarCamera: {
        position: "absolute",
        right: 8,
        bottom: 8,
        backgroundColor: "#000",
        borderRadius: 14,
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    profileInfoList: {
        width: "90%",
        maxWidth: 400,
        alignSelf: "center",
        flexGrow: 1,
    },
    profileInfoRow: {
        flexDirection: "row",
        backgroundColor: "#f6f6f6",
        borderRadius: 6,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#eee",
        marginBottom: 12,
        alignItems: "center",
    },
    profileInfoLabel: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontWeight: "500",
        color: "#555",
        borderRightWidth: 1,
        borderRightColor: "#e0e0e0",
        backgroundColor: "#f6f6f6",
    },
    profileInfoValue: {
        flex: 2,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: "#222",
        backgroundColor: "#f6f6f6",
        fontSize: 16,
    },
    profileSaveBtnSection: {
        alignItems: "center",
        marginVertical: 16,
    },
    profileSaveBtn: {
        width: 320,
        maxWidth: "90%",
        paddingVertical: 14,
        backgroundColor: "#189eff",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
});