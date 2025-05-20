// app/login.tsx
import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Login() {
  const handleLogin = () => {
    // Navigate to dashboard after "login"
    router.push('/dashboard');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text className="text-2xl" style={{ fontSize: 24, marginBottom: 20 }}>Login Page</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
