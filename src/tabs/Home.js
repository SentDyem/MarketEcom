import { Alert, Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginSignupDialog from '../common/LoginSignupDialog'
import { useNavigation } from '@react-navigation/native'
const Home = () => {
  const navigation = useNavigation()
  const [products, setProducts] = useState([])
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    getProducts()
  }, [])
  const getProducts = () => {
    firestore().collection("products").get().then(snapshot => {
      if (snapshot.docs != []) {
        setProducts(snapshot.docs)
      }
    }
    )
  }
  const checkLogin = async () => {
    let id = await AsyncStorage.getItem("USERID");
    if (id != null) {

    }
    else {
      setVisible(true)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../images/search.png')} style={styles.titleIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList data={products} renderItem={({ item, index }) => {
          return (
            <View style={styles.productItem}>
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
                <TouchableOpacity onPress={() => {checkLogin()}}>
                  <Image source={require('../images/heart.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.addToCart} onPress={() => {checkLogin()}}>В корзину</Text>
              </View>
            </View>
          )
        }} />
        
      </View>
      <LoginSignupDialog onClickLoginSign={()=>{navigation.navigate("Login")}} onCancel={()=>{
        setVisible(false)
      }} visible = {visible}/>
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