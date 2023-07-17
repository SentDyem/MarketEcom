import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'

const Orders = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getOrders()
    }, [])
    const getOrders = async () => {
        const userId = await AsyncStorage.getItem("USERID")
        firestore().collection('orders').where("addedBy", "==", userId).get().then(snapshot => {
            setOrders(snapshot.docs)
        })
    }
    return (
        <View style={styles.container}>
            <FlatList data={orders} renderItem={({ index, item }) => {
                return (
                    <View style={styles.orderItem}>
                        <View>
                        <Image source={{uri:item._data.productImage}} style = {styles.itemImage}/>
                        <Text>{item._data.address}</Text>
                        <Text>{item._data.productName}</Text>
                        <Text>{item._data.discountPrice}</Text>
                        <Text style = {{color:'blue'}}>{item._data.status?'Заказ создан':item._data.status}</Text>
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
    }
})