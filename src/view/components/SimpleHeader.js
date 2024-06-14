import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../../conts/Colors'

const SimpleHeader = ({ title, onpressLeft, onpressRight, fontsize }) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
            paddingHorizontal: 10,
            backgroundColor:COLORS.white
        }}>
            <View style={{
                flex: 1,
                // alignItems: 'center',
            }}>
                <TouchableOpacity onPress={onpressLeft}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: COLORS.light,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Ionicons name='arrow-back' size={20} color={COLORS.black} />
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 6,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor:COLORS.gray
            }}>
                <Text style={{
                    fontSize: fontsize ?? 25,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins-Regular',
                    color: COLORS.black
                }}>{title}</Text>
            </View>
            <View style={{
                flex: 1,
                alignItems: 'flex-end'
            }}>
                {onpressRight ?
                    <TouchableOpacity onPress={onpressRight}
                        style={{
                            alignSelf: 'flex-end',
                        }}
                    >
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            fontFamily: 'Poppins-Regular',
                            color: COLORS.white
                        }}>Skip</Text>
                    </TouchableOpacity>

                    : null}
            </View>
        </View>
    )
}

export default SimpleHeader

const styles = StyleSheet.create({})