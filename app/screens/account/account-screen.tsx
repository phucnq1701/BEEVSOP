import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, ImageBackground, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../models"

import { color, screenWidth, spacing } from "../../theme"
import { rowCenterBoth } from "../../theme/styles"
import { AuthContext } from "../../navigators/root-navigator"
import { save } from "../../utils/storage"
import User from "./assets/user.svg"
import Next from "./assets/next.svg"
import Logout from "./assets/logout.svg"
import { screens } from "../../navigators/screen"
import FastImage from 'react-native-fast-image'
import auth from "@react-native-firebase/auth"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.background,
}

const newLocal = {
  fontSize: RFValue(16),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ffffff",
  marginTop: spacing[8] + spacing[5],
}
const newLocal_1 = {
  width: screenWidth,
  height: 257,
}
const newLocal_2 = {
  flexDirection: "row",
  alignItems: "center",
}
const newLocal_3 = {
  fontSize: RFValue(14),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#888888",
  marginLeft: spacing[4],
}
const newLocal_4 = {
  borderRadius: 16,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.08)",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowRadius: 8,
  shadowOpacity: 1,
  paddingHorizontal: spacing[2],
  paddingVertical: spacing[5],
  marginTop: spacing[4],
  marginHorizontal: spacing[4],
}
const newLocal_5 = {
  width: 106,
  height: 106,
  borderRadius: 50,
  borderWidth: 5,
  borderColor: "#e0e8f4",
  position: "absolute",
  top: 160,
  left: screenWidth / 2 - 53,
}
const newLocal_6 = {
  fontSize: RFValue(18),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 27,
  letterSpacing: 0,
  textAlign: "center",
  color: "#323232",
  marginTop: spacing[3],
}
const newLocal_7 = {
  fontSize: RFValue(12),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "center",
  color: "#666666",
}
const newLocal_8 = {
  height: 1,
  backgroundColor: "#f1f1f1",
  marginVertical: spacing[3],
}
export const AccountScreen = observer(function AccountScreen() {
  // Pull in one of our MST stores
  const { userStore } = useStores()
  const { signOut } = React.useContext(AuthContext)

  // Pull in navigation via hook
  const navigation = useNavigation()
  const onLogout = () => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn đăng xuất không?", [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await save("phone", null)
          await auth().signOut()
          signOut()
        },
      },
    ])
  }
  return (
    <Screen style={ROOT} preset="scroll" unsafe>
      <ImageBackground source={require("./assets/bg.png")} style={newLocal_1}>
        <Text style={newLocal}>Tài khoản</Text>
      </ImageBackground>
      <FastImage source={{ uri: "https://picsum.photos/200/300" }} style={newLocal_5} />
      <Text style={newLocal_6}>{userStore.cards[userStore.selected].TenCTDK}</Text>
      <Text style={newLocal_7}>{userStore.cards[userStore.selected].SoThe}</Text>
      <View style={newLocal_4}>
        <TouchableOpacity
          style={rowCenterBoth}
          hitSlop={{ top: 10, bottom: 10 }}
          onPress={() => navigation.navigate(screens.UserInfoScreen)}
        >
          <View style={newLocal_2}>
            <User />
            <Text style={newLocal_3}>Thông tin khách hàng</Text>
          </View>
          <Next />
        </TouchableOpacity>
        <View style={newLocal_8} />
        <TouchableOpacity
          style={rowCenterBoth}
          hitSlop={{ top: 10, bottom: 10 }}
          onPress={onLogout}
        >
          <View style={newLocal_2}>
            <Logout />
            <Text style={newLocal_3}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
