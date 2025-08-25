import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import WebView from 'react-native-webview';
//welcome to the objective page 
const About = (props:any) => {
  const {selectedLanguage} = props.route.params;

  
  
  const [htmlContent, setHtmlContent] = useState<string | null>(null);//for rendering html page 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = selectedLanguage === 'English' ? 'https://lilaonmobile.rb-aai.in/emaha/Aboutus.html' : 'https://lilaonmobile.rb-aai.in/emaha/HAboutus.html';
        const response = await axios.get(apiUrl);
        setHtmlContent(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedLanguage]);


  return (
      <View style={{flex:1}}>


      {/* <Text>{selectedLanguage}</Text> */}

        <View style={styles.container}>
          
                  {htmlContent && (
            <WebView
              originWhitelist={['*']}
              source={{ html: htmlContent }}
              javaScriptEnabled={true} // Enable JavaScript for the WebView
              bouncesZoom={true}      // Allow the WebView content to be zoomed
              scalesPageToFit={false}  // Disable automatic scaling
              style={{ backgroundColor: 'transparent' }}  // Set background color to transparent
              containerStyle={{ flex: 1, padding: 4 }}  // Adjust container style as needed
            />
          )}
        </View>    


    
    </View>
  )
}

export default About

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
 
})