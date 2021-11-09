import React from "react"
import { observer } from "mobx-react-lite"
import { Alert, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import FastImage from "react-native-fast-image"
import Earth from "./assets/earth.svg"
import { rowCenter, rowCenterBoth } from "../../../theme/styles"
import { save } from "../../../utils/storage"
import auth from "@react-native-firebase/auth"
import { AuthContext } from "../../../navigators/root-navigator"
import { screens } from "../../../navigators/screen"
const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const newLocal = {
  fontSize: RFValue(14),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#666666",
}
const newLocal_1 = {
  paddingVertical: spacing[5],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.white,
  marginTop: spacing[4],
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const newLocal_2 = {
  fontSize: RFValue(24),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 36,
  letterSpacing: 0,
  textAlign: "left",
  color: "#444444",
}
const newLocal_3 = {
  backgroundColor: color.palette.backgroundBeehome,
  flex: 1,
}
const newLocal_4 = {
  fontSize: RFValue(14),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#666666",
  marginLeft: spacing[4],
}
const newLocal_5 = {
  fontSize: RFValue(14),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "right",
  color: "#3784ff",
}
const newLocal_6 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "center",
  color: "#c3333c",
}
export const BeehomeUserProfileScreen = observer(function BeehomeUserProfileScreen() {
  // Pull in one of our MST stores
  const { signOut } = React.useContext(AuthContext)
  const { userBeehomeStore } = useStores()

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
          await auth().signOut()
          signOut()
        },
      },
    ])
  }
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header headerText="Tài khoản" titleStyle={{ textAlign: "left" }} />
      <View style={newLocal_3}>
        <TouchableOpacity onPress={() => navigation.navigate(screens.BeehomeUserProfileDetailScreen)} style={newLocal_1}>
          <View>
            <Text style={newLocal_2}>
              {userBeehomeStore.users[userBeehomeStore.selected].User.TenKH}
            </Text>
            <Text style={newLocal}>Chạm để xem thông tin</Text>
          </View>
          <FastImage
            source={{ uri: "https://picsum.photos/200/300" }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </TouchableOpacity>

        <View style={newLocal_1}>
          <View style={rowCenterBoth}>
            <Earth />
            <Text style={newLocal_4}>Ngôn ngữ</Text>
          </View>
          <Text style={newLocal_5}>Tiếng việt</Text>
        </View>
        <TouchableOpacity onPress={onLogout} style={[newLocal_1, { justifyContent: "center", paddingVertical: spacing[4] }]}>
          <Text style={newLocal_6}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
