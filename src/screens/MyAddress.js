import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
const MyAddress = () => {

  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [addressList, setAddressList] = useState([])

  useEffect(() => {
    getAddress()
  }, [isFocused])

  const getAddress = async () => {
    const id = await AsyncStorage.getItem('USERID')
    firestore().collection("address").where("addedBy", "==", id).get().then(snapshot => {
      if (snapshot.docs != []) {
        setAddressList(snapshot.docs)
      }
    })
  }

const setDefault=(addressId)=> {
let temp = addressList;
temp.map(item=>{
  if (item._data.addressId==addressId)
  {
    firestore().collection("address").doc(addressId).update({
      default:true
    })
  }
  else {
    firestore().collection("address").doc(item._data.addressId).update({
      default:false
    })
  }
})
getAddress()
}

  return (
    <View style={styles.container}>
      <FlatList data={addressList} renderItem={({ item, index }) => {
        return (
          <TouchableOpacity style={styles.addressItem} onPress ={()=> {
setDefault(item._data.addressId)
          }}>
            <View>
              <Text>{"Улица: " + item._data.street}</Text>
              <Text>{"Город: " + item._data.city}</Text>
              <Text>{"Регион: " + item._data.state}</Text>
              <Text>{"Почтовый индекс: " + item._data.pin}</Text>
            </View>
            <View style = {{alignItems:'center'}}>
              {item._data.default == true && <Text style={styles.default}>{item._data.default == true ? 'Выбран' : ''}</Text>}
              <Text style={styles.edit}>Изменить</Text>
              <Text style={styles.delete}>Удалить</Text>

            </View>
          </TouchableOpacity>
        )
      }} />
      <TouchableOpacity style={styles.addNewBtn} onPress={() => { navigation.navigate("AddAddress") }}>
        <Text style={styles.btnText}>Добавить новый адрес</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MyAddress

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addNewBtn: {
    backgroundColor: 'blue',
    height: 50,
    width: '90%',
    position: 'absolute',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 10
  },
  btnText: {
    color: 'white',
    fontSize: 16,

  },
  addressItem: {
    width: '90%',
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'

  },
  default: {
    backgroundColor: 'blue',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    fontSize: 12,
    borderRadius:10
  },
  edit: {
    fontSize:16, textDecorationLine:'underline',
    color:'blue',
    fontWeight:'600',
    marginTop:10
  },
  delete: {
    fontSize:16, textDecorationLine:'underline',
    color:'black',
    fontWeight:'600',
    marginTop:10
  }
})