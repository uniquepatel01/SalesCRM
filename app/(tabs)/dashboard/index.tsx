import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useLeads } from '@/hooks/useLeads';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import FetchLead from '@/components/dashboard/FetchLead';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const { leads } = useLeads();

  const statusBoxes = [
    {
      title: 'DNP',
      count: leads.filter(lead => lead.status === 'dnp').length,
      color: '#0062FF',
      bgColor: '#E6F0FF',
      status: 'dnp'
    },
    {
      title: 'Demo',
      count: leads.filter(lead => lead.status === 'demo').length,
      color: '#FF9500',
      bgColor: '#FFF5E6',
      status: 'demo'
    },
    {
      title: 'Dormats',
      count: leads.filter(lead => lead.status === 'dormats').length,
      color: '#34C759',
      bgColor: '#E6FFF0',
      status: 'dormats'
    },
    {
      title: 'Converted',
      count: leads.filter(lead => lead.status === 'converted').length,
      color: '#D32F2F',
      bgColor: '#FFEBEE',
      status: 'converted'
    },
    {
      title: 'Busy',
      count: leads.filter(lead => lead.status === 'busy').length,
      color: '#9C27B0',
      bgColor: '#F3E5F5',
      status: 'busy'
    },
    {
      title: 'Emails',
      count: leads.filter(lead => lead.status === 'emails').length,
      color: '#9C27B0',
      bgColor: '#F3E5F5',
      status: 'emails'
    },
    {
      title: 'later',
      count: leads.filter(lead => lead.status === 'later').length,
      color: '#9C27B0',
      bgColor: '#F3E5F5',
      status: 'later'
    }
  ];

  const handleStatusPress = (status: string) => {
    router.push({
      pathname: '../leads',
      params: { filter: status }
    });
  };

  // TODO: Replace this mock user with actual user fetching logic
  const user = { name: 'Guest' };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DashboardHeader user={user} />
      {/* <FetchLead/> */}
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Lead Status Overview</Text>
        
        <View style={styles.statusGrid}>
          {statusBoxes.map((box, index) => (
            <TouchableOpacity
              key={box.status}
              style={[styles.statusBox, { backgroundColor: box.bgColor }]}
              onPress={() => handleStatusPress(box.status)}
            >
              <Text style={[styles.statusNumber, { color: box.color }]}>
                {box.count}
              </Text>
              <Text style={styles.statusTitle}>{box.title}</Text>
              <View style={[styles.indexBadge, { backgroundColor: box.color }]}>
                <Text style={styles.indexNumber}>{index + 1}</Text>
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
    fontFamily: 'Inter-Medium',
    color: '#333',
    textAlign: 'center',
  },
  indexBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexNumber: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
});