import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const STORAGE_KEY = "profile_fields";

export default function Profile() {
    const [fields, setFields] = useState({
        Name: "MANISH GUPTA",
        Designation: "MANISH GUPTA",
        Email: "MANISHGUPTA123@gmail.com",
        Phone_No: "91 8270838783",
        City: "Hazaribag",
        State: "JHARKHAND",
        Country: "INDIA",
    });

    // Load saved fields on mount
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
        // router.push('/dashboard'); // Uncomment if you want to navigate after save
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
            <View style={styles.profileContainer}>
                {/* Header */}
                <View style={styles.profileHeader}>
                    <Text style={styles.profileTitle}>Profile</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Avatar */}
                <View style={styles.profileAvatarSection}>
                    <View style={styles.profileAvatar}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <View style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                backgroundColor: "#bbb",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{ color: "#fff", fontSize: 32 }}>👤</Text>
                            </View>
                        </View>
                        <View style={styles.profileAvatarCamera}>
                            <Text style={{ color: "#fff", fontSize: 16 }}>+</Text>
                        </View>
                    </View>
                </View>

                {/* Profile Info */}
                <ScrollView
                    contentContainerStyle={[styles.profileInfoList, { paddingBottom: 120 }]}
                    keyboardShouldPersistTaps="handled"
                >
                    {Object.entries(fields).map(([label, value]) => (
                        <View style={styles.profileInfoRow} key={label}>
                            <Text style={styles.profileInfoLabel}>{label}</Text>
                            <TextInput
                                style={styles.profileInfoValue}
                                value={value}
                                onChangeText={text => handleChange(label, text)}
                                placeholder={label}
                                placeholderTextColor="#aaa"
                                autoCapitalize="none"
                            />
                        </View>
                    ))}

                    {/* Save Button INSIDE ScrollView */}
                    <View style={styles.profileSaveBtnSection}>
                        <TouchableOpacity style={styles.profileSaveBtn} onPress={handleSave}>
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18, letterSpacing: 2 }}>SAVE</Text>
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
        backgroundColor: "#fff",
    },
    profileTitle: {
        flex: 1,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 22,
        letterSpacing: 1,
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,        shadowRadius: 8,        elevation: 2,    },});