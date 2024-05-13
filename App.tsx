import React, { useState } from 'react';
import { LogBox, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WorkSiteList } from './screens/workSiteList';
import { ProfileButton, TitleHeader } from './components/Header';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import MainApi from './api/MainApi';
import { WorkSiteManager } from './screens/workSite/workSiteManager';
import { LoginScreen } from './screens/loginScreen';
import { ProfileScreen } from './screens/profile';
import { Color } from './GlobalStyles';
import { User } from './api/Model';

const Stack = createStackNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  MainApi.initInstance();
  const [user, setUser] = useState<User>();

  
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {/* <Provider store={store}> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" initialParams={{ user: user, setUser: setUser }} component={LoginScreen} options={{
            headerShown: false,
          }} />

          <Stack.Screen name="ProfileScreen" initialParams={{ user: user, setUser: setUser }} component={ProfileScreen} options={{
            headerStyle: { backgroundColor: '#F2F2F2' },
            headerTitleAlign: 'center',
            headerTitle: () => <TitleHeader title='Monsieur Dupont' subtitle='Chef de Chantier' isBlue={false} />,
          }} />

          <Stack.Screen name="WorkSiteList" initialParams={{ user: user, setUser: setUser }} component={WorkSiteList} options={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: Color.light_blue },
            headerTitleAlign: 'center',
            headerTitle: () => <TitleHeader title='Monsieur Dupont' subtitle='Chef de Chantier' isBlue={true} />,
            headerRight: () => <ProfileButton />,
            headerLeft: () => null,
          }} />

          <Stack.Screen name="WorkSiteManager" initialParams={{ user: user, setUser: setUser }} component={WorkSiteManager} options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#F2F2F2' },
            headerTitle: () => <TitleHeader title='' subtitle='' isBlue={false} />,
            headerRight: () => <ProfileButton />
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      {/* </Provider> */}
    </ApplicationProvider>
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