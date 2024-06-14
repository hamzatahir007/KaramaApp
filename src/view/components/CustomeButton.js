import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../conts/Colors'

const CustomeButton = ({ title, onpress, bgcolor, txtcolor, width, bheight, txtsize ,borderWith, borderColor}) => {
    return (
        <TouchableOpacity
            onPress={onpress}
            style={{
                backgroundColor: bgcolor ?? COLORS.main,
                width: width ?? '100%',
                height: bheight ?? 50,
                borderRadius: 30,
                borderWidth:borderWith ?? 0,
                borderColor: borderColor ?? COLORS.main,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text style={{
                fontSize: txtsize ?? 16,
                color: txtcolor ?? COLORS.white
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomeButton

const styles = StyleSheet.create({})