import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WebView from 'react-native-webview';

const Foreword = (props: any) => {


  
  const { selectedLanguage } = props.route.params;

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          selectedLanguage === 'English'
            ? 'https://lilaonmobile.rb-aai.in/emaha/Foreword.html'
            : 'https://lilaonmobile.rb-aai.in/emaha/HForeword.html';
        const response = await axios.get(apiUrl);
        setHtmlContent(response.data);
        setError(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedLanguage]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <Text style={styles.loaderText}>Please wait while loading the page...</Text>
          </View>
        ) : error ? (
          <View style={styles.loaderContainer}>
            <Text style={styles.errorText}>
              Content is not available in your region.
            </Text>
            <Text style={styles.noteText}>
              If content doesn’t load, it may be restricted outside India.
            </Text>
          </View>
        ) : (
          htmlContent && (
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              javaScriptEnabled={true}
              bouncesZoom={true}
              scalesPageToFit={false}
              style={{ backgroundColor: 'transparent' }}
              containerStyle={{ flex: 1, padding: 4 }}
            />
          )
        )}
      </View>
    </View>
  );
};

export default Foreword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000080',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  noteText: {
    marginTop: 6,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});
