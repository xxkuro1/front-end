import React,{useEffect,useState} from 'react'
import {View,TextInput,StyleSheet,TouchableOpacity,Text,FlatList,Alert,RefreshControl,BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios/axios';
import { useNavigation } from '@react-navigation/native';

  


const Home =  () => {

    const[description,setDescription] = useState('');
    const[user,setUser] = useState('');
    const[item,setItem] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const onChangeDescription = textValue =>setDescription(textValue);
    const navigation = useNavigation();

    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
      setRefreshing(true); 
      
      wait(1000).then(() => setRefreshing(false));
      loadData();
    }, []);

  
    const Item =({description,name,date,id,user_id}) =>{
    
      if (user_id == user) {
        return (
          <View style={styles.item}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.posted}>{date}</Text>
          <Text style={styles.posted}>{date}</Text>
          <TouchableOpacity style={styles.deleteBtn} ><Text style={styles.textButton} onPress={()=>deleteData(id)}>Delete</Text></TouchableOpacity>
        </View>
        )
      }
      else{
        return (
          <View style={styles.item}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.posted}>{date}</Text>
          </View>
          )
      }

      }

    const deleteData =async(id)=>{
      Alert.alert(
        "Warning",
        "Delete this post?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () =>deletePost(id) }
        ]
      );

    }

    const deletePost = async(id)=>{
      try {
        const response = await axios.post("delete/"+id);
        loadData();
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    const renderItem = ({item}) =>(
      <Item description={item.description} name={item.name} 
      date={item.posted} id={item.id}
      user_id={item.user_id}/>
        
    )

    const addData = async() =>{

      try {
        const response = await axios.post("/create",{description :description, user_id :user})
        
        console.log(response);
        loadData();
       resetInputField();
      } catch (err) {
        console.log(err);
        
      }


    }

    const loadData = async () => {
      try {
          const response = await axios.get("/all")
          const data = response.data;
          setItem(data);
         
      } catch (err) {
        console.log(err)
      }

    }

    const resetInputField = () => {
      setDescription("");
    };

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          const jsonValue = await AsyncStorage.getItem('id')
          if(value !== null) {
            // value previously store
            setUser(jsonValue);
           

          }
        } catch(e) {
          // error reading value
        }
      }
      
      const signOut = async() =>{
        try {
         
          AsyncStorage.clear();
         
          navigation.push('Sign')
          console.log("clear");
          return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
          
        } catch (err) {
            console.log(err);
        }
      }

    useEffect(() =>{
        getData();
        loadData();
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      },[]);

    return (
        <View style={styles.container} >
           <TouchableOpacity style={styles.signoutBtn} ><Text style={styles.textButton} onPress={signOut}>Sign Out</Text></TouchableOpacity>
            <TextInput style={styles.input} multiline  value={description} maxLength={255} placeholder="May bagong issue ba tayo?" onChangeText={onChangeDescription}/>
            <TouchableOpacity style={styles.button} ><Text style={styles.textButton} onPress={addData}>Chismis</Text></TouchableOpacity>
            <FlatList data={item}  renderItem={renderItem} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  />
        </View>
    )
}


const styles = StyleSheet.create({

  container:{
    flex: 1
  },  

    input:{
        padding: 20,
        borderWidth: 1,
        width:  300,
        height: 100,
        marginTop: 20,
        marginLeft: 60,
        color: 'black',
        fontSize: 20,   
        borderRadius: 15,
        
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#6666ff',
        height: 40,
        width: 100,
        marginLeft: 160,
        marginTop: 20,
        borderRadius:15,
        paddingTop: 10
        
    },
    textButton :{
        color: 'white',
        fontSize: 15,
        fontStyle: 'normal',
        
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 5,
      paddingBottom: 50
     
    },
    name: {
      fontSize: 25,
      fontWeight: 'bold',
      paddingBottom: 20

    },
    description:{
      fontSize: 20,
    },
    posted:{
      paddingTop: 30,
      fontSize: 15,
      textAlign: 'right'
    },
    deleteBtn:{
      alignItems: 'center',
      backgroundColor: '#ff3333',
      height: 40,
      width: 100,
      marginTop:-30,
      borderRadius:15,
      paddingTop: 10
    },
    signoutBtn :{
      alignItems: 'center',
      backgroundColor: '#ff3333',
      height: 40,
      width: 100,
      marginLeft: 290,
      marginTop: 20,
      borderRadius:15,
      paddingTop: 10
    }
})

export default Home
