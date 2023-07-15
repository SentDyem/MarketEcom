import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Splash from '../screens/Splash'
import Main from './Main'
const stack = createStackNavigator()
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
        <stack.Screen name='Main' component={Main} options={{headerShown:false}}/>
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator