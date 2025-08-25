import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import your Home and About components
import Home from './Home';
import About from './About';
import SelectLanguage from './SelectLanguage';
import Foreword from './Foreword';
import SalientFeatures from './SalientFeatures';
import Contactus from './Contactus';
import Disclaimer from './Disclaimer';


const Drawer = createDrawerNavigator();



function Drowerindex(props:any) {

  const { route } = props;
  const selectedLanguage = route?.params?.selectedLanguage || 'English';

  console.log('Selected Language inside Drowerindex:', selectedLanguage);



  return (
    <View style={{flex:1}}>

          



    <ImageBackground
      source={require('../assets/img/bg.png')}
      style={styles.backgroundImage }
    >





     {/* drower navigator this is time taking lookinto readmefile which is stored in backup projects  */}
     <Drawer.Navigator
          // initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ff8c00', // Set the header background color to blue
            },
            headerTintColor: 'black', // Set the text color of the header title and drawer button
            headerTitleAlign: 'center', // Center the header title
            drawerItemStyle: {
              marginVertical: 0, // Adjust the vertical margin as needed
              marginHorizontal: 0,
              paddingVertical: 0, // Remove vertical padding
              paddingHorizontal: 0, // Remove horizontal padding
            },
          }}
        >


  {/* Other screens in the drawer list */}
  <Drawer.Screen
    name='Home'
    component={Home}
    initialParams={{ selectedLanguage }}
    options={({ navigation }) => ({
      drawerLabel: () => (
        <ImageBackground
          source={require('../assets/img/bg.png')}//when it dosnt load then plese chnage it into .png
          style={{
            width: '120%',  // Set the width as per your design
            height: 'auto',
            margin: -13,
            borderRadius: 1,
            // Optional: If you want to make it a circular background
          }}
        >
          {/* <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
            Home
          </Text> */}
            <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
              {selectedLanguage === 'English' ? 'Home' : 'होम'}
            </Text>
        </ImageBackground>
      ),
      headerRight: () => (
        <MaterialIcons
          name="home"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => {
            // Add any navigation logic for the home icon
            navigation.navigate('Home');
          }}
        />
      ),
      // headerTitle: 'e-Mahashabdkosh',  // Set the header title to langWiseWords[119]
      headerTitle: selectedLanguage === 'English' ? 'e-Mahashabdkosh' : 'ई-महाशब्दकोश',
      
    })}
  />
    <Drawer.Screen
    name='Selected Language'
    component={SelectLanguage}
    initialParams={{ selectedLanguage }}
    options={({ navigation }) => ({
      drawerLabel: () => (
        <ImageBackground
          source={require('../assets/img/bg.png')}//when it dosnt load then plese chnage it into .png
          style={{
            width: '120%',  // Set the width as per your design
            height: 'auto',
            margin: -13,
            borderRadius: 1,
            // Optional: If you want to make it a circular background
          }}
        >
          {/* <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
          SelectLanguage
          </Text> */}
            <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
              {selectedLanguage === 'English' ? 'SelectLangugae' : 'भाषा चुनिए'}
            </Text>
        </ImageBackground>
      ),
      headerRight: () => (
        <MaterialIcons
          name="home"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => {
            // Add any navigation logic for the home icon
            navigation.navigate('Home');
          }}
        />
      ),
      // headerTitle: 'e-Mahashabdkosh',  // Set the header title to langWiseWords[119]
      headerTitle: selectedLanguage === 'English' ? 'e-Mahashabdkosh' : 'ई-महाशब्दकोश',
      
    })}
  />

<Drawer.Screen
    name='Foreword'
    component={Foreword}
    initialParams={{ selectedLanguage }}
    options={({ navigation }) => ({
      drawerLabel: () => (
        <ImageBackground
          source={require('../assets/img/bg.png')}//when it dosnt load then plese chnage it into .png
          style={{
            width: '120%',  // Set the width as per your design
            height: 'auto',
            margin: -13,
            borderRadius: 1,
            // Optional: If you want to make it a circular background
          }}
        >
          {/* <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
          Foreword
          </Text> */}
            <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
              {selectedLanguage === 'English' ? 'Foreword' : 'प्राक्कथन'}
            </Text>
        </ImageBackground>
      ),
      headerRight: () => (
        <MaterialIcons
          name="home"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => {
            // Add any navigation logic for the home icon
            navigation.navigate('Home');
          }}
        />
      ),
      // headerTitle: 'e-Mahashabdkosh',  // Set the header title to langWiseWords[119]
      headerTitle: selectedLanguage === 'English' ? 'e-Mahashabdkosh' : 'ई-महाशब्दकोश',
      
    })}
  />

<Drawer.Screen
    name='SalientFeatures'
    component={SalientFeatures}
    initialParams={{ selectedLanguage }}
    options={({ navigation }) => ({
      drawerLabel: () => (
        <ImageBackground
          source={require('../assets/img/bg.png')}//when it dosnt load then plese chnage it into .png
          style={{
            width: '120%',  // Set the width as per your design
            height: 'auto',
            margin: -13,
            borderRadius: 1,
            // Optional: If you want to make it a circular background
          }}
        >
          {/* <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
          Salient Features
          </Text> */}
             <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
              {selectedLanguage === 'English' ? 'Salient Features' : 'मुख्य विशेषताएँ'}
            </Text>
        </ImageBackground>
      ),
      headerRight: () => (
        <MaterialIcons
          name="home"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => {
            // Add any navigation logic for the home icon
            navigation.navigate('Home');
          }}
        />
      ),
      // headerTitle: 'e-Mahashabdkosh',  // Set the header title to langWiseWords[119]
      headerTitle: selectedLanguage === 'English' ? 'e-Mahashabdkosh' : 'ई-महाशब्दकोश',
      
    })}
  />

<Drawer.Screen
    name='About US'
    component={About}
    initialParams={{ selectedLanguage }}
    options={({ navigation }) => ({
      drawerLabel: () => (
        <ImageBackground
          source={require('../assets/img/bg.png')}//when it dosnt load then plese chnage it into .png
          style={{
            width: '120%',  // Set the width as per your design
            height: 'auto',
            margin: -13,
            borderRadius: 1,
            // Optional: If you want to make it a circular background
          }}
        >
          {/* <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
          About Us
          </Text> */}
            <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
              {selectedLanguage === 'English' ? 'About Us' : 'हमारे बारे में'}
            </Text>
        </ImageBackground>
      ),
      headerRight: () => (
        <MaterialIcons
          name="home"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => {
            // Add any navigation logic for the home icon
            navigation.navigate('Home');
          }}
        />
      ),
      // headerTitle: 'e-Mahashabdkosh',  // Set the header title to langWiseWords[119]
      headerTitle: selectedLanguage === 'English' ? 'e-Mahashabdkosh' : 'ई-महाशब्दकोश',
      
    })}
  />
  <Drawer.Screen
    name='Contact US'
    component={Contactus}
    initialParams={{ selectedLanguage }}
    options={({ navigation }) => ({
      drawerLabel: () => (
        <ImageBackground
          source={require('../assets/img/bg.png')}//when it dosnt load then plese chnage it into .png
          style={{
            width: '120%',  // Set the width as per your design
            height: 'auto',
            margin: -13,
            borderRadius: 1,
            // Optional: If you want to make it a circular background
          }}
        >
          {/* <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
          Contact Us
          </Text> */}
            <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
              {selectedLanguage === 'English' ? 'Contact Us' : 'संपर्क करें'}
            </Text>
        </ImageBackground>
      ),
      headerRight: () => (
        <MaterialIcons
          name="home"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => {
            // Add any navigation logic for the home icon
            navigation.navigate('Home');
          }}
        />
      ),
      // headerTitle: 'e-Mahashabdkosh',  // Set the header title to langWiseWords[119]
      headerTitle: selectedLanguage === 'English' ? 'e-Mahashabdkosh' : 'ई-महाशब्दकोश',
      
    })}
  />

   <Drawer.Screen
    name='Disclaimer'
    component={Disclaimer}
    initialParams={{ selectedLanguage }}
    options={({ navigation }) => ({
      drawerLabel: () => (
        <ImageBackground
          source={require('../assets/img/bg.png')}//when it dosnt load then plese chnage it into .png
          style={{
            width: '120%',  // Set the width as per your design
            height: 'auto',
            margin: -13,
            borderRadius: 1,
            // Optional: If you want to make it a circular background
          }}
        >
          {/* <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
          Disclaimer
          </Text> */}
          <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
              {selectedLanguage === 'English' ? 'Disclaimer' : 'अस्वीकरण'}
            </Text>
        </ImageBackground>
      ),
      headerRight: () => (
        <MaterialIcons
          name="home"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => {
            // Add any navigation logic for the home icon
            navigation.navigate('Home');
          }}
        />
      ),
      // headerTitle: 'e-Mahashabdkosh', 
      headerTitle: selectedLanguage === 'English' ? 'e-Mahashabdkosh' : 'ई-महाशब्दकोश',
      
    })}
  />



{/* <Drawer.Screen
    name='Home us'
    component={Home}
    
    options={({ navigation }) => ({
      drawerLabel: () => (
        <ImageBackground
          source={require('../assets/img/bg.png')}//when it dosnt load then plese chnage it into .png
          style={{
            width: '120%',  // Set the width as per your design
            height: 'auto',
            margin: -13,
            borderRadius: 1,
            // Optional: If you want to make it a circular background
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, margin: 16 }}>
         
          </Text>
        </ImageBackground>
      ),
      headerRight: () => (
        <MaterialIcons
          name="home"
          size={30}
          color="black"
          style={{ marginRight: 10 }}
          onPress={() => {
            // Add any navigation logic for the home icon
            navigation.navigate('Home');
          }}
        />
      ),
      // headerTitle: 'e-Mahashabdkosh',  // Set the header title to langWiseWords[119]
      headerTitle: selectedLanguage === 'English' ? 'e-Mahashabdkosh' : 'ई-महाशब्दकोश',
      
    })}
  /> */}

 


  </Drawer.Navigator>
  </ImageBackground>
  </View>
  );
}

export default Drowerindex;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header:{ flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center', paddingHorizontal: 4, backgroundColor: '#0D6EFD',height: 60, }
  ,
   headerIcon: {
     width: 30,
     alignItems: 'center',
   },
   headerTitle: {
     color: 'white',
     fontSize: 20, // Adjust the font size as needed
   },
});
