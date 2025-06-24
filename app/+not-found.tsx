import React from 'react';
import { Text, View } from 'react-native';

const NotFound = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'red' , fontSize:32}}> page not found</Text>
      <Text style={{ color: 'blue' , fontSize:32,textDecorationLine:"underline"}} onPress={() => { window.location.href = '/dashboard'; }}>
        return to home 
      </Text>
    </View>
  )
}

export default NotFound