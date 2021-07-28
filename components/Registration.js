import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,BackHandler } from 'react-native'
import axios from "../axios/axios";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from './Signin';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';



const Registration = () => {

    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const onChangeName = textValue=>setName(textValue);
    const onChangeEmail = textValue=>setEmail(textValue);
    const onChangePassword =  textValue=>setPassword(textValue);

    const navigation = useNavigation();
    const addData  = async() =>{
       
        try {
           if (name =='' || email =='' || password =='') {
                alert("Please input all fields");
           } else {
            const response = await axios.post("/register",{name :name,email :email, password: password})
            Alert.alert(
               "Success",
               "Registered Successfully",
               [
                
                 { text: "OK", onPress: () => navigation.goBack() 
                   
                }
               ]
             );
           }
      
         //navigation.goBack();
        } catch (err) {
            console.log(err);
        }
     }

    const backButton = ()=>{
        try {
            navigation.push('Sign')
        } catch (err) {
            console.log(err);
        }
    }

      useEffect(() => {
        return () =>
        BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])

    return (
        <View>
             <TouchableOpacity style={styles.backButton}><Text style={styles.textButton} onPress={backButton}>Back</Text></TouchableOpacity>
            <Text style={styles.text}>Name:</Text>
            <TextInput style={styles.input} placeholder="Name" onChangeText={onChangeName} />
            <Text style={styles.textEmail}>Email:</Text>
            <TextInput style={styles.inputEmail} autoCompleteType="email" placeholder="Email" onChangeText={onChangeEmail} />
            <Text style={styles.textEmail}>Password:</Text>
            <TextInput style={styles.inputEmail} secureTextEntry={true} placeholder="Password"  onChangeText={onChangePassword}/>
            <TouchableOpacity style={styles.button}><Text style={styles.textButton} onPress={addData}>SIGN UP</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    text:{ 
        fontSize: 20,   
        textAlign: 'center',
        paddingTop: 100,    
        fontStyle: 'normal'
        
    },
    input:{
        height: 40,
        width: 250,
        marginLeft: 80,
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
        paddingTop: 10,    
        fontStyle: 'normal'
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#6666ff',
        height: 40,
        width: 100,
        marginLeft: 150,
        marginTop: 20,
        borderRadius:15,
        paddingTop: 10
        
    },
    textButton :{
        color: 'white',
        fontSize: 15,
        fontStyle: 'normal'
    },
    backButton:{
        alignItems: 'center',
        backgroundColor: '#6666ff',
        height: 40,
        width: 100,
        marginLeft: 10,
        marginTop: 20,
        borderRadius:15,
        paddingTop: 10
    }

})

export default Registration
