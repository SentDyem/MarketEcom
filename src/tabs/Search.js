import { FlatList, StyleSheet, Text, TextInput, Touchable, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore'

const Search = () => {
  const [products, setProducts] = useState([])
  const getProducts = (search) => {
    firestore().collection("products").where("productName", "==", search).get().then(snapshot => {
      if (snapshot.docs != []) {
        setProducts(snapshot.docs)
      }
    }
    )
  }
  return (
    <View>
      <TextInput placeholder='' onChangeText={txt => getProducts(txt)}/>

      <FlatList data={products} renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={styles.productItem} onPress={()=> {
              navigation.navigate("ProductDetail", {data:item})
            }}>
              <Image source={{ uri: item._data.productImage }} style={styles.productImage} />
              <View style={styles.centerView}>
                <Text style={styles.name}>{item._data.productName}</Text>
                <Text style={styles.desc}>{item._data.addedBy}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.discountPrice}>{item._data.discountPrice + '₽'}</Text>
                  <Text style={styles.price}>{item._data.price}</Text>
                </View>
              </View>
              <View style={styles.rightView}>
                <TouchableOpacity onPress={() => { checkLogin(item) }}>
                  <Image source={require('../images/heart.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.addToCart} onPress={() => { checkLogin(item) }}>В корзину</Text>
              </View>
            </TouchableOpacity>
          )
        }} />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})