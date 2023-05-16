import { useState, useEffect } from 'react'
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { NewsCard } from '../components/NewsCard'
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import NewsDetails from './NewsDetails';
import { GNEWS_API_KEY } from '@env'
import LogoTitle from '../components/LogoTitle';

const TopNewsStack = createStackNavigator()

export function TopNewsStackScreen() {
  return (
    <TopNewsStack.Navigator>
      <TopNewsStack.Screen
        name="Notícias Principais"
        component={TopNewsScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} title="Notícias Principais" /> }}
      />
      <TopNewsStack.Screen name="Detalhes" component={NewsDetails} />
    </TopNewsStack.Navigator>
  );
}

export function TopNewsScreen({ navigation }) {
  const [noticias, setNoticias] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  let category = "general";
  let url =
    "https://gnews.io/api/v4/top-headlines?category=" +
    category +
    "&lang=pt&country=br&max=10&apikey=" +
    GNEWS_API_KEY;

  const getNews = async () => {
    setLoading(true)
    setIsRefreshing(true)
    try {
      const response = await fetch(url);
      const json = await response.json();
      setNoticias(json.articles);
    } catch (error) {
      setNoticias([])
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  const onRefresh = () => {
    getNews()
  }

  useEffect(() => {
    getNews()
  }, [])

  if (isLoading) {
    return <ActivityIndicator animating={true} size='large' color={MD2Colors.blue400} style={styles.loading} />
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={noticias}
        renderItem={(p) => <NewsCard props={p} navigation={navigation} />}
        keyExtractor={(item, index) => String(index)}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});