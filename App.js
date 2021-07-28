import React from 'react'
import {View,Text, StyleSheet} from 'react-native';
import Header from './components/Header';
import Registration from './components/Registration';
import Signin from './components/Signin';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const App = () => {
  return (
    <View style ={styles.container}>
      <Header/>
      <Signin />
    </View>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
   
  }
})

export default App
