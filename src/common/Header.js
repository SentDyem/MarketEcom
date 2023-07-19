import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');
const Header = ({
    title,
    leftIcon,
    rightIcon,
    onClickLeftIcon,
    onClickRightIcon,
    isMain,
}) => {
    const cartItems = useSelector(state => state.cart);
    let val = 3
    console.log(cartItems);
    const navigation = useNavigation();
    return (
        <View style={styles.header}>



            {!isMain && <View><TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    onClickLeftIcon();
                }}>
                <Image source={leftIcon} style={{height:18,width:18}} />
            </TouchableOpacity>
            </View>}
            {isMain && (
                <View></View>


            )}
            <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                        navigation.navigate('Cart');
                    }}>
                    <Image
                        source={rightIcon}
                        style={[styles.icon]}
                    />
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: '#007BFF',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ color: 'white' }}>{cartItems.data.length}</Text>
                    </View>
                </TouchableOpacity>
        </View>
    );
};

export default Header;
const styles = StyleSheet.create({
    header: {
        width: width,
        height: 55,

        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    btn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 25,
        height: 25,
        
    },
    title: {
        color: 'black',
        fontSize: 16,
    },
});