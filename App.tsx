import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Test from './screens/test';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Test />
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
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
