import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const User = () => {
  const [name, setName]= useState('')
  const [email, setEmail] = useState('')
  const navigation = useNavigation()

  useEffect(()=> {
getData()
  },[])

  const getData = async() =>{
let mName = await AsyncStorage.getItem("NAME")
let mEmail = await AsyncStorage.getItem("EMAIL")
setName(mName)
setEmail(mEmail)
  }
  return (
    <View style = {styles.container}>
      <Image source = {require('../images/circle-user.png')} style = {styles.profileImg}></Image>
      <Text style = {styles.profileName}>{name}</Text>
      <Text style = {[styles.profileName, {fontSize:14}]}>{email}</Text>
      <View style = {styles.menuContainer}>
      <FlatList data = {['Заказы',
       'Адрес',
       'Уведомления',
       'Правила использования',
        'О нас',
         'Связаться с нами',
          'Выйти']}
           renderItem={({item, index})=> {
            return (
              <TouchableOpacity style = {styles.listItem} onPress={()=> {
                if (index==0)
                {
                  navigation.navigate("Orders")
                }
                else if (index == 1)
                {
                  navigation.navigate("MyAddress")
                }
              }}>
                <Text style = {styles.itemName}>{item}</Text>
              </TouchableOpacity>
            )
           }}/>
      </View>
      
    </View>
  )
}

export default User

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  profileImg:{
    width:100,
    height:100,
    borderRadius:50,
    alignSelf:'center',
    marginTop:40,
  },
profileName: {
  alignSelf:'center',
  marginTop:20,
  fontSize:20,
color:'black'
},
menuContainer: {
  width:'90%',
  backgroundColor: 'white',
  borderRadius:10,
  justifyContent:'center',
  alignSelf:'center',
  marginTop:20,

},
listItem: {
  width:'90%',
  height:50,
  borderBottomColor:'gray',
  borderBottomWidth:0.8,
  justifyContent:'center',
  alignSelf:'center',
  
  marginBottom:10
  
},
itemName: {
  fontSize:16,
  color:'black',
  paddingLeft:20
}
})