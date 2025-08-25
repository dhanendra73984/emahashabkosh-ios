import { StyleSheet, View } from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const Contactus = (props: any) => {
  const { selectedLanguage } = props.route.params;

  const englishContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial;
            padding: 16px;
            color: #333;
            text-align: left;
            font-size: 14px;
            line-height: 1.4;
          }
          h2 {
            color: #1a5276;
            font-size: 16px;
            margin-bottom: 12px;
            font-weight: bold;
          }
          p {
            margin-bottom: 16px;
          }
          hr {
            margin: 16px 0;
            border: 0;
            border-top: 1px solid #eee;
          }
          a {
            color: #2980b9;
            text-decoration: none;
            font-size: 14px;
          }
          strong {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h2>Department Of Official Language (DOL)</h2>
        <p>
          Technical Cell,<br>
          Department of Official Language<br>
          Ministry of Home Affairs,<br>
          NDCC-II Bhawan, 'B' Wing 4th Floor,<br>
          Jai Singh Road<br>
          New Delhi - 110 001<br><br>
          
          <strong>Email ID:</strong> techcell-ol[at]gov[dot]in<br>
         
        </p>
        
        <hr>
        
        <h2>Centre for Development of Advanced Computing (C-DAC)</h2>
        <p>
          Applied AI Group,<br>
          C-DAC, Innovation Park<br>
          Panchavati, Pashan,<br>
          Pune – 411 008,<br>
          Maharashtra (India)<br><br>
          
          <strong>Phone:</strong> +91-20-25503314/15<br>
          <strong>Fax:</strong> +91-20-25503334<br>
          <strong>Email ID:</strong> info.aai[at]cdac[dot]in<br>
          
        </p>
      </body>
    </html>
  `;

  const hindiContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial;
            padding: 16px;
            color: #333;
            text-align: left;
            direction: rtl;
            unicode-bidi: bidi-override;
            font-size: 14px;
            line-height: 1.4;
          }
          h2 {
            color: #1a5276;
            font-size: 16px;
            margin-bottom: 12px;
            font-weight: bold;
          }
          p {
            margin-bottom: 16px;
          }
          hr {
            margin: 16px 0;
            border: 0;
            border-top: 1px solid #eee;
          }
          a {
            color: #2980b9;
            text-decoration: none;
            font-size: 14px;
          }
          strong {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h2>राजभाषा विभाग (डी.ओ.एल)</h2>
        <p>
          तकनीकी कक्ष,<br>
          राजभाषा विभाग (डी.ओ.एल)<br>
          गृह मंत्रालय,<br>
          एनडीसीसी-II भवन, 'बी' विंग चौथा तल,<br>
          जय सिंह रोड ,<br>
          नई दिल्ली - 110 001<br><br>
          
          <strong>ई-मेल:</strong> techcell-ol[at]gov[dot]in<br>
         
        </p>
        
        <hr>
        
        <h2>प्रगत संगणन विकास केन्द्र (सी-डैक)</h2>
        <p>
          एप्लाइड आर्टिफिशियल इंटैलीजेंस ग्रुप,<br>
          सी-डैक-इनोवेशन पार्क,<br>
          पंचवटी, पाषण,<br>
          पुणे - 411 008,<br>
          महाराष्ट्र (भारत)<br><br>
          
          <strong>टेली:</strong> (020) 25503314/15<br>
          <strong>फैक्स:</strong> (020) 25503334<br>
          <strong>ई-मेल:</strong> info.aai[at]cdac[dot]in<br>
          
        </p>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: selectedLanguage === 'English' ? englishContent : hindiContent }}
        javaScriptEnabled={true}
        style={styles.webview}
        scalesPageToFit={true}
      />
    </View>
  );
};

export default Contactus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    marginHorizontal: 8,
  },
});