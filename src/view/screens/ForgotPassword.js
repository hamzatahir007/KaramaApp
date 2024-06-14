import { SafeAreaView, StyleSheet, Text, View, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { ActivityIndicator } from 'react-native-paper'
import SimpleHeader from '../components/SimpleHeader'
import CustomeButton from '../components/CustomeButton'
import { Base_uri } from '../../conts/Base_uri'
import COLORS from '../../conts/Colors'
import LoginInput from '../components/LoginInput'

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState({
    error: false,
    value: null
  })

  const [loading, setLoading] = useState(false);

  function generateOTP() {
    const otpLength = 6;
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }
  const onSendVerifyEmail = async () => {
    const EMAIL_REGEX = /@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (!email?.value || !email?.value === EMAIL_REGEX.test(email?.value)) {
      if (!email?.value) {
        ToastAndroid.show(`Please enter your email address`, ToastAndroid.SHORT);
        setEmail({ ...email, error: true })
        return
      }
      if (!email?.value === EMAIL_REGEX.test(email?.value)) {
        ToastAndroid.show(`Invalid email. Please enter valid email address`, ToastAndroid.SHORT);
        setEmail({ ...email, error: true })
        return
      }
    }
    else {
      setLoading(true)
      const otp = await generateOTP(); // Generate OTP
      const credential = { email: email?.value.toLowerCase(), otp: otp, timeStamp: new Date() }
      await AsyncStorage.setItem("OtpStore", JSON.stringify(credential));
      navigation.navigate('ForgotPasswordOtp', { email:  email?.value.toLowerCase(), code:otp })
      setLoading(false)

      return
      const response = await axios.post(`${Base_uri}auth/ForgotPassword`, credential)
        .then(async (res) => {
          // console.log(res?.data);
          if (res?.data?.status) {
            const storeOtp = {
              otp: otp,
              email: email?.value.toLowerCase(),
              timeStamp: new Date()
            }
            await AsyncStorage.setItem("OtpStore", JSON.stringify(storeOtp));

            Toast.show(`${res.data?.message}`, Toast.LONG);
            setLoading(false)
            navigation.navigate('ForgotPasswordOtp', { email: email?.value })
            return
          }
        })
        .catch((e) => {
          if (e.request && e.request.response) {
            let err = JSON.parse(e.request.response);
            Toast.show(`${err.message}`, Toast.LONG);
            setLoading(false)
          } else {
            console.error("Error occurred:", e);
            Toast.show("An error occurred. Please try again later.", Toast.LONG);
            setLoading(false)
          }
        })

    }
  }


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={{
        height: '90%',
        paddingHorizontal: 10
      }}>
        <SimpleHeader fontsize={18} onpressLeft={() => navigation.goBack()} onpressRight={null} />
        <View style={{
          paddingHorizontal: 10
        }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 20,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              paddingBottom: 10
            }}>Forgot Password</Text>
            <Text style={{
              textAlign: 'center',
              color: COLORS.gray,
              fontSize: 12
            }}>No worries! Enter your email address below and
              we will send you a code to reset password.</Text>
          </View>
          <LoginInput border={1} password={email} bcolor={COLORS.white} setPassword={setEmail} type='Email Address' mainIcon={'email-outline'} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <CustomeButton title={loading ? <ActivityIndicator size={'small'} color={COLORS.white} animating={loading} /> : 'Send'} onpress={() => loading ? null : onSendVerifyEmail()} />
      </View>
    </SafeAreaView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})