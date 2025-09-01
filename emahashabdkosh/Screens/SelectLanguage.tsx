import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function SelectLanguage(props: any) {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [modalVisible, setModalVisible] = useState(true); // Set to true to open the modal initially

  const handleLanguageSelection = (newSelectedLanguage: any) => {
    setSelectedLanguage(newSelectedLanguage);
    setModalVisible(false); 

   
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Drowerindex', params: { selectedLanguage: newSelectedLanguage || 'English' } }],
    });
  };

  useEffect(() => {
    // The effect to open the modal when the component mounts
    setModalVisible(true);
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <View style={{ flex: 1 }}>
      
      {/* Your existing screen content goes here */}

      {/* Language Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.languageOptionsContainer}>
            <Text style={styles.modalHeading1}>Select Language:</Text>
            <TouchableOpacity onPress={() => handleLanguageSelection('English')}>
              <Text style={styles.languageOption}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageSelection('Hindi')}>
              <Text style={styles.languageOption}>हिंदी</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  languageOptionsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  modalContainer: {
    position: 'absolute',
    top: '50%',   
    left: '10%',  // Adjust the left position as needed
    width: '80%', // Adjust the width as needed
    backgroundColor: 'white', // semi-transparent background
    borderRadius: 10, // Optional: Add border radius for rounded corners
    transform: [{ translateY: -50 }], // Use a numeric value for translateY
  },
  modalHeading1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'black', // Optional: Adjust text color
  },
  languageOption: {
    fontSize: 18,
    marginBottom: 10,
    color: '#0D6EFD', // Optional: Adjust text color
  },
});

export default SelectLanguage;
