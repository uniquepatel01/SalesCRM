import { View, StyleSheet } from 'react-native';
import React from 'react';
import * as Animatable from "react-native-animatable";
import AntDesign from '@expo/vector-icons/AntDesign';

const Loading = () => {
  return (
    <View style={styles.loadingOverlay} pointerEvents="auto">
      <View style={styles.loaderBox}>
        <Animatable.View
          animation="rotate"
          iterationCount="infinite"
          duration={300}
          easing="linear"
        >
          <AntDesign name="loading" size={40} color="#0f2ec6ff" />
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // dim background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    pointerEvents: "auto",
  },
  loaderBox: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Loading;
