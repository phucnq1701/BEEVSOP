import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../models"

import { color, spacing } from "../../theme"
import { Input } from "react-native-elements"
import auth from "@react-native-firebase/auth"
import { screens } from "../../navigators/screen"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  paddingHorizontal: spacing[4],
  flex: 1,
  paddingVertical: spacing[5],
  justifyContent: "space-between",
}

export const inputStyles: TextStyle = {
  fontSize: RFValue(24),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 36,
  letterSpacing: 0,
  textAlign: "left",
  color: "#25313f",
}
export const inputStyle = {
  fontSize: RFValue(24),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 36,
  letterSpacing: 0,
  textAlign: "left",
  color: "#25313f",
}
const settings = auth().settings
if(__DEV__){
settings.appVerificationDisabledForTesting = true 

}

const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
export const PhoneScreen = observer(function PhoneScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const [phone, setPhone] = useState("")
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
        <Input
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={inputStyle}
          onChangeText={setPhone}
          clearButtonMode="always"
          autoFocus={true}
          disabled={loading}
          placeholder="Số điện thoại của bạn"
          errorMessage={error}
          containerStyle={{ paddingHorizontal: 0, marginTop: spacing[6] }}
        />
      </View>
      <Button onPress={onLogin} disabled={loading}>
        {loading ? <ActivityIndicator color={color.palette.white} /> : <Text>Tiếp tục</Text>}
      </Button>
    </Screen>
  )
})
