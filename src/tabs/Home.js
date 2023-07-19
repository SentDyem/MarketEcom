import { Alert, Dimensions, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginSignupDialog from '../common/LoginSignupDialog'
import { useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import { useDispatch } from 'react-redux'
import { addProducts } from '../redux/slices/ProductsSlice'
import { SliderBox } from "react-native-image-slider-box";


const Home = () => {
  const navigation = useNavigation()
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const [images, setImages] = React.useState([
    "https://a.storyblok.com/f/156985/600x295/cd6b7da7c3/flash-sale.png",
    "https://img.pikbest.com/backgrounds/20191112/black-friday-sale-gold-background-with-balloons-sale-promo-banner-modern-design-layout-v_1594264jpg!w700wp",
    "https://www.crushpixel.com/big-static16/preview4/summer-sale-with-paper-cut-2430421.jpg",
  ]);
  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        json.map(item => {
          item.qty = 1
        })
        dispatch(addProducts(json));
      })


  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <SliderBox
          images={images}
          sliderBoxHeight={200}
          dotColor="blue"
          inactiveDotColor="white"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
        />
        <Text style = {styles.categoryTitle}>Последние поступления</Text>
        <View>
          <FlatList data={products} keyExtractor={(item) => item.id} renderItem={({ item, index }) => {
            return (
              <TouchableOpacity style={styles.productItem} onPress={() => {
                navigation.navigate("ProductDetail", { data: item })
              }}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                </View>
                  <Text style={styles.name}>{item.title.length > 2 ? item.title.substring(0, 30) + '...' : item.title}</Text>
                  
                 
                    <Text style={styles.priceView}>{item.price + ' $'}</Text>

              </TouchableOpacity>
            )
          }} numColumns={2}
            contentContainerStyle={styles.flatListContent} />
        </View>
      </ScrollView>

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
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    marginBottom: 16,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  desc: {

  },
  priceView: {
    fontSize: 18,
    color: '#007BFF',
    fontWeight: 'bold',
    marginTop: 8,
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
    borderWidth: 1,
    fontWeight: '600',
    marginTop: 10,
    borderRadius: 10
  },
  flatListContent: {
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    marginTop:20,
    marginLeft:10
  },
})