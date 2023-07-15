import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
        <Image source={require('../images/search.png')} style={styles.titleIcon}/>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:
  {
   width:'100%',
   height:65,
   backgroundColor:'white',
   elevation:5,
   justifyContent:'center',
   paddingLeft:20
  },
  titleIcon:{
    width:20,height:20
  }
})