import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import WorkSiteList from './screens/workSiteList';
import WorkSiteInfo from './screens/work_site/workSiteInfo';
import WorkSiteInProgress from './screens/work_site/workSiteInProgress';
import ValidationScreen from './screens/work_site/validationScreen';

function WorkSiteListHeader() {
  return (
    <View style={{ backgroundColor: '#76C3F0', alignItems: 'center' }}>
      <View style={{ width: '92%',paddingTop: 45, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ alignItems: 'center', flex: 1, paddingLeft:40 }}>
          <Text style={styles.navTitle}>Monsieur Dupont</Text>
          <Text style={styles.author}>Chef de Chantier</Text>
        </View>

        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity >
            <View style={styles.profilePictureContainer}>
              <Image
                source={require("./assets/user.png")}
                style={styles.profilePicture}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="WorkSiteList" component={WorkSiteList} options={{ header: () => <WorkSiteListHeader /> }} />
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
  profilePictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  profilePicture: {
    width: 40,
    height: 40,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  author: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#efe',
  }
});

export default App;
