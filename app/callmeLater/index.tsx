import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function callmeLater(){
    const dnpBoxes = [
        {
            companyName : "Start Exporter",
            Name: "Manish Gupta", 
            MobileNo: "+91 9876543210",
            Date: "20/05/25"            
        },
        {
            companyName : "Three Marin Start Exporter",
            Name: "Manish Gupta", 
            MobileNo: "+91 9876543210",
            Date: "20/05/25"            
        },
        {
            companyName : "Adani BsL Group",
            Name: "Manish Gupta", 
            MobileNo: "+91 9876543210",
            Date: "20/05/25"            
        },
        {
            companyName : "Ztibra Foundation",
            Name: "Manish Gupta", 
            MobileNo: "+91 9876543210",
            Date: "20/05/25"            
        },
        {
            companyName : "Ztibra Foundation",
            Name: "Manish Gupta", 
            MobileNo: "+91 9876543210",
            Date: "20/05/25"            
        },
        {
            companyName : "Ztibra Foundation",
            Name: "Manish Gupta", 
            MobileNo: "+91 9876543210",
            Date: "20/05/25"            
        },
        {
            companyName : "Ztibra Foundation",
            Name: "Manish Gupta", 
            MobileNo: "+91 9876543210",
            Date: "20/05/25"            
        },
    ];

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.sectionTitle}>Did Not Pick</Text>
            <ScrollView contentContainerStyle={styles.content}>
                {dnpBoxes.map((box, idx) => (
                    <View key={idx} style={styles.box}>
                        <Text style={styles.company}>{box.companyName}</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>
                                <Text style={styles.value}>{box.Name}</Text>
                            </Text>
                            <Text style={[styles.label, { marginLeft: 16 }]}>
                                <Text style={styles.value}>{box.MobileNo}</Text>
                            </Text>
                        </View>
                        <View style={styles.dateRow}>
                            <View style={styles.dateBadge}>
                                <Text style={[styles.value, { color: "white" }]}>{box.Date}</Text>
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
        gap: 16, // Add this for spacing between Name and Mobile
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    dateBadge: {
        backgroundColor: "blue",
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
});