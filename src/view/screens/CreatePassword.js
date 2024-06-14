import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../conts/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomeButton from '../components/CustomeButton'
import { Checkbox } from 'react-native-paper'

const CreatePassword = () => {
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
                       Create Password
                    </Text>
                </View>

                <View>
                    <TextInput
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder='Password'
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
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: 'Poppins',
                        color: COLORS.gray,
                        fontSize: 12,
                        textAlign:'center'
                    }}>
                        By continuing, it means you have read and accepted our <Text style={{color:COLORS.main}}>Terms of Service and Privacy Policy</Text>
                    </Text>
                </View>
                <View>
                    <CustomeButton title={'Next'} onpress={() => navigation.navigate('OtpScreen', { email: email, code: '111111' })} />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default CreatePassword

const styles = StyleSheet.create({})