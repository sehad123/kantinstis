/* eslint-disable react/react-in-jsx-scope */
import {StatusBar, StyleSheet, Text, SafeAreaView, View} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import {Provider} from 'react-redux';
import store from './store';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
