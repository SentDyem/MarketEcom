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
import { current } from '@reduxjs/toolkit'


const Home = () => {
  const navigation = useNavigation()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(['all'])
  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const dispatch = useDispatch()
  const [images, setImages] = React.useState([
    "https://www.radio-tech.ru/upload/iblock/0fe/%D0%B0%D0%BA%D1%86%D0%B8%D1%8F.jpg",
    "https://img.global.news.samsung.com/ru/wp-content/uploads/2022/01/%D0%98%D0%BD%D1%84%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D0%BA%D0%B0-CES-award-of-monitor_RUS_upd-1-689x563.jpg",
    "https://secondhandstore.ru/wa-data/public/mailer/files/118/111111.jpg",
  ]);
  useEffect(() => {
    getProducts();
    getCategories();
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

  const getCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res=>res.json())
        .then(json=>{
          setCategories(current => [...current, ...json])
          console.log(categories)
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
        <View style = {{height:70, width:'100%', flex:1}}>
        <FlatList
            data={categories}
            renderItem={({item, index}) => {
              return(
              <TouchableOpacity style = {styles.categoryItem} onPress={()=> {
                setCurrentCategory(item)
              }}>
                <Text style = {styles.categoryText}>{item}</Text>
              </TouchableOpacity>
              )
              
            }}
            horizontal
          />
        </View>
        <View>
          <FlatList data={products.filter(data => currentCategory == 'all' ? data : data.category == currentCategory)} keyExtractor={(item) => item.id} renderItem={({ item, index }) => {
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
  categoryItem: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    margin:10,
    marginTop:15,
    padding: 10,
        borderWidth:0,
    borderRadius:10,
    borderColor:'white',
    backgroundColor: '#FFFFFF'
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    
  }
})