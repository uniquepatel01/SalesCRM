import { View, Text } from 'react-native'
import React from 'react'

const RemarksError = ({remarkError}) => {
  if(remarkError)
    return <Text style={{ color: "red", marginTop: 4, marginBottom: -10 }}>
    Please enter a remark before submitting.
  </Text>
  else return null;
}

export default RemarksError