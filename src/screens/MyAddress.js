import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress } from '../redux/slices/AddressSlice'
const MyAddress = () => {

  const navigation = useNavigation()
  const [addressList, setAddressList] = useState([])
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  useEffect(() => {
    getAddress()
  }, [isFocused])

  const getAddress = async () => {
    const id = await AsyncStorage.getItem('USERID')
    firestore().collection("address").where("userId", "==", id).get().then(snapshot => {
      if (snapshot.docs != []) {
        setAddressList(snapshot.docs)
        console.log(snapshot.docs)
      }
    })}

    const deleteAddress = async (item) => {
      firestore().collection("address").doc(item._data.addressId).delete()
      getAddress()
    }

  

  const setDefault = async(item)=> {
    await AsyncStorage.setItem('MY_ADDRESS',''+item._data.street+','+item._data.city+','+item._data.state+','+item._data.pin)
    navigation.goBack()
  }



  return (
    <View style={styles.container}>
      <FlatList data={addressList} renderItem={({ item, index }) => {
        return (
          <TouchableOpacity style={styles.addressItem} onPress ={()=> {
setDefault(item)
          }}>
            <View>
              <Text>{"Улица: " + item._data.street}</Text>
              <Text>{"Город: " + item._data.city}</Text>
              <Text>{"Регион: " + item._data.state}</Text>
              <Text>{"Почтовый индекс: " + item._data.pin}</Text>
            </View>
            <View style = {{alignItems:'center'}}>
              <TouchableOpacity>
              <Text style={styles.delete} onPress={()=> {
                deleteAddress(item)
              }}>Удалить</Text>
              </TouchableOpacity>

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
    backgroundColor: '#007BFF',
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
    backgroundColor: '#007BFF',
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