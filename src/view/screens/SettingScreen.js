import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import SimpleHeader from '../components/SimpleHeader'
import COLORS from '../../conts/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomeButton from '../components/CustomeButton'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'

const settingoptions = [
    {
        id: 1,
        name: 'Reset Password',
        tag: 'change password, reset password',
        leftIcon: <AntDesign name='key' size={20} color={COLORS.main} />
    },
    {
        id: 2,
        name: 'Terms and Conditions',
        tag: null,
        leftIcon: <AntDesign name='filetext1' size={20} color={COLORS.main} />
    },
    {
        id: 3,
        name: 'Privacy Policies',
        tag: null,
        leftIcon: <AntDesign name='eye' size={20} color={COLORS.main} />
    },
]


const SettingScreen = ({ navigation }) => {


    const ResetPassword = (props) => {
        // console.log(props);
        if (props?.id == '1') {
            navigation.navigate('ForgotPasswordOtp', { email: 'abc@abc.com', code:'111111' })
        }
        if (props?.id == '2') {
            navigation.navigate('TermAndCondition')
        }
        if (props?.id == '3') {
            navigation.navigate('PrivacyPolicy')
        }
    }


    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <View>
                <SimpleHeader title={'Setting'} fontsize={18} onpressLeft={() => navigation.goBack()} />

                <View style={{
                    backgroundColor: COLORS.white,
                    marginTop: 20,
                    marginHorizontal: 20,
                    borderRadius: 10
                }}>
                    <Text style={[styles.fonts, {
                        color: COLORS.black,
                        paddingTop: 20,
                        paddingBottom: 10,
                        textAlign: 'left',
                        paddingHorizontal: 10
                    }]}>
                        Cutomize
                    </Text>
                    {settingoptions?.map((item, i) => {
                        return (
                            <TouchableOpacity onPress={() => ResetPassword(item)} key={i} style={{
                                height: 70,
                                flexDirection: 'row',
                                alignItems: 'center',
                                // backgroundColor: 'red',
                                paddingHorizontal: 10
                            }}>
                                <View style={{
                                    width: '10%'
                                }}>
                                    <View style={{
                                        width: 40,
                                        height: 40,
                                        // width: '10%',
                                        // padding:10,
                                        backgroundColor: COLORS.light,
                                        borderRadius: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                        // padding:20
                                    }}>
                                        {item?.leftIcon}
                                    </View>
                                </View>
                                <View style={{
                                    width: '80%',
                                    paddingLeft: 10
                                }}>
                                    <Text style={[styles.fonts, {
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        paddingHorizontal: 10
                                    }]}>
                                        {item?.name}
                                    </Text>
                                    {item?.tag &&
                                        <Text style={[styles.fonts, {
                                            color: COLORS.gray,
                                            fontWeight: 'normal',
                                            fontSize: 12,
                                            textAlign: 'left',
                                            paddingHorizontal: 10
                                        }]} numberOfLines={1}>
                                            {item?.tag}
                                        </Text>}
                                </View>
                                <View>
                                    <AntDesign name='right' size={20} color={COLORS.mainlight} />
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    fonts: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        color: COLORS.white
    }
})