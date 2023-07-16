import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchEventType } from 'react-native-gesture-handler/lib/typescript/TouchEventType'
import { useIsFocused, useNavigation } from '@react-navigation/native'

const Checkout = () => {
    const navigation = useNavigation()
    const [cartList, setCartList] = useState([])
    const [selectedAddress, setSelectedAddress] = useState('')
    const isFocused = useIsFocused()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const id = await AsyncStorage.getItem("USERID")
        firestore().collection("cart").where("addedBy", "==", id).get().then(
            snapshot => {
                setCartList(snapshot.docs)

            })
    }

    useEffect(() => {
        getAddress()
      }, [isFocused])
    
      const getAddress = async () => {
        const id = await AsyncStorage.getItem('USERID')
        firestore().collection("address").where("addedBy", "==", id).get().then(snapshot => {
          if (snapshot.docs != []) {
            snapshot.docs.map(item=>{
                if (item._data.default==true)
                {
                    setSelectedAddress(""+item._data.street+", "+item._data.city+", "+item._data.state+", "+item._data.pin)
                }
            })
          }
        })
      }

    const increaseQty = (item) => {
        firestore().collection('cart').doc(item._data.cartId).update({ qty: item._data.qty + 1 }).then(res => {
        }).catch(error => { console.log(error) })
        getData()
    }

    const decreaseQty = (item) => {
        if (item._data.qty > 1) {
            firestore().collection('cart').doc(item._data.cartId).update({ qty: item._data.qty - 1 }).then(res => {
            }).catch(error => { console.log(error) })
            getData()
        }
        else {
            firestore().collection('cart').doc(item._data.cartId).delete()
            getData()
        }

    }

    const getTotal = () => {
        let temp = cartList;
        let total = 0
        temp.map(item => {
            total = total + parseInt(item._data.discountPrice * item._data.qty)
        })
        return total;
    }

    const getQty = () => {
        let temp = cartList;
        let qty = 0
        temp.map(item => {
            qty = qty + parseInt(item._data.qty)
        })
        return qty;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Товары к оплате</Text>
            <View>
                <FlatList data={cartList} renderItem={({ item, index }) => {
                    return (
                        <View style={styles.productItem}>
                            <Image source={{ uri: item._data.productImage }} style={styles.productImage} />
                            <View style={styles.centerView}>
                                <Text style={styles.name}>{item._data.productName}</Text>
                                <View style={styles.priceView}>
                                    <Text style={styles.discountPrice}>{item._data.discountPrice + '₽'}</Text>
                                    <Text style={styles.price}>{item._data.price}</Text>
                                </View>
                            </View>
                            <View style={styles.rightView}>
                                <TouchableOpacity onPress={() => { checkLogin(item) }}>
                                    <Image source={require('../images/heart.png')} style={styles.icon} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.addToCart} onPress={() => { decreaseQty(item) }}>-</Text>
                                    <Text style={[styles.addToCart, { marginRight: 5, marginLeft: 5 }]} onPress={() => { checkLogin(item) }}>{item._data.qty}</Text>
                                    <Text style={styles.addToCart} onPress={() => { increaseQty(item) }}>+</Text>
                                </View>
                            </View>
                        </View>
                    )
                }} />
            </View>
            <View style={styles.totalView}>
                <Text style={styles.title}>{'Количество: ' + getQty()}</Text>
                <Text style={styles.title}>{'Общая сумма: ' + getTotal() + 'руб.'}</Text>
            </View>
            <View style={styles.totalView}>
                <Text style={styles.title}>{'Адрес доставки'}</Text>
                <Text style={[styles.title,{textDecorationLine:'underline', color:'blue'}]} onPress={()=>{
                    navigation.navigate("MyAddress")
                }}>{'Изменить адрес'}</Text>
            
            </View>
            <Text style = {styles.address}>{selectedAddress==''?'Адрес не выбран':selectedAddress}</Text>
            <TouchableOpacity style = {styles.payBtn}>
                <Text style = {styles.btnText}>Оплатить</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productItem: {
        width: Dimensions.get('window').width - 50,
        height: 100,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginLeft: 10
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
    },
    desc: {

    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        marginLeft: 10,
        fontSize: 16,
        textDecorationLine: 'line-through'
    },
    discountPrice: {
        color: 'blue',
        fontSize: 20,
        marginLeft: 10,
        fontWeight: '600'
    },
    centerView: { marginLeft: 10, width: '40%' },
    rightView: {
        marginLeft: 10,
        alignItems: 'center'
    },
    icon: {
        width: 20, height: 20
    },
    addToCart: {
        padding: 10,
        borderWidth: 1,
        fontWeight: '600',
        marginTop: 10,
        borderRadius: 10,
        fontSize: 16
    },
    checkoutView: {
        backgroundColor: 'blue',
        height: 100,
        width: '100%',
        position: 'absolute',
        bottom: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    total: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    checkoutBtn: {
        height: 45,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20, paddingRight: 20
    },
    btnText: {
        fontSize: 18, fontWeight: '600',
        color: 'black'
    },
    heading: {
        fontSize: 26,
        fontWeight: '600',
        color: 'black',
        marginLeft: 12,
        marginTop: 20
    },
    totalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black'
    },
    address:{
        marginLeft:20,
        marginTop:20,
        
    },
    payBtn: {
        width: '90%',
        height:50,
        borderRadius:10,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:30,
    },
    btnText: {
        color:'white'
    }
})