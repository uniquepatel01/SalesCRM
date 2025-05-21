import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { User, Moon, ArrowRight, AlignLeftIcon } from 'lucide-react-native';

type DashboardHeaderProps = {
  user: any;
};

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const greeting = () => {
    return 'Welcome Uniquepatel'
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{'Gold CRM'}</Text>
            <Text style={styles.greeting}>{greeting()}</Text>
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <View>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
              <User size={36} />
            </TouchableOpacity>
            {dropdownVisible && (
              <View style={styles.dropdown}>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>Analytics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity>
            <Moon size={36}/>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.customButton, { backgroundColor: '#A6B7DC', width: 221 }]}>
          <Text style={styles.buttonText}>Fetch Lead</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.customButton, { backgroundColor: '#3790A1', width: 340, height:50, }]}>
          <Text style={styles.buttonText}>Manish Gupta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    gap: 18
  },

  buttonContainer:{
    margin: 20,
    gap:10,
    justifyContent:'center',
    alignItems:'center'
  },

  customButton: {
    borderRadius: 100,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    alignItems:'center',
    justifyContent:'center',

  },

  titleContainer: {
    marginLeft: 12,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#333',
  },
  // Add dropdown styles
  dropdown: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    minWidth: 120,
    paddingVertical: 8,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
});