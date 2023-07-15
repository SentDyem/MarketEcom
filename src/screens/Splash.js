import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation= useNavigation()
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate("Main")
        },2000)
    },[])
  return (
    <View style={styles.container}>
        <Image source={require('../images/samsung-logo-icon-7.png')} style={styles.logo}/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
   container:
   {
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
   },
   logo:
   {
    width:125,height:125
   }
})