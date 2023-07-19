import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import useForceUpdate from 'use-force-update';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../redux/slices/CartSlice';

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
      {id == null ? (<View>
        <Text>Вы не авторизованы</Text>

      </View>) : (
        <View style={styles.container}>
          <Image source={require('../images/circle-user.png')} style={styles.profileImg}></Image>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={[styles.profileName, { fontSize: 14 }]}>{email}</Text>
          <View style={styles.menuContainer}>
            <FlatList data={['Заказы',
              'Адрес',
              'Выйти']}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.listItem} onPress={() => {
                    if (index == 0) {
                      navigation.navigate("Orders")
                    }
                    else if (index == 1) {
                      navigation.navigate("MyAddress")
                    }
                    else if (index == 2) {
                      exitAccount()
                      dispatch(emptyCart([]))
                    }
                  }}>
                    <Text style={styles.itemName}>{item}</Text>
                  </TouchableOpacity>
                )
              }} />
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
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 40,
  },
  profileName: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'black'
  },
  menuContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,

  },
  listItem: {
    width: '90%',
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.8,
    justifyContent: 'center',
    alignSelf: 'center',

    marginBottom: 10

  },
  itemName: {
    fontSize: 16,
    color: 'black',
    paddingLeft: 20
  }
})