import React from "react"
import { observer } from "mobx-react-lite"
import { Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../models"

import { color, spacing } from "../../theme"
import { screens } from "../../navigators/screen"
import FastImage from "react-native-fast-image"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const newLocal = {
  fontSize: RFValue(14),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  marginTop: spacing[5],
  textAlign: "center",
  color: "#82878d",
}
const newLocal_1 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#ffffff",
}
const newLocal_2 = {
  padding: spacing[4],
  backgroundColor: color.primary,
  marginLeft: spacing[4],
  marginRight: spacing[6],
  marginTop: spacing[4],
  borderRadius: 8,
}
const newLocal_3 = {
  fontSize: RFValue(18),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 3.6,
  textAlign: "center",
  color: "#ffffff",
}
const newLocal_4 = {
  fontSize: RFValue(14),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "right",
  color: "#ffffff",
  marginTop: spacing[7],
  marginRight: spacing[5],
}
const newLocal_5 = {
  fontSize: 36,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 54,
  letterSpacing: 0,
  textAlign: "right",
  color: "#ffffff",
  marginRight: spacing[5],
}
const newLocal_6 = {
  width: 40,
  height: 40,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.12)",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 8,
  shadowOpacity: 1,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  position: "absolute",
  right: -20,
  top: "45%",
}
export const CardScreen = observer(function CardScreen() {
  // Pull in one of our MST stores
  const { userStore } = useStores()
  const { cards } = userStore
  // Pull in navigation via hook
  const navigation = useNavigation()
  const onSelect = (index) => () => {
    userStore.selectCard(index)
    navigation.navigate(screens.BottomTab)
  }
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header headerText="Chọn thẻ" />
      <Text style={newLocal}>Ấn vào mũi tên sang phải để chọn thẻ</Text>
      {[...cards].map((item, index) => (
        <TouchableOpacity key={index} onPress={onSelect(index)} style={newLocal_2}>
          <Text style={newLocal_1}>{item.TenCTDK}</Text>
          <Text style={newLocal_3}>{item.SoThe}</Text>
          <Text style={newLocal_4}>Điểm tích luỹ</Text>
          <Text style={newLocal_5}>{item.DiemThe}</Text>
          <TouchableOpacity style={newLocal_6} onPress={onSelect(index)}>
            <FastImage source={require("./assets/next.png")} style={{ width: 10, height: 15 }} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </Screen>
  )
})
