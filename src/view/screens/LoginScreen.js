import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ToastAndroid, Switch, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
const { width, height } = Dimensions.get('window')
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import COLORS from '../../conts/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'

const icons = ['google', 'apple1', 'android1', 'windows', 'github', 'facebook-square'];
const iconsTap = [require('../../assets/dog.png'), require('../../assets/bear.png'), require('../../assets/pen.png'), require('../../assets/fider.png'), require('../../assets/rainbow.png'), require('../../assets/scoty.png')];



const LoginScreen = ({ navigation }) => {
    const getIconStyle = (index, total, radius) => {
        const angle = (index / total) * (2 * Math.PI);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        return {
            position: 'absolute',
            left: radius + x - 20,
            top: radius + y - 20,
        };
    };

    const radius = (width - 100) / 2; // 20 padding on each side

    return (
        <ImageBackground source={require('../../assets/bgimage.png')} resizeMode='cover' style={styles.background}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/logo.png')} resizeMode='contain' style={styles.logo} />
            </View>
            <View style={styles.circleContainer}>
                <View style={[styles.circle, { width: radius * 2, height: radius * 2, borderRadius: radius }]}>
                    {iconsTap.map((icon, index) => (
                        <View key={index} style={[styles.iconContainer, getIconStyle(index, icons.length, radius)]}>
                            <Image source={icon} resizeMode='contain' style={{
                                width: 40,
                                height: 40
                            }} />
                        </View>
                        // <View key={icon} style={[styles.iconContainer, getIconStyle(index, icons.length)]}>
                        //     <AntDesign name={icon} size={40} color="white" />
                        // </View>
                    ))}
                    <View style={styles.textContainer}>
                        <Text style={styles.circleText}>Making Childcare Social</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.iconButton}>
                    <AntDesign name='google' size={30} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <AntDesign name='apple1' size={30} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.emailButton} onPress={() => navigation.navigate('EmaiScreen')}> 
                    <Text style={styles.emailButtonText}>Enter Email</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 140,
    },
    circleContainer: {
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
    },
    textContainer: {
        position: 'absolute',
        width: 200
    },
    circleText: {
        fontSize: 30,
        color: COLORS.white,
        fontWeight: 'black',
        textAlign: 'center',
        fontFamily: 'Fraunces_9pt_Soft-Bold'
    },
    footer: {
        height: '10%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
    },
    iconButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailButton: {
        width: '65%',
        height: 50,
        elevation: 9,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    emailButtonText: {
        fontSize: 14,
        color: COLORS.black,
        fontFamily: 'Poppins-Medium'
    },
})