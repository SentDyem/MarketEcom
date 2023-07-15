import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Search from '../tabs/Search'
import Wishlist from '../tabs/Wishlist'
import Home from '../tabs/Home'
import Cart from '../tabs/Cart'
import User from '../tabs/User'

const Main = () => {
    const [activeTab, setActiveTab]=useState(0)
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
        {activeTab==0?(<Home/>):activeTab==1?(<Search/>):activeTab==2?(<Cart/>):activeTab==3?(<Wishlist/>):(<User/>)}
      <View style = {styles.bottomView}>
        <TouchableOpacity style={styles.tab} onPress={()=>{setActiveTab(0)}}>
            <Image source={require('../images/home.png')} style={[styles.tabIcon, {tintColor:activeTab==0?'blue':'black'}]}/>
            <Text>Главная</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={()=>{setActiveTab(1)}}>
            <Image source={require('../images/search.png')} style={[styles.tabIcon, {tintColor:activeTab==1?'blue':'black'}]}/>
            <Text>Каталог</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={()=>{setActiveTab(2)}}>
            <Image source={require('../images/shopping-cart.png')} style={[styles.tabIcon, {tintColor:activeTab==2?'blue':'black'}]}/>
            <Text>Корзина</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={()=>{setActiveTab(3)}}>
            <Image source={require('../images/heart.png')} style={[styles.tabIcon, {tintColor:activeTab==3?'blue':'black'}]}/>
            <Text>Избранное</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={()=>{setActiveTab(4)}}>
            <Image source={require('../images/user.png')} style={[styles.tabIcon, {tintColor:activeTab==4?'blue':'black'}]}/>
            <Text>Профиль</Text>
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