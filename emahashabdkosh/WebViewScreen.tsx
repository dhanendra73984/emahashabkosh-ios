import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebViewScreen() {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://lilaonmobile.rb-aai.in/LILAMobileData/Prabodh/Alphabet/English/Objective.html' }} 
        style={styles.webview}
        javaScriptEnabled={true} 
        domStorageEnabled={true}
        onLoad={() => console.log("WebView loaded successfully!")}
        onError={(syntheticEvent) => {
          console.error("WebView error:", syntheticEvent.nativeEvent.description);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red', // 🔴 To check if the screen is rendering
  },
  webview: {
    flex: 1,
    backgroundColor: 'yellow', // 🟡 To check WebView visibility
  },
});
