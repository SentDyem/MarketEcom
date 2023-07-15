import { View, Text, StyleSheet, Image,TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const navigation = useNavigation()
  return (
    <View style = {styles.container}>
        <View style = {styles.header}>
            <Image source={require('../images/samsung-logo-icon-7.png')} style = {styles.banner}/>
        </View>
        <View style = {styles.card}>
            <Text style = {styles.title}>Вход</Text>
            <TextInput style={styles.input} placeholder='Введите почту'/>
            <TextInput style={styles.input} placeholder='Введите пароль'/>
            <TouchableOpacity style={styles.loginSignupBtn} onPress={()=>{}}>
                <Text style = {styles.btnText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.loginSignupBtn,{backgroundColor:'black'}]} onPress={()=>{
                navigation.navigate('Signup')
            }}>
                <Text style = {styles.btnText}>Создать аккаунт</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Login
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
    backgroundColor:'blue',
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