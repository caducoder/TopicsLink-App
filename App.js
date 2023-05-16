import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TopNewsStackScreen } from './Screens/TopNews';
import { SearchNewsStackScreen } from './Screens/SearchNews';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Top Headlines"
          component={TopNewsStackScreen}
          options={{
            tabBarLabel: 'Manchetes',
            tabBarIcon: () => {
              return <MaterialCommunityIcons name="newspaper-variant-multiple" size={24} color="black" />;
            },
          }}
        />
        <Tab.Screen
          name="Outras Notícias"
          component={SearchNewsStackScreen}
          options={{
            tabBarLabel: 'Buscar',
            tabBarIcon: () => {
              return <MaterialCommunityIcons name="filter-variant" size={24} color="black" />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
