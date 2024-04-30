import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import WorkSiteList from './screens/workSiteList';
import WorkSiteInfo from './screens/workSiteInfo';
import WorkSiteInProgress from './screens/workSiteInProgress';
import ValidationScreen from './screens/validationScreen';



const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen name="WorkSiteList" component={WorkSiteList} />
            <Stack.Screen name="WorkSiteInfo" component={WorkSiteInfo} />
            <Stack.Screen name="WorkSiteInProgress" component={WorkSiteInProgress} />
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
});

export default App;
