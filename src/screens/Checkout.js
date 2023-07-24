import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchEventType } from 'react-native-gesture-handler/lib/typescript/TouchEventType'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import RazorpayCheckout from 'react-native-razorpay';
import uuid from 'react-native-uuid'
import { useDispatch, useSelector } from 'react-redux'
import { orderItem } from '../redux/slices/OrderSlice';
import { emptyCart } from '../redux/slices/CartSlice'

const Checkout = () => {
    const navigation = useNavigation()
    const items = useSelector(state => state.cart)
    const [cartList, setCartList] = useState([])
    const [selectedAddress, setSelectedAddress] = useState('')
    const [userId, setUserId] = useState('')
    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    useEffect(() => {
        setCartList(items.data)
    }, [items])
    useEffect(() => {
        getSelectedAddress()
    }, [isFocused])
    useEffect(() => {
        getUserId()
    }, [])
    const getSelectedAddress = async () => {
        setSelectedAddress(await AsyncStorage.getItem('MY_ADDRESS'))
    }
    const getUserId = async () => {
        setUserId(await AsyncStorage.getItem('USERID'))
        console.log(userId)
    };

    const orderPlace = async (paymentId) => {
        let orderUuid = uuid.v4();
        const day = new Date().getDate()
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()
        const hours = new Date().getMinutes()
        const minutes = new Date().getMinutes()
        const data = {
            items: cartList,
            amount: '$' + getTotal(),
            address: selectedAddress,
            paymentId: paymentId,
            userId: userId,
            orderId: orderUuid,
            createdAt:
                day +
                '/' +
                month +
                '/' +
                year +
                ' ' +
                hours +
                ':' +
                minutes,
                status: 'created',
        }
        //dispatch(orderItem(data))
        dispatch(emptyCart([]))
        navigation.navigate("Success")
        console.log(data)

        firestore()
            .collection('orders').doc(data.orderId).set({ data }).then(() => { console.log('User added!'); });
    };

    const getTotal = () => {
        let temp = cartList;
        let total = 0
        temp.map(item => {
            total = total + parseInt(item.price * item.qty)

        })
        return total;
    };

    const Pay = () => {
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'USD',
            key: 'rzp_test_ScTp5WyKibY9G3', // Your api key
            amount: getTotal() * 100,
            name: 'foo',
            prefill: {
                email: 'void@razorpay.com',
                contact: '9191919191',
                name: 'RazorPay Software'
            },
            theme: { color: 'blue' }
        }
        RazorpayCheckout.open(options).then((data) => {
            orderPlace(data.razorpay_payment_id)
        }).catch((error) => {
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    const getQty = () => {
        let temp = cartList;
        let qty = 0
        temp.map(item => {
            qty = qty + parseInt(item.qty)
        })
        return qty;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Товары к оплате</Text>
            <View>
                <FlatList data={cartList} renderItem={({ item, index }) => {
                    return (
                        <View style={styles.productItem}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View style={styles.centerView}>
                                <Text style={styles.name}>{item.title.length > 2 ? item.title.substring(0, 30) + '...' : item.title}</Text>
                                <View style={styles.priceView}>
                                    <Text style={styles.discountPrice}>{item.price + '$'}</Text>
                                </View>
                            </View>
                            <View style={styles.rightView}>
                                <View style={{ flexDirection: 'row' }}>

                                    <Text style={[styles.addToCart, { marginRight: 5, marginLeft: 5 }]} onPress={() => { }}>{item.qty + ' ед.'}</Text>

                                </View>
                            </View>
                        </View>
                    )
                }} />
            </View>
            <View style={styles.totalView}>
                <Text style={styles.title}>{'Количество: ' + getQty()}</Text>
                <Text style={styles.title}>{'Общая сумма: ' + getTotal() + '$'}</Text>
            </View>
            <View style={styles.totalView}>
                <Text style={styles.title}>{'Адрес доставки'}</Text>
                <Text style={[styles.title, { textDecorationLine: 'underline', color: 'blue' }]} onPress={() => {
                    navigation.navigate("MyAddress")
                }}>{'Изменить адрес'}</Text>

            </View>
            <Text style={styles.address}>{selectedAddress == '' ? Alert.alert('Выберите адрес доставки') : selectedAddress}</Text>
            <TouchableOpacity style={styles.payBtn} onPress={() => {
                if (selectedAddress == null) {
                    Alert.alert('Вы не указали адрес')
                }
                else {
                    Pay()
                }

            }}>
                <Text style={styles.btnText}>Оплатить</Text>
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
        color: '#007BFF',
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
        fontWeight: '600',
        marginTop: 10,
        borderRadius: 10,
        fontSize: 16,
    },
    checkoutView: {
        backgroundColor: '#007BFF',
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
    address: {
        marginLeft: 20,
        marginTop: 20,

    },
    payBtn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
    },
    btnText: {
        color: 'white'
    }
})