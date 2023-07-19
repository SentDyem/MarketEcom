import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import firestore from '@react-native-firebase/firestore'
import Loader from '../common/Loader'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addAddress } from '../redux/slices/AddressSlice'

const AddAddress = () => {
    const navigation = useNavigation()
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pin, setPin] = useState('')
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch();

    const saveAddress= () => {
        if (!street || !city || !state || !pin)
        {
          Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
        }
        else
        {
            dispatch(addAddress({street:street, state:state, city:city, pin:pin, id: uuid.v4()})), 
            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <TextInput value={street} onChangeText={(txt) => setStreet(txt)} style={styles.input} placeholder='Введите улицу' />
            <TextInput value={city} onChangeText={(txt) => setCity(txt)} style={styles.input} placeholder='Введите название города' />
            <TextInput value={state} onChangeText={(txt) => setState(txt)} style={styles.input} placeholder='Введите регион' />
            <TextInput value={pin} onChangeText={(txt) => setPin(txt)} style={styles.input} keyboardType='number-pad' placeholder='Введите почтовый индекс' />
            <TouchableOpacity style={styles.addNewBtn} onPress={() => { saveAddress() }}>
                <Text style={styles.btnText}>Сохранить</Text>
            </TouchableOpacity>
            <Loader visible={visible}/>
        </View>
    )
}

export default AddAddress

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20
    }, 
    addNewBtn: {
        backgroundColor: '#007BFF',
        height: 50,
        width: '90%',

        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    btnText: {
        color: 'white',
        fontSize: 16,

    }
})