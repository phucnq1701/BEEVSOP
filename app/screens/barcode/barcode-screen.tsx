import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../models"

import { color, screenWidth, spacing } from "../../theme"
import { rowCenterBoth } from "../../theme/styles"
import Barcode from "@kichiyaki/react-native-barcode-generator"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.primary,
  flex: 1,
  paddingHorizontal: spacing[4],
}
const newLocal_1 = {
  fontSize: RFValue(16),
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: "#ffffff",
}
const newLocal_2 = {
  height: 40,
  borderRadius: 20,
  backgroundColor: "#74b6ff",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#ffffff",
  justifyContent: "center",
  paddingHorizontal: spacing[4],
}
const newLocal_3 = {
  fontSize: RFValue(16),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "right",
  color: "#ffffff",
}
const newLocal = {
  height: 132,
  borderRadius: 12,
  borderStyle: "solid",
  borderWidth: 1,
  padding: spacing[2],
  borderColor: "rgba(255, 255, 255, 0.45)",
  marginTop: spacing[4],
}
const newLocal_4 = {
  fontSize: RFValue(14),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 3.5,
  textAlign: "center",
  color: "#323232",
}
export const BarcodeScreen = observer(function BarcodeScreen() {
  // Pull in one of our MST stores
  const { userStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed" unsafe>
      <SafeAreaView>
        <View style={[rowCenterBoth, { marginTop: spacing[6] }]}>
          <Text style={newLocal_1}>{userStore.cards[userStore.selected].TenCTDK}</Text>
          <View style={newLocal_2}>
            <Text style={newLocal_3}>{`${userStore.cards[userStore.selected].DiemThe} điểm`} </Text>
          </View>
        </View>
        <View style={newLocal}>
          <Barcode
            format="CODE128B"
            value={userStore.cards[userStore.selected].MaVach}
            text={userStore.cards[userStore.selected].MaVach}
            maxWidth={(screenWidth * 2) / 3}
            height={90}
            style={{ borderRadius: 8 }}
            textStyle={newLocal_4}
          />
        </View>
      </SafeAreaView>
    </Screen>
  )
})
