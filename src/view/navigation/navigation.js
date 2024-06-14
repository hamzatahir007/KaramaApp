import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NavigationContainer, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import EmaiScreen from '../screens/EmaiScreen';
import CreatePassword from '../screens/CreatePassword';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="EmaiScreen" component={EmaiScreen} />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen name="CreatePassword" component={CreatePassword} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MyStack

const styles = StyleSheet.create({})