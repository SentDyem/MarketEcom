import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Search from '../tabs/Search'
import Wishlist from '../tabs/Wishlist'
import Home from '../tabs/Home'
import Cart from '../screens/Cart'
import User from '../tabs/User'
import Header from '../common/Header'
import { useNavigation } from '@react-navigation/native'

const Main = () => {
    const [activeTab, setActiveTab]=useState(0)
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
        <Header 
        leftIcon={require('../images/home.png')}
        rightIcon={require('../images/shopping-cart.png')}
        title={''}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isMain={true}
        />
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
        {activeTab==0?(<Home/>):activeTab==1?(<Search/>):activeTab==2?(<Cart/>):activeTab==3?(<Wishlist/>):(<User/>)}
      <View style = {styles.bottomView}>
        <TouchableOpacity style={styles.tab} onPress={()=>{setActiveTab(0)}}>
            <Image source={require('../images/home.png')} style={[styles.tabIcon, {tintColor:activeTab==0?'#007BFF':'black'}]}/>
            <Text style = {{fontSize:12, marginTop:2}}>Главная</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={()=>{setActiveTab(1)}}>
            <Image source={require('../images/search.png')} style={[styles.tabIcon, {tintColor:activeTab==1?'#007BFF':'black'}]}/>
            <Text style = {{fontSize:12, marginTop:2}}>Каталог</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={()=>{setActiveTab(4)}}>
            <Image source={require('../images/user.png')} style={[styles.tabIcon, {tintColor:activeTab==4?'#007BFF':'black'}]}/>
            <Text style = {{fontSize:12, marginTop:2}}>Профиль</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    bottomView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        height:80,
        width:'100%',
        position:'absolute',
        bottom:0,
        backgroundColor:'white',
        elevation:5,
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    tab:{
        width:'20%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    tabIcon:{
        width:25,height:25
    },
})