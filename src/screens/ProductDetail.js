import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import firestore from '@react-native-firebase/firestore'
import LoginSignupDialog from '../common/LoginSignupDialog'
import useForceUpdate from 'use-force-update';


const ProductDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [visible, setVisible] = useState(false)
    const [prod, setProd] = useState(false)
    const cartId = uuid.v4();
    

    const checkLogin = async (item) => {
      
      let id = await AsyncStorage.getItem("USERID");
      
      if (id != null) {
        firestore().collection("cart").where("addedBy", "==", id).get().then(snapshot => {
          if (snapshot.docs.length > 0) {
            snapshot.docs.map(x => {
              if (x._data.productID == item._data.productID) {
                
                firestore().collection('cart').doc(x._data.cartId).update({qty: x._data.qty+1}).then(res => {
                }).catch(error => { console.log(error) })
              }
              else {

                firestore().collection('cart').doc(cartId).set({ ...item._data, addedBy: id, qty: 1, cartId: cartId }).then(res => {
                }).catch(error => { console.log(error) })
              }
            })
          }
          else {
            firestore().collection('cart').doc(cartId).set({ ...item._data, addedBy: id, qty: 1, cartId: cartId }).then(res => {
            }).catch(error => { console.log(error) })
           }
        }
        )
  
      }
      else {
        setVisible(true);
      }
  
    }

  return (
    <View style = {styles.container}>
        <View style = {{justifyContent:'center', alignItems:'center'}}>
        <Image style = {styles.productImage} source={{uri:route.params.data._data.productImage}} />
      <Text>{route.params.data._data.productName}</Text>
      <Text>{route.params.data._data.productDesc}</Text>
      <Text>{route.params.data._data.price}</Text> 
      <Text>{route.params.data._data.productID}</Text>         
        </View>
      
      <TouchableOpacity style={styles.addNewBtn} onPress={() => { checkLogin(route.params.data) }}>
        <Text style={styles.btnText}>В корзину</Text>
      </TouchableOpacity>
      <LoginSignupDialog onClickLoginSign={() => { navigation.navigate("Login") }} onCancel={() => {
        setVisible(false)
      }} visible={visible} />
    </View>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode:'center'
    },
    addNewBtn: {
        backgroundColor: 'blue',
        height: 50,
        width: '80%',
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

})