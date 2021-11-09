import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text, useCountdown } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import { Input } from "react-native-elements"
import { inputStyle } from "../../phone/phone-screen"
import { rowCenterBoth } from "../../../theme/styles"
import { screens } from "../../../navigators/screen"
import { AuthContext } from "../../../navigators/root-navigator"
import { save } from "../../../utils/storage"
import auth from "@react-native-firebase/auth"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const titleStyle = {
  fontSize: RFValue(24),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 36,
  letterSpacing: 0,
  textAlign: "left",
  color: "#25313f",
}
const OTPText = {
  fontSize: RFValue(16),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: "#82878d",
  marginTop: spacing[2],
}
const phoneNumber = {
  fontSize: RFValue(16),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: "#25313f",
}
const inputCodeCont = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: spacing[6],
  alignItems: "flex-start",
}
const countdown = {
  fontSize: RFValue(16),
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#ca373f",
  marginLeft: spacing[3],
  marginTop: spacing[2],
}
const changePhone = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#4369ee",
}
const otpCode = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#b4b7bc",
}
const btnTitle = {
  fontSize: RFValue(16),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  color: "#ffffff",
}
const newLocal = {
  paddingHorizontal: spacing[4],
  justifyContent: "space-between",
  flex: 1,
  paddingBottom: spacing[4],
}
export const BeehomeCodeInputScreen = observer(function BeehomeCodeInputScreen({ route }) {
  // Pull in one of our MST stores
  const Auth = React.useContext(AuthContext)
  const { userStore, userBeehomeStore } = useStores()
  const { confirmation, phone } = route.params
  const [clockTime, isPlaying, setIsPlaying] = useCountdown(2 * 60)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState("")
  const [error, setError] = useState("")
  const navigation = useNavigation()
  const onLogin = async () => {
    try {
      setLoading(true)
      await confirmation.confirm(text)
      onLoginState()
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }
  useEffect(() => {
    setError("")
  }, [text])
  const onLoginState = async () => {
    console.log('user')
    try {
      setIsPlaying(false)
      await userBeehomeStore.getUser({ Mobile: phone.replace("+84", "0") })
      userStore.savePhone(phone.replace("+84", "0"))
      Auth.signIn({ phone: phone.replace("+84", "0") })
      await save("phone", phone.replace("+84", "0"))
      setLoading(false)
    } catch (e){
      setError("Lỗi hệ thống. Vui lòng thử lại")
      setLoading(false)
    } finally {
      setError("")
    }
    // navigation.navigate(screens.)
  }
  const onAuthStateChanged = (user) => {
    if (user) {
      onLoginState()
    }
  }
  useEffect(() => {
    setIsPlaying(true)
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])
  const convertTime = (count) => {
    let hours = Math.floor(count / 3600)
    let minutes = Math.floor(count / 60) - hours * 60
    let seconds = parseFloat(count % 60).toFixed(0)
    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`
    if (seconds < 10) seconds = `0${seconds}`
    return `${minutes}:${seconds}`
  }
  useEffect(() => {
    if (clockTime === 0) {
      navigation.goBack()
    }
  }, [clockTime])
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header headerText="Mã xác thực OTP" leftIcon="back" onLeftPress={navigation.goBack} />
      <View style={newLocal}>
        <View>
          <Text style={OTPText}>Điền OTP vừa được gửi đến số điện thoại:</Text>
          <Text style={phoneNumber}>{phone}</Text>
          <View style={inputCodeCont}>
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              inputStyle={inputStyle}
              clearButtonMode="always"
              onChangeText={setText}
              autoFocus={true}
              placeholder="Mã đăng nhập"
              errorMessage={error}
              containerStyle={{ paddingHorizontal: 0, flex: 1 }}
            />
            <Text style={countdown}>{convertTime(clockTime)}</Text>
          </View>
        </View>
        <View>
          <View style={[rowCenterBoth, { marginBottom: spacing[5] }]}>
            <TouchableOpacity onPress={navigation.goBack}>
              <Text style={changePhone}>Đổi số điện thoại</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigation.goBack}>
              <Text style={otpCode}>Gửi lại OTP</Text>
            </TouchableOpacity>
          </View>
          <Button onPress={onLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={color.palette.white} />
            ) : (
              <Text style={btnTitle}>Đăng nhập</Text>
            )}
          </Button>
        </View>
      </View>
    </Screen>
  )
})
