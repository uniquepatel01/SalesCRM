import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../ThemeContext'; // adjust path if needed

export default function DashboardScreen() {
  const { darkMode, toggleTheme } = useTheme();

  const statusBoxes = [
    {
      title: 'DNP',
      count: "50",
      color: '#0062FF',
      bgColor: '#E6F0FF',
      status: 'dnp'
    },
    {
      title: 'Demo',
      count: "45",
      color: '#FF9500',
      bgColor: '#FFF5E6',
      status: 'demo'
    },
    {
      title: 'Dormats',
      count: "23",
      color: '#34C759',
      bgColor: '#E6FFF0',
      status: 'dormats'
    },
    {
      title: 'Converted',
      count: "98",
      color: '#D32F2F',
      bgColor: '#FFEBEE',
      status: 'converted'
    },
    {
      title: 'Busy',
      count: "56",
      color: '#9C27B0',
      bgColor: '#d5bdaf',
      status: 'busy'
    },
    {
      title: 'Emails',
      count: "34",
      color: '#9C27B0',
      bgColor: '#ffc6ff',
      status: 'emails'
    },
    {
      title: 'Out of station',
      count: "72",
      color: '#9C27B0',
      bgColor: '#d8e2dc',
      status: 'Out of station'
    },
    {
      title: 'Intrested',
      count: "56",
      color: '#9C27B0',
      bgColor: '#ccd5ae',
      status: 'Intrested'
    },
    {
      title: 'later',
      count: "40",
      color: '#9C27B0',
      bgColor: '#F3E5F2',
      status: 'later'
    }
  ];

  const handleStatusPress = (status: string) => {
    router.push({
      pathname: '../leads',
      params: { filter: status }
    });
  };

  const user = { name: 'Guest' };

  return (
    <SafeAreaView style={[styles.container, darkMode && { backgroundColor: "#222" }]} edges={['top']}>
      <DashboardHeader user={user} />
      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, darkMode && { color: "#fff" }]}>Lead Status Overview</Text>
        <View style={styles.statusGrid}>
          {statusBoxes.map((box, index) => (
            <TouchableOpacity
              key={box.status}
              style={[
                styles.statusBox,
                { backgroundColor: box.bgColor }
              ]}
              onPress={() => handleStatusPress(box.status)}
            >
              <View style={styles.box1}>
                <Text style={[
                  styles.statusNumber,
                  darkMode && { color: "#000" }
                ]}>
                  {box.count}
                </Text>
                <Text style={[
                  styles.statusTitle,
                  darkMode && { color: "#000" }
                ]}>
                  {box.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statusBox: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusNumber: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    textAlign: 'center',
  },

  box1: {
    flex: 1,
    alignItems: "center", 
    justifyContent: "center"
  }
});