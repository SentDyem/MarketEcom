import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import useForceUpdate from 'use-force-update';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../redux/slices/CartSlice';
import RNRestart from 'react-native-restart';

const User = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const navigation = useNavigation()
  const dispatch = useDispatch()
  

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let mName = await AsyncStorage.getItem("NAME")
    let mEmail = await AsyncStorage.getItem("EMAIL")
    let mId = await AsyncStorage.getItem("USERID")
    setName(mName)
    setEmail(mEmail)
    setId(mId)
  }

  const exitAccount = async() =>{
    await AsyncStorage.setItem("USERID", '')
    await AsyncStorage.setItem("EMAIL", '')
    await AsyncStorage.setItem("NAME", '')
    navigation.navigate('Main')
    
      }


  return (

    <View style={styles.container}>
      {id == null ? (navigation.navigate("Login")) : (
        <View style={styles.container}>
          
          <View style = {styles.profileContainer}>
          <Image source={require('../images/circle-user.png')} style={styles.profileImg}></Image>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={[styles.profileEmail]}>{email}</Text>
          </View>
          
          <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={()=> { navigation.navigate("Orders")}}> 
           
          <Text style={styles.menuItemText}>Мои заказы</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={()=> { navigation.navigate("MyAddress")}} >
          <Text style={styles.menuItemText}>Мои адреса</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={()=> {
          exitAccount()
          dispatch(emptyCart([]))
          RNRestart.restart();
        }}>
                    <Text style={styles.menuItemText} >Выйти</Text>
        </TouchableOpacity>

          </View>
        </View>
      )}


    </View>
  )
}

export default User

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileImg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 18,
    color: '#777',
    marginBottom: 24,
  },
  menuContainer: {
    padding: 16,
    

  },
  profileContainer: {
    alignItems: 'center',
   
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',

  },
  itemName: {
    marginLeft: 16,
    fontSize: 18,
    color: '#333',
  },
  menuItemText: {
    marginLeft: 16,
    fontSize: 18,
    color: '#333',
  },
})