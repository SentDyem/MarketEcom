import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from '../screens/Splash'
import Main from './Main'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Checkout from '../screens/Checkout'
import MyAddress from '../screens/MyAddress'
import AddAddress from '../screens/AddAddress'
import Success from '../screens/Success'
import Orders from '../screens/Orders'
import ProductDetail from '../screens/ProductDetail'
import Cart from '../screens/Cart'
import ARScreen from '../screens/ARScreen'

const Stack = createStackNavigator()
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name='Main' component={Main} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name='MyAddress' component={MyAddress} options={{headerShown:true}}/>
        <Stack.Screen name='Checkout' component={Checkout} options={{headerShown:true}}/>
        <Stack.Screen name='AddAddress' component={AddAddress} options={{headerShown:true}}/>
        <Stack.Screen name='Cart' component={Cart} options={{headerShown:true}}/>
        <Stack.Screen name='Success' component={Success} options={{headerShown:false}}/>
        <Stack.Screen name='Orders' component={Orders} options={{headerShown:true}}/>
        <Stack.Screen name='ProductDetail' component={ProductDetail} options={{headerShown:false}}/>
        <Stack.Screen name='ARScreen' component={ARScreen} options={{headerShown:true}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator