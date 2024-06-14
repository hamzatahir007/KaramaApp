import { SafeAreaView, StyleSheet, Text, View, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../conts/Colors';
import CustomeButton from '../components/CustomeButton';
import SimpleHeader from '../components/SimpleHeader';

const CELL_COUNT = 6


const OtpScreen = ({navigation, route}) => {
    const { email, code } = route.params;
//   console.log(code);
  const [value, setValue] = useState('');
  const [oldOTP, setOldOTP] = useState(null);
  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(true);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [otp, setOtp] = useState({
    error: false,
    value: null
  })

  const onSendVerifyEmail = async () => {
    // const EMAIL_REGEX = /@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const storeOtp = await AsyncStorage.getItem('OtpStore');
    const test = JSON?.parse(storeOtp);

    navigation.navigate('CreatePassword', { email: email })

    return

    // if (!value || value !== test?.otp || !email) {
    //   if (!value) {
    //     ToastAndroid.show(`Please enter your Otp`, ToastAndroid.SHORT);
    //     setOtp({ ...otp, error: true })
    //     return
    //   }
    //   if (value !== test?.otp) {
    //     ToastAndroid.show(`Invalid Otp`, ToastAndroid.SHORT);
    //     setOtp({ ...otp, error: true })
    //     return
    //   }
    //   if (!email) {
    //     ToastAndroid.show(`Email not found.`, ToastAndroid.SHORT);
    //     setOtp({ ...otp, error: true })
    //     return
    //   }
    // }
    // else {
    //   // console.log(value, test.otp);
    //   ToastAndroid.show(`OTP verified successfully`, ToastAndroid.SHORT);
    //   navigation.replace('ResetPassword', { email: email.toLowerCase() })
    //   const storeOtp = AsyncStorage.removeItem('OtpStore');
    // }
  }

  function generateOTP() {
    const otpLength = 6;
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }
  const ResendOtp = async () => {
    const otp = await generateOTP(); // Generate OTP
    const credential = { email: email.toLowerCase(), otp: otp }
    const response = await axios.post(`${base_url}auth/ForgotPassword`, credential)
      .then(async (res) => {
        // console.log(res?.data);
        if (res?.data?.status) {
          const storeOtp = {
            otp: otp,
            email: email.toLowerCase(),
            timeStamp: new Date()
          }
          await AsyncStorage.setItem("OtpStore", JSON.stringify(storeOtp));
          Toast.show(`${res.data?.message}`, Toast.LONG);
          setRemainingTime(300)
          setTimerRunning(true)
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
        }
      })
  }

  const fetchStoredOTP = async () => {
    try {
      const storeOtp = await AsyncStorage.getItem('OtpStore');
      if (storeOtp) {
        const { timeStamp } = JSON.parse(storeOtp);
        const currentTime = new Date().getTime();
        const storedTimeSeconds = new Date(timeStamp).getTime(); // Convert stored timestamp to milliseconds
        const durationInMilliseconds = 5 * 60 * 1000; // 5 minutes in milliseconds

        const elapsedTime = storedTimeSeconds + durationInMilliseconds; // Add 5 minutes to the stored time
        // console.log(new Date(timeStamp) , new Date(elapsedTime) , new Date());
        if (currentTime <= elapsedTime) {
          // Calculate the remaining time based on the difference between the current time and the stored time
          const remainingTimeInSeconds = Math.ceil((elapsedTime - currentTime) / 1000); // Convert milliseconds to seconds
          setRemainingTime(remainingTimeInSeconds);
        } else {
          const storeOtp = await AsyncStorage.removeItem('OtpStore');
          setRemainingTime(0); // Timer expired
        }
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  useEffect(() => {
    let intervalId;
    if (timerRunning && remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timerRunning, remainingTime]);


  useEffect(() => {
    if (remainingTime === 0) {
      setTimerRunning(false);
      const storeOtp = AsyncStorage.removeItem('OtpStore');
      // Prompt the user to resend OTP or reset the timer
    }
  }, [remainingTime]);


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  useEffect(() => {
    fetchStoredOTP()
  }, [])


  return (
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.white,
        // padding: 10
      }}>
        <View style={{
          height: '90%',
          paddingHorizontal: 10
        }}>
          <SimpleHeader fontsize={18} onpressLeft={() => navigation.goBack()} onpressRight={null} />
  
          <View style={{
            paddingTop: 10,
            paddingHorizontal: 10
            // alignItems: 'center'
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
              }}>Enter the OTP Code</Text>
              <Text style={{
                textAlign: 'center',
                color: COLORS.gray,
                fontSize: 12
              }}>Code has been send to {email}.
                Enter the code to verify your account.</Text>
            </View>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              placeholderTextColor={COLORS.gray} // Set the placeholder text color here
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <View style={{
            paddingTop: 30,
            paddingHorizontal: 10
          }}>
            <CustomeButton title={'Verify Account'} onpress={() => onSendVerifyEmail()} />
          </View>
  
  
        </View>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
          <View style={{
            flexDirection: 'row',
          }}>
            <Text style={[styles.fonts, {
              fontWeight: 'normal',
              color: COLORS.gray,
              fontSize: 12,
            }]}>
              Didn’t Receive Code?
            </Text>
            <TouchableOpacity onPress={() => remainingTime === 0 ? ResendOtp() : null} style={{ alignSelf: 'baseline' }}>
              <Text style={{ color: COLORS.main }}> Resend Code{' '}</Text>
            </TouchableOpacity>
          </View>
  
          <Text style={{
            fontSize: 12,
            color: COLORS.gray
          }}>Resend Code in <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>{formatTime(remainingTime)}</Text></Text>
        </View>
  
      </SafeAreaView>
  )
}

export default OtpScreen

const styles = StyleSheet.create({
    fonts: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Regular',
        color: COLORS.black
      },
      codeFieldRoot: { marginTop: 20 },
      cell: {
        color: COLORS.black,
        width: 50,
        height: 60,
        borderRadius: 5,
        lineHeight: 38,
        fontSize: 24,
        marginHorizontal: 4,
        backgroundColor: COLORS.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray2
      },
      focusCell: {
        borderColor: COLORS.main,
      }
})