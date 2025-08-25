import { ImageBackground, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';

const dummyHtmlData = {
  English: `    <h1 style="font-size: 30px; line-height: 1.6;">Salient Features:</h1>
    <ul style="font-size: 24px; line-height: 1.6;">
      <li>Supports Unicode Font for Devanagari script</li>
      <li>Pronunciation of searched word</li>
      <li>Clear layout/GUI, Easy navigation</li>
      <li>Words Listed at 3 character combination</li>
      <li>Direct word search</li>
      <li>Bidirectional search</li>
      <li>Domainwise word meaning.</li>
      <li>Facility to search within the searched list of words</li>
      <li>Correct (native) spoken pronunciations and relevant information</li>
      <li>Meanings and relevant information</li>
      <li>Usage of the word/phrases</li>
    </ul>`,
  Hindi: `<h1 style="font-size: 30px; line-height: 1.6;">मुख्य विशेषताएँ:</h1>
    <ul style="font-size: 24px; line-height: 1.6;">
      <li>देवनागरी लिपि के लिए यूनीकोड फॉन्ट</li>
      <li>खोजे गये शब्द का उच्चारण</li>
      <li>स्पष्ट लेआउट / जी. यू. आई. प्रयोग में आसान</li>
      <li>तीन अक्षरों पर शब्द सूची</li>
      <li>पूर्ण शब्द खोज</li>
      <li>द्विआयामी खोज</li>
      <li>डोमेनवाइज अर्थ</li>
      <li>शब्दों की सूची में से खोजने की सुविधा</li>
      <li>सही मौखिक उच्चारण और संबंधित जानकारी</li>
      <li>अर्थ एवं संबंधित जानकारी</li>
      <li>शब्द / पदबंध का प्रयोग</li>
    </ul>`
};

const SalientFeatures = (props: any) => {
  const { selectedLanguage }: { selectedLanguage: 'English' | 'Hindi' } = props.route.params;

  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    setHtmlContent(dummyHtmlData[selectedLanguage] || dummyHtmlData.English);
  }, [selectedLanguage]);

  return (
    <View style={styles.container}>
      
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent ?? '' }} // Ensure it never passes null
        javaScriptEnabled={true}
        bouncesZoom={true}
        scalesPageToFit={false}
        style={styles.webview}
      />
    </View>
  );
};

export default SalientFeatures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff',
    marginBottom: 10,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
