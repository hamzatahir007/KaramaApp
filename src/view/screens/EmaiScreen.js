import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../conts/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomeButton from '../components/CustomeButton'
import { Checkbox } from 'react-native-paper'

const EmaiScreen = ({ navigation }) => {
    const [email, setEmail] = useState(null)
    const [check, setCheck] = useState(true)

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white,
            padding: 20
            // alignItems:'center',
            // justifyContent:'center'
        }}>
            <View style={{
                height: '80%'
            }}>
                <AntDesign name='close' color={COLORS.black} size={20} />
                <View style={{
                    paddingTop: 20,
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: COLORS.black,
                        fontFamily: 'Poppins',
                        fontWeight: 'bold'
                    }}>
                        What's your email?
                    </Text>
                </View>

                <View>
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder='Email Address'
                        placeholderTextColor={COLORS.gray}
                        style={{
                            width: '100%',
                            borderBottomWidth: 1,
                            color: COLORS.black,
                            borderColor: COLORS.gray2,
                            // backgroundColor:COLORS.light,
                            height: 60
                        }}
                    />
                </View>
            </View>

            <View style={{
                height: '20%'
            }}>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center'
                }}>
                    <Checkbox
                        status={check ? 'checked' : 'unchecked'}
                        onPress={() => setCheck(true)}
                        color={COLORS.main}
                    />
                    <Text style={{
                        fontFamily:'Poppins',
                        color:COLORS.gray,
                        fontSize:12
                    }}>
                    I would like to receive updates and news from Karama
                    </Text>
                </View>
                <View>
                    <CustomeButton title={'Next'} onpress={() => navigation.navigate('OtpScreen' , {email:email , code:'111111'})} />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default EmaiScreen

const styles = StyleSheet.create({})