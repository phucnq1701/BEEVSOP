import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../models"

import { color, spacing } from "../../theme"
import { rowCenterBoth } from "../../theme/styles"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const newLocal = {
  marginHorizontal: spacing[4],
  paddingVertical: spacing[4],
  borderBottomWidth: 1,
  borderBottomColor: "#eeeeee",
}
const newLocal_1 = {
  fontSize: RFValue(14),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#888888",
}
const newLocal_2 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "right",
  color: "#323232",
}
export const UserInfoScreen = observer(function UserInfoScreen() {
  const { userStore } = useStores()
  console.log(userStore.cards[userStore.selected])
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header headerText="Thông tin khách hàng" leftIcon="back" onLeftPress={navigation.goBack} />
      <View style={[rowCenterBoth, newLocal]}>
        <Text style={newLocal_1}>Tên khách hàng</Text>
        <Text style={newLocal_2}>{userStore.cards[userStore.selected].TenKH || ''}</Text>
      </View>
      <View style={[rowCenterBoth, newLocal]}>
        <Text style={newLocal_1}>CMND/ CCCD</Text>
        <Text style={newLocal_2}>{userStore.cards[userStore.selected].SoCMND || ''}</Text>
      </View>
      <View style={[rowCenterBoth, newLocal]}>
        <Text style={newLocal_1}>Số điện thoại</Text>
        <Text style={newLocal_2}>{userStore.cards[userStore.selected].DiDong || ''}</Text>
      </View>
      <View style={[rowCenterBoth, newLocal]}>
        <Text style={newLocal_1}>Email</Text>
        <Text style={newLocal_2}>{userStore.cards[userStore.selected].Email || ''}</Text>
      </View>
    </Screen>
  )
})
