import { Alert, Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginSignupDialog from '../common/LoginSignupDialog'
import { useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import { useDispatch } from 'react-redux'
import { addProducts } from '../redux/slices/ProductsSlice'

const Home = () => {
  const navigation = useNavigation()
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {
              setProducts(json);
              json.map(item => {
                item.qty = 1
              })
            dispatch(addProducts(json));
            })
              

  }

  return (
    <View style={styles.container}>
      <View>
        <FlatList data={products} renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={styles.productItem} onPress={()=> {
              navigation.navigate("ProductDetail", {data:item})
            }}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.centerView}>
                <Text style={styles.name}>{item.title.length > 2 ? item.title.substring(0, 30) + '...' : item.title}</Text>
                <Text style={styles.desc}></Text>
                <View style={styles.priceView}>
                  <Text style={styles.discountPrice}>{item.price + '₽'}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }} />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header:
  {
    width: '100%',
    height: 65,
    backgroundColor: 'white',
    elevation: 5,
    justifyContent: 'center',
    paddingLeft: 20
  },
  titleIcon: {
    width: 20, height: 20
  },
  productItem: {
    width: Dimensions.get('window').width - 50,
    height: 150,
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
    color: 'blue',
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
    borderWidth: 1,
    fontWeight: '600',
    marginTop: 10,
    borderRadius: 10
  }
})