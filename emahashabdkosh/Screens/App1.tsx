import * as React from 'react';
import { Button, View, Text, StyleSheet, Alert, ActivityIndicator, BackHandler, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import  { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Sound from 'react-native-sound';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';



// Define the types for your screens
type RootDrawerParamList = {
  Home: undefined; // No parameters expected for the Home screen
  Notifications: undefined; // No parameters expected for the Notifications screen
};

// Define the type for the `navigation` prop
type HomeScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Home'>;
type NotificationsScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, 'Notifications'>;

// Props for the HomeScreen component
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

// Props for the NotificationsScreen component
interface NotificationsScreenProps {
  navigation: NotificationsScreenNavigationProp;
}

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// Home Screen Component
function HomeScreen({ navigation }: HomeScreenProps) {


  const [data, setData] = useState<Post | null>(null);
  const [loadings, setLoadings] = useState(true);
  const [error, setError] = useState(null);
  const soundRef = useRef<Sound | null>(null);

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.release(); // Release any previous instance
    }

    soundRef.current = new Sound(
      'https://lilaonmobile.rb-aai.in/LILAMobileData/DictSound/akbar.mp3',
      undefined, // Use undefined instead of null
      (error) => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        soundRef.current?.play((success) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Playback failed');
          }
        });
      }
    );
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, []);

 
  

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        setData(response.data); // Set the response data
        setLoadings(false); // Stop loading
      })
      .catch(err => {
        setError(err.message); // Set error message
        setLoadings(false); // Stop loading
      });
  }, []);



 


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Play Sound" onPress={playSound} />
      <Icon name="rocket" size={30} color="#900" onPress={playSound} />

      <View style={styles.container}>
      <Text style={styles.title}>Post Title:</Text>
      <Text style={styles.data}>{data?.title}</Text>
      <Text style={styles.title}>Post Body:</Text>
      <Text style={styles.data}>{data?.body}</Text>
    
    </View>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

// Notifications Screen Component
function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const [showWebView, setShowWebView] = useState(false);
  const [webViewError, setWebViewError] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {showWebView ? (
        <View style={styles.webviewContainer}>
          <WebView
            source={{ uri: 'https://www.google.com' }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onLoad={() => console.log("WebView loaded successfully!")}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error("WebView error:", nativeEvent);
              setWebViewError(nativeEvent.description);
            }}
          />
          {webViewError && <Text style={styles.errorText}>Error: {webViewError}</Text>}
          <Button title="Close WebView" onPress={() => setShowWebView(false)} />
          <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
        </View>
      ) : (
        <>
          <Text style={styles.title}>Notifications Screen</Text>
          <Button title="Open WebView" onPress={() => setShowWebView(true)} />
          <Button title="Go Back Home" onPress={() => navigation.navigate('Home')} />
        </>
      )}
    </View>
  );
}
// Create the Drawer Navigator
const Drawer = createDrawerNavigator<RootDrawerParamList>();

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
  data: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  webviewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});