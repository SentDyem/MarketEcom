import { FlatList, StyleSheet, Text, TextInput, Touchable, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import SearchBar from '../common/Searchbar'

const Search = () => {
  const products = useSelector(state => state);
  const navigation= useNavigation()
  const [search, setSearch] = useState('')
  const [oldData, setOldData] = useState(products.product.data)
  const [searchedList, setSearchedList] = useState(oldData)
  const filterData = txt => {
    let newData = oldData.filter(item => {
      return item.title.toLowerCase().match(txt.toLowerCase())
    })
    console.log(newData);
    setSearchedList(newData)
  }

  return (
    <View style = {styles.container}>
      <SearchBar
        placeholder="Введите текст для поиска"
        onChangeText={txt => {setSearch(txt); filterData(txt)}}
        value ={search}
      />

      <FlatList data={searchedList} renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={styles.productItem} onPress={()=> {
              navigation.navigate("ProductDetail", {data:item})
            }}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.centerView}>
                <Text style={styles.name}>{item.title}</Text>
                <View style={styles.priceView}>
                </View>
              </View>
              <View style={styles.rightView}>
              </View>
            </TouchableOpacity>
          )
        }} />

    </View>
  )
}

export default Search

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