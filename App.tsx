import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import { WorkSiteList } from './screens/workSiteList';
import { WorkSiteInfo } from './screens/workSite/workSiteInfo';
import { WorkSiteInProgress } from './screens/workSite/workSiteInProgress';
import { ValidationScreen } from './screens/workSite/validationScreen';
import { ProfileButton, TitleHeader } from './components/Header';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='WorkSiteList'>
          <Stack.Screen name="WorkSiteList" component={WorkSiteList} options={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#76C3F0' },
            headerTitleAlign: 'center',
            headerTitle: () => <TitleHeader title='Monsieur Dupont' subtitle='Chef de Chantier' isBlue={true} />,
            headerRight: () => <ProfileButton />
          }} />
          <Stack.Screen name="WorkSiteInfo" component={WorkSiteInfo} />
          <Stack.Screen name="WorkSiteInProgress" component={WorkSiteInProgress} options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#F2F2F2' },
            headerTitle: () => <TitleHeader title='Titre de la Mission' subtitle='Statut' isBlue={false} />
          }} />
          <Stack.Screen name="ValidationScreen" component={ValidationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#F1F1F1',
  }
});

export default App;
