import React from "react"
import { observer } from "mobx-react-lite"
import { Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize"
import { color, screenWidth, spacing } from "../../../theme"
import { screens } from "../../../navigators/screen"
import { useStores } from "../../../models/root-store/root-store-context"
import { citizen, manager } from "../../../utils/constant"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  justifyContent: "space-between",
}

const newLocal = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ea6d1f",
  marginTop: spacing[5],
}
const newLocal_1 = {
  fontSize: 36,
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 54,
  letterSpacing: 0,
  textAlign: "center",
  color: "#444444",
}
const newLocal_2 = {
  fontSize: RFValue(16),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: "#444444",
}
const newLocal_3 = {
  height: 158,
  width: screenWidth,
}
export const SelectRoleScreen = observer(function SelectRoleScreen() {
  // Pull in one of our MST stores
  const { userBeehomeStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <Image source={require("./assets/Mask_Group.png")} style={newLocal_3} />
      <View>
        <Text style={newLocal_2}>Chào mừng bạn đến với</Text>
        <Text style={newLocal_1}>BEE HOME</Text>
      </View>
      <View style={{ marginHorizontal: spacing[4], marginBottom: spacing[7] }}>
        <Button
          onPress={() => {
            userBeehomeStore.selectRole(citizen)
            navigation.navigate(screens.CardScreen)
          }}
        >
          <Text>Tôi là cư dân</Text>
        </Button>
        <TouchableOpacity
          onPress={() => {
            userBeehomeStore.selectRole(manager)
            navigation.navigate(screens.BeehomeAdminBottomMenu)
          }}
        >
          <Text style={newLocal}>Tôi là ban quản lý</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
