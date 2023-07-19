import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchEventType } from 'react-native-gesture-handler/lib/typescript/TouchEventType'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, reduceItemFromCart, removeItemFromCart } from '../redux/slices/CartSlice'
import CartLayout from '../common/CartLayout'

const Cart = () => {
  const navigation = useNavigation()
  const items = useSelector(state => state.cart)
  const [cartList, setCartList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    setCartList(items.data)
  }, [items])

  getTotal = () => {
    let total = 0
    cartList.map(item=>{
      total = total+item.qty*item.price
    })
    return total
  }

  return (
    <View style={styles.container}>
      
      {cartList.length > 0?(<View>
        <FlatList data={cartList} renderItem={({ item, index }) => {
          return (
            <View style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.centerView}>
                <Text style={styles.name}>{item.title.length > 2 ? item.title.substring(0, 30) + '...' : item.title}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.discountPrice}>{item.price + ' $'}</Text>
                </View>
              </View>
              <View style={styles.rightView}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.addToCart} onPress={() => { if (item.qty > 1) {
                    dispatch(reduceItemFromCart(item))
                  }
                  else {
                    dispatch(removeItemFromCart(index))
                  } }}>-</Text>
                  <Text style={[styles.addToCart, { marginRight: 5, marginLeft: 5 }]} onPress={() => { }}>{item.qty}</Text>
                  <Text style={styles.addToCart} onPress={() => { dispatch(addItemToCart(item)) }}>+</Text>
                </View>
              </View>
            </View>
          )
        }} />
      </View>):(
        <View style = {[styles.container,{justifyContent:'center', alignItems:'center',}]}>
          <Text>Ваша корзина пуста</Text>
        </View>)}


      {cartList.length > 0 && <CartLayout total = {getTotal()}/>}
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  productItem: {
    width: Dimensions.get('window').width - 20,
    height: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginLeft: 10
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  desc: {

  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  price: {
    marginLeft: 10,
    fontSize: 16,
    textDecorationLine: 'line-through'
  },
  discountPrice: {
    color: '#007BFF',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '600'
  },
  centerView: { marginLeft: 10, width: '40%' },
  rightView: {
    marginLeft: 10,
    alignItems: 'center'
  },
  icon: {
    width: 20, height: 20
  },
  addToCart: {
    padding: 10,
    fontWeight: '600',
    marginTop: 10,
    borderRadius: 10,
    fontSize: 20,
    color:'black'
  },
  
})