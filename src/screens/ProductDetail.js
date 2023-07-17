import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const ProductDetail = () => {
    const navigation = useNavigation()
    const route = useRoute()
  return (
    <View style = {styles.container}>
      <Text>ProductDetail</Text>
      <Image source={{uri:route.params.data._data.productImage}} />
      <Text>{route.params.data._data.price}</Text>
    </View>
  )
}

export default ProductDetail

const styles = StyleSheet.create({

})