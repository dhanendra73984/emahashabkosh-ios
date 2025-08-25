import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Drowerindex from './Drowerindex';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'
import Home from './Home';
import About from './About';
import { LogBox } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const isTablet = width >= 768;

LogBox.ignoreAllLogs(); 


export default function App() {
  const Stack = createNativeStackNavigator();

  return (

    
    <NavigationContainer>
       

        <Stack.Navigator>
     
        <Stack.Screen            
            name="Drowerindex"
            component={Drowerindex}
            options={{ title: ' ' ,headerShown:false }}
          />
        <Stack.Screen            
            name="Home"
            component={Home}
            options={{ title: ' ' ,headerShown:false }}
          />

         <Stack.Screen            
            name="About"
            component={About}
            options={{ title: ' ' ,headerShown:false }}
          />

         
          

       </Stack.Navigator>
       
       
   </NavigationContainer>

  
     
  

   
  )
}






const styles = StyleSheet.create({
  container: {
    
    
  },
  
  
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


