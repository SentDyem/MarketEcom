import { Dimensions, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginSignupDialog = ({onCancel, onClickLoginSign, visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style = {styles.modalView}>
        <View style = {styles.mainView}>
            <Text style = {styles.msg}>Хотите добавить товар в корзину? Авторизуйтесь</Text>
            <TouchableOpacity style={styles.loginSignupBtn} 
            onPress={()=>{
                onClickLoginSign()
            }}>
                <Text style = {styles.btnText}>Войти или зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.loginSignupBtn,{backgroundColor:'gray', marginBottom:40}]}
            onPress={()=>{
                onCancel()
            }}>
                <Text style = {styles.btnText}>Назад</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default LoginSignupDialog

const styles = StyleSheet.create({
    modalView:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'rgba(0,0,0,.5)',
        justifyContent:'center',
        alignItems:'center'

    },
    mainView:{
        width:'90%',
        backgroundColor:'white',borderRadius:10,
    },
    msg:{
       color:'black',
       width:'80%',
        alignSelf:'center',
        marginTop:20,
        fontSize:16,
        justifyContent:'center',
        textAlign:'center',
        
    },
    loginSignupBtn:{
        width:'90%',
        height:50,
        backgroundColor:'#007BFF',
        borderRadius:10,
        marginTop:30,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        fontSize:18,
        color:'white',
        fontWeight:'600'
}

})