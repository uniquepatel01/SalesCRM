import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function SplashScreen() {
  const navigation: any = useNavigation();

  useEffect(() => {
    // Simulate a loading process like fetching resources
    const timeout = setTimeout(() => {
      // Replace 'Home' with your main screen route name
      navigation.navigate('auth/login');
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* Replace with your own image or remove if not needed */}
      <Image 
        source={require('../assets/images/crm-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  }
});