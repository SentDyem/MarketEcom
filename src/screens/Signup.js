import { View, Text, StyleSheet, Image,TextInput, Alert } from 'react-native'
import React, {useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import uuid from 'react-native-uuid'
import Loader from '../common/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart';

const Signup = () => {
    const navigation = useNavigation()
    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [mobile, setMobile]= useState('')
    const [password, setPassword]= useState('')
    const[visible, setVisible] = useState(false)
    const registerUser=()=>
    {
        setVisible(true)
        const userId = uuid.v4()
        if (!name || !email || !password || !mobile)
        {
          Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
          setVisible(false)
        }
        else
        {
          setVisible(true)
          firestore().collection("users").doc(userId).set({
            name:name,
            email:email,
            password:password,
            userId:userId,
            mobile:mobile,
          }).then(res=>
            {
                //setVisible(false)
                console.log("user created")
                navigation.navigate("Login")
               
            }).catch(error=>{
                //setVisible(false)
            })
        }
      
    }

    const goToNextScreen = async(userId, email, name, mobile) =>{
      await AsyncStorage.setItem("USERID", userId)
      await AsyncStorage.setItem("EMAIL", email)
      await AsyncStorage.setItem("NAME", name)
      await AsyncStorage.setItem("MOBILE", mobile)
      navigation.navigate('Main')
        }
  return (
    <View style = {styles.container}>
        <View style = {styles.header}>
            <Image source={require('../images/samsung-logo-icon-7.png')} style = {styles.banner}/>
        </View>
        <View style = {styles.card}>
            <Text style = {styles.title}>Регистрация аккаунта</Text>
            <TextInput value ={name} onChangeText={txt=> setName(txt)} style={styles.input} placeholder='Введите имя'/>
            <TextInput value ={email} onChangeText={txt=> setEmail(txt)} style={styles.input} placeholder='Введите почту'/>
            <TextInput value ={mobile} keyboardType='number-pad' onChangeText={txt=> setMobile(txt)} style={styles.input} placeholder='Введите номер телефона'/>
            <TextInput value ={password} onChangeText={txt=> setPassword(txt)} style={styles.input} placeholder='Введите пароль'/>
            <TouchableOpacity style={styles.loginSignupBtn} onPress={()=>{registerUser()}}>
                <Text style = {styles.btnText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.loginSignupBtn,{backgroundColor:'black'}]} onPress={()=>{
                navigation.navigate('Login')
            }}>
                <Text style = {styles.btnText}>Аккаунт уже есть</Text>
            </TouchableOpacity>
        </View>
        <Loader visible={visible}/>
    </View>
  )
}

export default Signup
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:
  {
    width: '100%',
    height: 160,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems:'center',
    paddingLeft: 20,
  },
  card:{
    width:'90%',
    height:'90%',
    position:'absolute',
    bottom: 0,
    backgroundColor:'white',
    elevation:5,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    alignSelf:'center'
  },
  banner:{
    width:600,height:125,
  },
  title:{
    fontSize:20,
    alignSelf:'center',
    marginTop:40,
    fontWeight:'600'
  },
  input:{
    width:'90%',
    height:55,
    borderWidth:1,
    paddingLeft:20,
    borderRadius:10,
    alignSelf:'center',
    marginTop:20
  },
  loginSignupBtn:{
    width:'90%',
    height:50,
    backgroundColor:'#007BFF',
    borderRadius:10,
    marginTop:30,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center'
},
btnText:{
    fontSize:18,
    color:'white',
    fontWeight:'600'
}
})