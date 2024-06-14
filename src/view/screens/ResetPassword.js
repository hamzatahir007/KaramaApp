import { SafeAreaView, StyleSheet, Text, View, ToastAndroid, Image, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import Toast from 'react-native-simple-toast';
import COLORS from '../../conts/Colors';
import SimpleHeader from '../components/SimpleHeader';
import LoginInput from '../components/LoginInput';
import CustomeButton from '../components/CustomeButton';

const ResetPassword = ({ navigation, route }) => {
  const { email } = route.params;
  // console.log(email);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({
    error: false,
    value: null,
    secure: true
  })
  const [confirmPassword, setConfirmPassword] = useState({
    error: false,
    value: null,
    secure: true,
  })
  const [successModal, setSuccessModal] = useState({
    enable: false,
    data: null
  })


  const onSendVerifyEmail = async () => {
    if (!password?.value || !confirmPassword?.value || password?.value?.length < 6 || password?.value !== confirmPassword?.value) {
      if (!password?.value) {
        ToastAndroid.show(`Please enter your password`, ToastAndroid.SHORT);
        setPassword({ ...password, error: true })
        return
      }
      if (password?.value?.length < 6) {
        ToastAndroid.show(`Password must be 6+ letters`, ToastAndroid.SHORT);
        setPassword({ ...password, error: true })
        return
      }
      if (!confirmPassword?.value) {
        ToastAndroid.show(`Please enter your confirm password`, ToastAndroid.SHORT);
        setConfirmPassword({ ...confirmPassword, error: true })
        return
      }
      if (password?.value !== confirmPassword?.value) {
        ToastAndroid.show(`Confirm password cannot match with new password`, ToastAndroid.SHORT);
        setConfirmPassword({ ...confirmPassword, error: true })
        return
      }
    }
    else {

      setSuccessModal({
        ...successModal,
        enable: true,
        data: {
          title: 'Password Change Successfully!',
          title: 'Your password has been changed successfully, we will let you know if there are more problems with your account',
        }
      })
      return
      setLoading(true)
      const response = await axios.post(`${base_url}auth/ResetPassword`, { email: email, password: password?.value })
        .then(async (res) => {
          if (res?.data?.status) {
            // console.log(res?.data?.message);
            // Toast.show(`${res.data?.message}`, Toast.LONG);
            setLoading(false)
            setSuccessModal({
              ...successModal,
              enable: true,
              data: {
                title: 'Password Change Successfully!',
                title: 'Your password has been changed successfully, we will let you know if there are more problems with your account',
              }
            })
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
      // ToastAndroid.show(`Verify email sended`, ToastAndroid.SHORT);
      // navigation.navigate('ForgotPasswordOtp')
    }
  }

  const OnConfirmResetPass = () => {
    setSuccessModal({
      ...successModal,
      enable: false,
      data: null
    })
    // ToastAndroid.show(`Verify email sended`, ToastAndroid.SHORT);
    navigation.navigate('LoginScreen')
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
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
            }}>Create New Password</Text>
            <Text style={{
              textAlign: 'center',
              color: COLORS.gray,
              fontSize: 12
            }}>Please enter and confirm your new password.
              You will need to login after you reset.</Text>
          </View>
          <View style={{
            marginBottom: 10,
          }}>
            <LoginInput border={1} password={password} bcolor={COLORS.white} setPassword={setPassword} type='Password' mainIcon={'lock-outline'} show={!password?.secure} />
          </View>
          <LoginInput border={1} password={confirmPassword} bcolor={COLORS.white} setPassword={setConfirmPassword} type='Confirm Password' mainIcon={'lock-outline'} show={!confirmPassword?.secure} />
        </View>
      </View>
      <View style={{
        paddingHorizontal: 20
      }}>
        <CustomeButton title={'Reset Password'} onpress={() => onSendVerifyEmail()} />
      </View>


      <Modal
        animationType='fade'
        visible={successModal?.enable}
        transparent={true}
        onRequestClose={() => {
          setSuccessModal({
            ...successModal,
            enable: false
          })
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <View style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            padding: 25,
            width: '80%',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
            <Image source={require('../../assets/lock.png')} resizeMode='contain' style={{
              width: 80,
              height: 80,
              marginBottom: 20,
            }} />

            <Text style={[styles.fonts, {
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
              color: COLORS.black
            }]}>Password Changed Successfully!</Text>
            <Text style={[styles.fonts, {
              fontSize: 12,
              textAlign: 'center',
              color: COLORS.gray,
              marginBottom: 20,
              fontWeight: 'normal'
            }]}>Your password has been changed successfully. We will inform you of any further issues with your account.</Text>

            <TouchableOpacity
              onPress={() => OnConfirmResetPass()}
              style={{
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.main,
                paddingHorizontal: 20,
                paddingVertical: 10,
                width: '50%',
              }}>
              <Text style={{
                color: COLORS.white,
                fontSize: 14,
                fontWeight: 'bold',
              }}>Back To Login</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>

  )
}

export default ResetPassword

const styles = StyleSheet.create({
  fonts: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: COLORS.white
  }
})