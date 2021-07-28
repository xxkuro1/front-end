import  React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,TextInput,TouchableOpacity,Image,BackHandler } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Registration from './Registration';
import Home from './Home';
import axios from '../axios/axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Sign =() =>{
  
    const onChangeEmail = textValue=>setEmail(textValue);
    const onChangePassword =  textValue=>setPassword(textValue);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    const navigation = useNavigation();

    const onPress = async()=> {
  
  
 
        try {
          const response = await axios.post("/login",{email : email,password: password}) .then((response)=>{
          if(!response.data.access_token){
            console.log("Error");
            alert("Wrong Email or Password")
          }else{
              let token = response.data.access_token;
              let id  = response.data.id;
              AsyncStorage.setItem('token', token)
              const data_id = JSON.stringify(id)
              AsyncStorage.setItem('id', data_id)
              navigation.push('Home');
              //AsyncStorage.clear();
          }

              
            
              
          })
        
        } catch (err) {
          console.log(err );
        }
         
        
          }
        
 
  const getData = async () => {
    
    try {
      const value = await AsyncStorage.getItem('token')
      if(value !== null) {
       
        setTimeout(() => {
          navigation.push('Home');
        },0);
    
      }
    } catch(e) {
     
    }
  }


  useEffect(() =>{
    getData();
    return () =>
    BackHandler.removeEventListener('hardwareBackPress', () => true)
  },[]);
    
    return (
        <View style={styles.container} >
       
            <Image style={styles.tinyLogo} source={{uri:'https://steemitimages.com/p/C3TZR1g81UNaPs7vzNXHueW5ZM76DSHWEY7onmfLxcK2iPU8yNFSNJ7WZjrcmmxNvpAPudaVsotSr3A5QkMmuhoP6rn3oHY4UfX4KLKAuVCdGuE7bVeDxx6?format=match&mode=fit&width=640'}} />
            <Text style={styles.textEmail}>Email:</Text>
            <TextInput style={styles.inputEmail} autoCompleteType="email" placeholder="Email" onChangeText={onChangeEmail} />
            <Text style={styles.textPassword}>Password:</Text>
            <TextInput style={styles.inputEmail} secureTextEntry={true} placeholder="Password" onChangeText={onChangePassword} />
            <TouchableOpacity style={styles.button}><Text style={styles.textButton} onPress={onPress}>SIGN IN</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button}><Text style={styles.textButton} onPress={() => navigation.navigate('Registration')}>SIGN UP</Text></TouchableOpacity>
        </View>
    )
}

const Stack = createStackNavigator();
const Signin = () => {

  
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false
  }} >
            <Stack.Screen name="Sign" component={Sign} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

const styles = StyleSheet.create({

    text:{
        fontSize: 20,   
        textAlign: 'center',
        paddingTop: 10,    
        fontStyle: 'normal',
        paddingRight: 25
        
    },
    input:{
        height: 40,
        width: 250,
        marginLeft: 50,
        marginTop:10,
        borderWidth: 1,
        borderRadius: 15
    },
    inputEmail :{
        height: 40,
        width: 250,
        marginLeft: 80,
        marginTop:10,
        borderWidth: 1,
        borderRadius: 15
    },
    textEmail:{
        fontSize: 20,   
        textAlign: 'center',
        paddingTop: 30,    
        fontStyle: 'normal'
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#6666ff',
        height: 40,
        width: 100,
        marginLeft: 155,
        marginTop: 20,
        borderRadius:15,
        paddingTop: 10
        
    },
    textButton :{
        color: 'white',
        fontSize: 15,
        fontStyle: 'normal'
    },
    textPassword :{
        fontSize: 20,   
        textAlign: 'center',
        paddingTop: 30,    
        fontStyle: 'normal'
    },
    tinyLogo: {
        width: 150,
        height: 150,
        marginTop: 30,
        marginLeft: 130,
        
      },
      spinnerTextStyle: {
        color: '#FFF'
      },
})

export default Signin
