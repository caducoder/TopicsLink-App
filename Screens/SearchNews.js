import { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NewsCard } from '../components/NewsCard'
import NewsDetails from './NewsDetails';
import LogoTitle from '../components/LogoTitle';
import { GNEWS_API_KEY } from '@env'

const SearchNewsStack = createStackNavigator()

export function SearchNewsStackScreen() {
  return (
    <SearchNewsStack.Navigator>
      <SearchNewsStack.Screen
        name="Outras notícias"
        component={SearchNewsScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} title="Outras notícias" /> }}
      />
      <SearchNewsStack.Screen name="Detalhes" component={NewsDetails} />
    </SearchNewsStack.Navigator>
  );
}

export function SearchNewsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [noticias, setNoticias] = useState([])
  const [isLoading, setLoading] = useState(false)
  let url =
    "https://gnews.io/api/v4/search?q=" +
    searchQuery +
    "&lang=pt&country=br&apikey=" +
    GNEWS_API_KEY

  const onChangeSearch = query => {
    setSearchQuery(query)
  };

  const handleSearch = async () => {
    setLoading(true)

    try {
      const response = await fetch(url);
      const json = await response.json();
      setNoticias(json.articles);
    } catch (error) {
      setNoticias([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 1 }}>

      <Searchbar
        placeholder="Buscar..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={handleSearch}
        style={{ width: '100%', backgroundColor: MD2Colors.blueGrey100 }}
      />
      {isLoading ?
        <ActivityIndicator
          animating={true}
          size='large'
          color={MD2Colors.blue400}
          style={{ alignItems: 'center' }}
        />
        : (
          <FlatList
            data={noticias}
            renderItem={(p) => <NewsCard props={p} navigation={navigation} />}
            keyExtractor={(item, index) => String(index)}
          />
        )
      }
    </View>
  );
}