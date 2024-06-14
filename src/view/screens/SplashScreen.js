import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import COLORS from '../../conts/Colors'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = ({ navigation }) => {
    const focus = useNavigation()


    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('LoginScreen')
        }, 3000)
    }, [focus]);

    return (
        <ImageBackground source={require('../../assets/bgimage.png')} resizeMode='cover' style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }} >
            <Image source={require('../../assets/logoicon.png')} resizeMode='contain' style={{
                width: 100,
                height: 100
            }} />
        </ImageBackground>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})