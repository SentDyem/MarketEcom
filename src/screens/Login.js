import { View, Text, StyleSheet, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Loader from '../common/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart';

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const signin = () => {
    //setVisible(true)
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');}
      else {
        firestore().collection("users").where("email", "==", email).get().then(snapshot => {
          console.log(JSON.stringify(snapshot.docs[0].data()))
          if (snapshot.docs != []) {
            if (snapshot.docs[0].data().password == password) {
    
              goToNextScreen(snapshot.docs[0].data())
              setVisible(true)
            }
            else {
              Alert.alert('Ошибка');
            }
          }
        })
        setVisible(false)
      }
    
  }
  const goToNextScreen = async(data) =>{
await AsyncStorage.setItem("USERID", data.userId)
await AsyncStorage.setItem("EMAIL", data.email)
await AsyncStorage.setItem("NAME", data.name)
await AsyncStorage.setItem("NAME", data.mobile)
navigation.navigate('Main')
RNRestart.restart();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../images/samsung-logo-icon-7.png')} style={styles.banner} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Вход</Text>
        <TextInput value={email} onChangeText={txt => setEmail(txt)} style={styles.input} placeholder='Введите почту' />
        <TextInput value={password} onChangeText={txt => setPassword(txt)} style={styles.input} placeholder='Введите пароль' />
        <TouchableOpacity style={styles.loginSignupBtn} onPress={() => { signin() }}>
          <Text style={styles.btnText}>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginSignupBtn, { backgroundColor: 'black' }]} onPress={() => {
          navigation.navigate('Signup')
        }}>
          <Text style={styles.btnText}>Создать аккаунт</Text>
        </TouchableOpacity>
      </View>
      <Loader visible={visible} />
    </View>
  )
}

export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header:
  {
    width: '100%',
    height: 160,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  card: {
    width: '90%',
    height: '90%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignSelf: 'center'
  },
  banner: {
    width: 600, height: 125,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 40,
    fontWeight: '600'
  },
  input: {
    width: '90%',
    height: 55,
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20
  },
  loginSignupBtn: {
    width: '90%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600'
  }
})