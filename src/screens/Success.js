import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Success = () => {
  const navigation = useNavigation()
  return (
    <View style = {styles.container}>
      <Image source={require('../images/check.png')} style = {styles.image}/>
      <Text style = {styles.title}>Ваш заказ успешно оплачен</Text>
      <TouchableOpacity style = {styles.title} onPress={() => {
        navigation.navigate("Main")
      }}>
        <Text style = {styles.titleText}>
          Закрыть
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Success

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',

  },
  image: {
    width:60, height:60,
  },
  title: {
    marginTop:10,
    fontSize: 15,
  },
  titleText: {
    fontSize: 20,
    color:'black',
     marginTop:20,
     padding: 15,
     borderRadius:20,
     borderColor:'gray',
     backgroundColor: '#007BFF',
     color: 'white'

  }

})