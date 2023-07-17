import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const ProductDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
  return (
    <View style = {styles.container}>
        <View style = {{justifyContent:'center', alignItems:'center'}}>
        <Image style = {styles.productImage} source={{uri:route.params.data._data.productImage}} />
      <Text>{route.params.data._data.productName}</Text>
      <Text>{route.params.data._data.productDesc}</Text>
      <Text>{route.params.data._data.price}</Text>      
        </View>
      
      <TouchableOpacity style={styles.addNewBtn} onPress={() => {  }}>
        <Text style={styles.btnText}>В корзину</Text>
      </TouchableOpacity>
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