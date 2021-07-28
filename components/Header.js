import React,{useEffect,useState} from 'react'
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
    const[token,setToken] = useState('');
const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if(value !== null) {
        // value previously stored
        console.log(value);
        setToken(value);
        //AsyncStorage.clear();
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData();
    
  }, [])


    return (
        <View style = {styles.header}>
                <Text style = {styles.text}>Online Tsismisan</Text>
        </View>
    )
   
 
}

const styles = StyleSheet.create({

    header: {
        height:60,
        padding: 15,
        backgroundColor: '#6666ff',
        
    },
    text: {
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        marginRight: 20
        
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#ff3333',
        height: 40,
        width: 80,
        marginLeft: 245,
        borderRadius:15,
        paddingBottom: 10,
        marginTop: -34,
        padding: 10
       
    
        
    },
    textButton :{
        color: 'white',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight:'bold'
    }
})

export default Header
