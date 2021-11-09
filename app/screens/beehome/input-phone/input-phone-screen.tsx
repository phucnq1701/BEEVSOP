import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import { Input } from "react-native-elements"
import auth from "@react-native-firebase/auth"
import { screens } from "../../../navigators/screen"
import { inputStyle } from "../../phone/phone-screen"
import Icon from "./assets/icon.svg"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  paddingVertical: spacing[5],
  justifyContent: "space-between",
}

const inputStyles: TextStyle = {
  fontSize: RFValue(16),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "left",
  marginHorizontal: spacing[4],
  color: "#2b2b2b",
}
const settings = auth().settings
if (__DEV__) {
  settings.appVerificationDisabledForTesting = true
}

const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
const newLocal = {
  height: 52,
  backgroundColor: "#fff2e9",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginTop: spacing[3],
}
const newLocal_1 = {
  fontSize: RFValue(12),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#888888",
  marginHorizontal: spacing[4],
  flexWrap: "wrap",
  flex: 1,
}
const newLocal_2 = {
  fontSize: RFValue(18),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 27,
  letterSpacing: 0,
  textAlign: "left",
  color: "#2b2b2b",
}
const newLocal_3 = {
  fontSize: RFValue(14),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#666666",
  margin: spacing[4],
}
export const InputPhoneScreen = observer(function InputPhoneScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const [phone, setPhone] = useState(__DEV__ ? "0913994696" : "")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const onLogin = React.useCallback(async () => {
    if (phoneRegex.test(phone)) {
      setLoading(true)
      const replacedPhone = phone.replace("0", "+84")
      try {
        const confirmation = await auth().signInWithPhoneNumber(replacedPhone)
        setLoading(false)
        navigation.navigate(screens.CodeInputScreen, { confirmation, phone: replacedPhone })
      } catch (e) {
        setError(e.message)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    } else {
      setError("Sai số điện thoại")
      setLoading(false)
    }
  }, [phone])

  useEffect(() => {
    setError("")
  }, [phone])
  return (
    <Screen style={ROOT} preset="scroll">
      <View>
        <Text style={inputStyles}>Nhập số điện thoại</Text>
        <View style={newLocal}>
          <View style={{ marginLeft: spacing[4] }}>
            <Icon />
          </View>
          <Text style={newLocal_1}>
            Thông tin phải trùng khớp với thông tin đã đăng ký tại BeeHome
          </Text>
        </View>
        <Text style={newLocal_3}>Số điện thoại đăng ký hồ sơ BeeHome</Text>
        <Input
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={newLocal_2}
          onChangeText={setPhone}
          clearButtonMode="always"
          autoFocus={true}
          value={phone}
          disabled={loading}
          placeholder="Số điện thoại của bạn"
          errorMessage={error}
          containerStyle={{
            paddingHorizontal: 0,
            marginHorizontal: spacing[4],
          }}
        />
      </View>
      <Button onPress={onLogin} disabled={loading} style={{ marginHorizontal: spacing[4] }}>
        {loading ? <ActivityIndicator color={color.palette.white} /> : <Text>Tiếp tục</Text>}
      </Button>
    </Screen>
  )
})
