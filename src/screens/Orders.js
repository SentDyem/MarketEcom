import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const ordersList = useSelector(state => state.order)
    const getOrders = async () => {
        const userId = await AsyncStorage.getItem("USERID")
        firestore().collection('orders').where("data.userId", "==", userId).get().then(snapshot => {
            setOrders(snapshot.docs)
            console.log(snapshot.docs)
        })
    }
    useEffect(() => {
        getOrders()
    }, [])
    
    return (
        <View style={styles.container}>
            <FlatList data={orders} renderItem={({ index, item }) => {
                return (
                    <View style={styles.orderItem}>
                        <View>
                        
                        <Text style={styles.orderNumber}>Идентификатор заказа: {item._data.data.orderId}</Text>
                        <Text style={styles.orderDate}>Адрес доставки: {item._data.data.address}</Text>
                        <Text style={styles.orderTotal}>Общая стоимость: {item._data.data.amount}</Text>
                        <Text style={styles.orderStatus}>Статус: Заказ создан</Text>
                        </View>
                        
                    </View>
                    
                )
            }} />
            
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    orderItem: {
        flexDirection: 'row',
        width: '90%',
        height: 200,
        alignSelf: 'cnter',
        marginTop:20,
        backgroundColor:'white',
        alignItems: 'center',
        alignSelf:'center',
        justifyContent:'center',
        paddingLeft: 10,
        borderRadius: 10

    },
    itemImage: {
        width: 120,
        height:120,
        borderRadius: 20
    },
    orderNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      orderDate: {
        fontSize: 16,
        color: '#888',
        marginBottom: 8,},
        orderStatus: {
            fontSize: 16,
            color: '#007BFF',
            fontWeight: 'bold',
          },
          orderTotal: {
            fontSize: 16,
            color: '#333',
            marginBottom: 8,
          },
})