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
import Icon from 'react-native-vector-icons/Feather';


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
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/cross.png')}
        rightIcon={require('../images/shopping-cart.png')}
        title={''}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isMain={false}
      />
      <Image style={styles.productImage} source={{ uri: route.params.data.image }} />
      <ScrollView>
        <View style={styles.detailsContainer}>

          <Text style={styles.category}>{'Категория товара: ' + route.params.data.category}</Text>
          <Text style={styles.title}>{route.params.data.title}</Text>
          <View style={styles.ratingContainer}>
            <Image  source={require('../images/star.png')} />
            <Image  source={require('../images/star.png')} />
            <Image  source={require('../images/star.png')} />
            <Image  source={require('../images/star.png')} />
            <Image  source={require('../images/star.png')} />
            <Text style={styles.ratingText}>{route.params.data.rating.rate}</Text>
          </View>
          <Text style={styles.description}>{route.params.data.description}</Text>
          <Text style={styles.price}>{route.params.data.price}$</Text>
          <TouchableOpacity
      style={styles.arButton}
      onPress={() => {
        navigation.navigate("ARScreen");
      }}
    >
      <Text style={styles.btnText}>Перейти к AR экрану</Text>
    </TouchableOpacity>
        </View>


      </ScrollView>
      <TouchableOpacity style={styles.addNewBtn} onPress={() => { checkLogin() }}>
        <Text style={styles.btnText}>Добавить в корзину</Text>
      </TouchableOpacity>
      <LoginSignupDialog onClickLoginSign={() => { navigation.navigate("Login"); setVisible(false) }} onCancel={() => {
        setVisible(false)
      }} visible={visible} />
    </View>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  arButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  productImage: {
    width: 300,
    height: 200,
    resizeMode: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addNewBtn: {

    backgroundColor: '#007BFF',
    height: 50,
    width: '80%',
    position: 'absolute',
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 10
  },
  btnText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 8,
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'black'
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

})