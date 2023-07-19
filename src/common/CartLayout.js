import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CartLayout = ({total}) => {
navigation = useNavigation()
  return (
    <View style={styles.checkoutView}>
        <Text style={styles.total}>{'Всего к оплате: ' + total + ' $'}</Text>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => {
          navigation.navigate("Checkout")
        }}>
          <Text style={styles.btnText}>Оплатить</Text>
        </TouchableOpacity>
      </View>
  )
}

export default CartLayout

const styles = StyleSheet.create({
    checkoutView: {
        backgroundColor: '#007BFF',
        height: 100,
        width: '100%',
        position: 'absolute',
        bottom: 0,
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
      }
})
