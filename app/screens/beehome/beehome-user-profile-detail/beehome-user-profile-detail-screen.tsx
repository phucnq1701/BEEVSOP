import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import { Divider } from "react-native-elements"
import FastImage from "react-native-fast-image"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const newLocal = {
  fontSize: RFValue(18),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 27,
  letterSpacing: 0,
  textAlign: "center",
  color: "#323232",
}
const newLocal_1 = {
  borderRadius: 10,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 8,
  shadowOpacity: 1,
  marginHorizontal: spacing[4],
  paddingTop: spacing[7],
  marginTop: spacing[7],
  paddingBottom:spacing[4]
}
const newLocal_2 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "center",
  color: "#3784ff",
}
const newLocal_3 = { flex: 1, backgroundColor: color.palette.backgroundBeehome }
const newLocal_4 = { marginTop: spacing[4], marginBottom: spacing[4] }
const newLocal_5 = {
  fontSize: RFValue(12),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#888888",
}
const newLocal_6 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "right",
  color: "#323232",
}
const newLocal_7 = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginHorizontal: spacing[4],
}
const newLocal_8 = { width: 60, height: 60, borderRadius: 30, position: 'absolute', top: -30, alignSelf: 'center' }
export const BeehomeUserProfileDetailScreen = observer(function BeehomeUserProfileDetailScreen() {
  // Pull in one of our MST stores
  const { userBeehomeStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header
        titleStyle={{ textAlign: "left", marginLeft: spacing[5] }}
        headerText="Cá nhân"
        leftIcon="back"
        onLeftPress={navigation.goBack}
      />
      <View style={newLocal_3}>
        <View style={newLocal_1}>
          <Text style={newLocal}>
            {userBeehomeStore.users[userBeehomeStore.selected].User.TenKH}
          </Text>
          <Text style={newLocal_2}>Thay đổi ảnh đại diện</Text>
          <Divider style={newLocal_4} />
          <View style={newLocal_7}>
            <Text style={newLocal_5}>Số điện thoại</Text>
            <Text style={newLocal_6}>
              {userBeehomeStore.users[userBeehomeStore.selected].User.DienThoaiKH}
            </Text>
          </View>
          <Divider style={{ marginVertical: spacing[4] }} />
          <View style={newLocal_7}>
            <Text style={newLocal_5}>Ngày sinh</Text>
            <Text style={newLocal_6}>
              {userBeehomeStore.users[userBeehomeStore.selected].User.NgaySinh}
            </Text>
          </View>
          <Divider style={{ marginVertical: spacing[4] }} />
          <View style={newLocal_7}>
            <Text style={newLocal_5}>Email</Text>
            <Text style={newLocal_6}>
              {userBeehomeStore.users[userBeehomeStore.selected].User.EmailKH}
            </Text>
          </View>
          <Divider style={{ marginVertical: spacing[4] }} />
          <View style={newLocal_7}>
            <Text style={newLocal_5}>Địa chỉ</Text>
            <Text style={newLocal_6}>
              {userBeehomeStore.users[userBeehomeStore.selected].User.DCLL}
            </Text>
          </View>
          <FastImage
            source={{ uri: "https://picsum.photos/200/300" }}
            style={newLocal_8}
          />
        </View>
      </View>
    </Screen>
  )
})
