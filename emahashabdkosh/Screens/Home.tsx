import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import Sound from 'react-native-sound';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(); 



interface SearchResultObject {
  englishUsage: string;
  hindiUsage: string;
  englishDescription: string;
  hindiDescription: string;
  grammer: string;
  word: string;
  partOfSpeech: string;
  category: string;
  meaning: string;
  exampleSentence: string;
}

type LanguageLabels = {
  English: string[];
  Hindi: string[];
};

const Home = ({ route }: any) => {
  const { selectedLanguage } = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string[] | SearchResultObject[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [showAllContent, setShowAllContent] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [userSearch, setUserSearch] = useState(''); 

  useEffect(() => {
    console.log('Selected Language in Home:', selectedLanguage);
   
  }, [selectedLanguage]);

  const placeholderText = selectedLanguage === 'English' ? 'Search words ' : 'शब्द खोजें';

  const clearSearchBox = () => {
    setSearchQuery('');
  };











  const [soundAvailable, setSoundAvailable] = useState(false); 

  const clearSearchBoxof = () => {
    setSearchQuery('');
  };

  const handleSearchIconPress = (wordOverride?: string) => {
    const wordToSearch = (wordOverride || searchQuery).trim().toLowerCase();
  
    if (!wordToSearch) return;
  
    setSearchResult([]);
    setSoundAvailable(false);
    setUserSearch(wordToSearch); 
  
    const requestData = { WORD: wordToSearch };
  
    axios.post('https://lilaonmobile.rb-aai.in/emaha/SailService.asmx/GetWordData', requestData, {
      timeout: 5000,
    })
      .then(response => {
        const apiData = response.data.d;
  
        if (apiData && Array.isArray(apiData) && apiData.length > 0) {
          setSearchResult(apiData);
  
          const audioUrl = `https://lilaonmobile.rb-aai.in/emaha/Audio/${encodeURIComponent(wordToSearch)}.mp3`;
  
          axios.head(audioUrl)
            .then(() => setSoundAvailable(true))
            .catch(() => setSoundAvailable(false));
        } else {
          setSearchResult(['No data found for the given word.']);
          setSoundAvailable(false);
        }
  
        setSuggestions([]);
        clearSearchBox();
      })
      .catch(error => {
        console.error('API Error:', error);
        setSearchResult(['No data found for the given word.']);
        setSoundAvailable(false);
        setSuggestions([]);
        clearSearchBox();
      });
  };
  
  



  
const handleSoundIconPress = () => {
  if (!soundAvailable || !userSearch) return;

  console.log('Search Query:', userSearch);
  const audioUrl = `https://lilaonmobile.rb-aai.in/emaha/Audio/${encodeURIComponent(userSearch)}.mp3`;
  console.log('Audio URL:', audioUrl);

  // For remote files, use undefined instead of null
  const sound = new Sound(
    audioUrl,
    undefined, // Correct way to handle remote files
    (error) => {
      if (error) {
        console.error('Sound loading error:', {
          message: error.message,
          code: error.code,
          domain: error.domain,
          nativeStackIOS: error.nativeStackIOS
        });
      } else {
        console.log('Sound loaded successfully');
        sound.play((playbackError) => {
          if (playbackError) {
            console.error('Playback failed:', playbackError);
          }
          sound.release();
        });
      }
    }
  );
};


  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
    setUserSearch(text);
    setSearchResult([]); 
  
    console.log('Search Query:', text);
  
    if (text.length >= 3) {
      const requestData = {
        prefix: text,
      };
  
      axios.post('https://lilaonmobile.rb-aai.in/emaha/SailService.asmx/GetCustomers', requestData)
        .then(response => {
          const suggestionData = response.data.d || [];
          setSuggestions(suggestionData);
        })
        .catch(error => {
          console.error('API Error:', error);
        });
    }
  };
  
  
  // Function to handle suggestion selection
  const handleSuggestionSelect = (selectedSuggestion: string) => {
    setUserSearch(selectedSuggestion);
    setSearchQuery(selectedSuggestion);
    setSuggestions([]);
  
   
    handleSearchIconPress(selectedSuggestion);
  };
  
  const labelMappings: LanguageLabels = {
    English: ['Word:', 'Meaning/Description:', 'Grammatical Category:', 'Domain:', 'Hindi Description:', 'English Description:', 'Hindi Usage:', 'English Usage:'],
    Hindi: ['शब्द:', 'अर्थ:', 'व्याकरण:', 'क्षेत्र:', 'हिंदी विवरण:', 'अंग्रेज़ी विवरण:', 'हिंदी उपयोग:', 'अंग्रेज़ी उपयोग:'],
  };

  const toggleIndexVisibility = (index: number) => {
    if (showAllContent) {
      setVisibleIndexes([]);
      setShowAllContent(false);
    } else {
      if (visibleIndexes.includes(index)) {
        setVisibleIndexes(visibleIndexes.filter((i) => i !== index));
      } else {
        setVisibleIndexes([...visibleIndexes, index]);
      }
    }
  };

  const toggleAllVisibility = () => {
    if (showAllContent) {
      setVisibleIndexes([]);
    } else {
      setVisibleIndexes([...Array(searchResult?.length || 0).keys()]);
    }
    setShowAllContent(!showAllContent);
  };



 



  return (
    
    <ScrollView>
      <View style={styles.container}>
        {/*
        {/* Show suggestions */}
              {suggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                                <FlatList
                  data={suggestions}
                  renderItem={({ item }) => {
                    const suggestionParts = item.split('$');
                    const suggestionWord = suggestionParts[0];
                    const suggestionDescription = suggestionParts[1];

                    return (
                      <TouchableOpacity onPress={() => handleSuggestionSelect(suggestionWord)}>
                        <View style={styles.suggestionItemContainer}>
                          <Text style={styles.suggestionItemWord}>{suggestionWord}</Text>
                         
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item) => item}
                />
              </View>
            )}



{searchResult && searchResult.length > 0 && searchResult[0] !== 'No data found for the given word.' ? (
  <>
    <Text style={styles.searchText}>
      {typeof searchResult[0] === 'string' ? searchResult[0].split('$')[1] : ''}
    </Text>

 
    <View style={styles.showAllButton}>
      <TouchableOpacity onPress={toggleAllVisibility}>
        <Text style={styles.toggelTextshow}>
          {showAllContent
            ? selectedLanguage === 'English'
              ? 'Hide All'
              : 'सभी को छिपाएं'
            : selectedLanguage === 'English'
              ? 'Show All'
              : 'सब दिखाएं'
          }
        </Text>
      </TouchableOpacity>
    </View>

        {/* Render the sound icon only if sound is available */}
        {soundAvailable && (
          <TouchableOpacity onPress={handleSoundIconPress}>
            <MaterialIcons name="volume-up" size={32} color="black" style={styles.soundIcon} />
          </TouchableOpacity>
        )}


          
        
        {/* Show sound icon if audio is available */}


    {/* Buttons for each index */}
    <View style={styles.indexButtonsContainer}>
      {searchResult.map((_, index) => (
        <React.Fragment key={index}>
          <TouchableWithoutFeedback onPress={() => toggleIndexVisibility(index)}>
            <View style={styles.stripContainer}>
              <MaterialIcons
                name={visibleIndexes.includes(index) ? 'remove' : 'add'}
                size={20}
                color="black"
                style={styles.plusIcon}
              />
              <Text style={styles.toggelText}>
                {(searchResult[index] as string).split('$')[2] + ' (' + (searchResult[index] as string).split('$')[4] + ')'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {/* Display content if the button is pressed */}
          {visibleIndexes.includes(index) && (
            <View>
              <View style={styles.wordContainer}>
                {/* Handle the case when wordData is a string */}
                {(searchResult[index] as string).split('$').map((item, subIndex) => (
                  <React.Fragment key={subIndex}>
                    {subIndex > 0 && item.trim() !== '' && (
                      <>
                        <Text style={styles.searchResultText}>
                          {labelMappings[selectedLanguage as keyof LanguageLabels][subIndex - 1]}
                        </Text>
                        <Text style={styles.searchResultText}>{` ${item}`}</Text>
                        <View style={styles.line} />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </View>
              {/* Add a line after each item */}
              {index < searchResult.length - 1 && <View style={styles.line} />}
            </View>
          )}
        </React.Fragment>
      ))}
    </View>
  </>
) : (
  
<Text style={styles.searchResultText}>
  {searchResult.length > 0 ? (
    <>
      {typeof searchResult[0] === 'string' ? (
        <Text style={styles.blueText}>{searchResult[0]}</Text>
      ) : (
       
     
        <Text>{/* SearchResultObject */}</Text>
      )}
    </>
  ) : (
    ' '
  )}
</Text>

  
)}



        {searchResult && typeof searchResult === 'string' && (
          <Text style={styles.searchResult}>{searchResult}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    backgroundColor: 'white',
  },
  searchResult: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  searchResultContainer: {
    marginTop: 16,
  },
  searchResultText: {
    fontSize: 14,
    marginBottom: 8,
    color: 'black',
  },
  wordContainer: {
    marginBottom: 16,
    marginTop: '2%',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
  searchText: {
    marginTop: '8%',
    fontSize: 28,
    marginBottom: 8,
    color: 'blue',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: 'green',
  },
  showAllButton: {
    backgroundColor: '#2475B0',
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
    color: 'white',
    fontWeight: 'bold',
  },
  toggelText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  stripContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    marginTop: '4%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    marginRight: 8,
  },
  indexButtonsContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-between',
    marginTop: 16,
  },
  indexButton: {
    backgroundColor: '#2475B0',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  indexButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  suggestionsContainer: {
    marginTop: 10,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  

  suggestionItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionItemWord: {
    fontSize: 16,
    
    color: 'black',
  },
  suggestionItemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  toggelTextshow:{
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  blueText: {
    color: 'blue',
    fontSize:16
  },
  soundIcon: {
    marginTop: 16,
  },
  clearIcon: {
    position: 'absolute',
    right: 40,
    top: 10, 
  },
});




export default Home;
