import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import firestore from '@react-native-firebase/firestore'
import LoginSignupDialog from '../common/LoginSignupDialog'
import useForceUpdate from 'use-force-update';
import { ScrollView } from 'react-native-gesture-handler'
import { addItemToCart } from '../redux/slices/CartSlice'
import Header from '../common/Header'
import { useDispatch } from 'react-redux'


const ProductDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const cartId = uuid.v4();

    const checkLogin = async () => {
      let UserLoggedIn = false;
      let id = await AsyncStorage.getItem("USERID");
      
      if (id == null) {
        UserLoggedIn = false
        setVisible(true);
      }
      else {

        UserLoggedIn = true
        dispatch(addItemToCart(route.params.data))
      }
      return UserLoggedIn;
  
    }

  return (
    <View style = {styles.container}>
      <Header
        leftIcon={require('../images/home.png')}
        rightIcon={require('../images/shopping-cart.png')}
        title={''}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isMain={false}
      />
      <ScrollView>
      <View style = {{justifyContent:'center', alignItems:'center'}}>
        <Image style = {styles.productImage} source={{uri:route.params.data.image}} />
      <Text>{route.params.data.title}</Text>
      <Text>{route.params.data.description}</Text>
      <Text>{route.params.data.category}</Text> 
      <Text>{route.params.data.price}</Text>
      <Text>{route.params.data.rating.rate}</Text>             
        </View>
      
      
      </ScrollView>
      <TouchableOpacity style={styles.addNewBtn} onPress={() => { checkLogin() }}>
        <Text style={styles.btnText}>В корзину</Text>
      </TouchableOpacity>
      <LoginSignupDialog onClickLoginSign={() => { navigation.navigate("Login"); setVisible(false)}} onCancel={() => {
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