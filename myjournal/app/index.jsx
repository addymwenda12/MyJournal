import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from '../components/navigation/AuthStackNavigator';
import * as Font from 'expo-font';
import AppLoading from 'expo';
// import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedImageStylePropTypes';

export default class App extends React.Component {
  state = {
    isFontLoaded: false
  }

  async componentDidMount(){
    await Font.loadAsync({
      'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    });
    this.setState({ isFontLoaded: true });
  }

  render(){
    return (
      (this.state.isFontLoaded === true) ? (<AppNavigator />) : (<AppLoading />)
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});