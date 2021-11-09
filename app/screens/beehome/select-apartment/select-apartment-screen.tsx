import React from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize"

import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import { screens } from "../../../navigators/screen"
import Icon from "./assets/Group_2.svg"
import { rowCenter, rowNormal } from "../../../theme/styles"
import auth from "@react-native-firebase/auth"
import { AuthContext } from "../../../navigators/root-navigator"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.beehome,
  flex: 1,
}

const newLocal = {
  fontSize: RFValue(12),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#666666",
}
const newLocal_1 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "right",
  color: "#323232",
}
const newLocal_2 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#323232",
}
const newLocal_3 = { marginLeft: spacing[4] }
const newLocal_4 = {
  backgroundColor: color.palette.beehomeOrange,
  marginTop: spacing[4],
  height: 36,
  borderRadius: 6,
}
const newLocal_5 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ffffff",
}
const newLocal_6 = {
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
  marginTop: spacing[4],
  padding: spacing[4],
}
const newLocal_7 = { height: 1, borderRadius: 2, backgroundColor: "#cccccc" }
const newLocal_8 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "center",
  color: "#3784ff",
  marginTop: spacing[2],
}
export const SelectApartmentScreen = observer(function SelectApartmentScreen() {
  // Pull in one of our MST stores
  const { userBeehomeStore, memberStore, invoiceStore, requestStore } = useStores()
  const { users } = userBeehomeStore
  const { signOut } = React.useContext(AuthContext)
  // Pull in navigation via hook
  const navigation = useNavigation()
  const onSelect = (index) => () => {
    userBeehomeStore.saveSelectedApartment(index)
    requestStore.getRequest(
      {
        MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
        Limit: 20,
        StatusID: 0,
        Offset: 1,
      },
      false,
    )
    memberStore.getMembers({
      MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
      MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
      Limit: 20,
      Offset: 1,
    })
    invoiceStore.getInvoicesComplete(
      {
        MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
        Limit: 0,
        Offset: 20,
      },
      false,
    )
    invoiceStore.getInvoices(
      {
        MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
        Limit: 0,
        Offset: 20,
      },
      false,
    )
    navigation.navigate(screens.BottomTab)
  }

  const onGoBack = async () => {
    if (navigation.canGoBack) {
      navigation.goBack()
    } else {
      await auth().signOut()
      signOut()
    }
  }
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header
        headerText="Đổi căn hộ"
        style={{ backgroundColor: color.palette.beehome }}
        leftIcon="whiteBack"
        titleStyle={{ textAlign: "left", marginLeft: spacing[4], color: color.palette.white }}
        onLeftPress={onGoBack}
      />
      <View style={{ flex: 1, backgroundColor: color.palette.white }}>
        {[...users].map((item, index) => (
          <View
            key={index}
            style={[
              newLocal_6,
              { backgroundColor: userBeehomeStore.selected === index ? "#ebf3ff" : "#ffffff" },
            ]}
          >
            <View style={rowNormal}>
              <Icon />
              <View style={[newLocal_3, { flex: 1 }]}>
                <Text style={newLocal_2}>{item.Apartment.SoNha}</Text>
                <View style={[rowCenter, { marginTop: spacing[2] }]}>
                  <Text style={newLocal}>Tầng - Tòa:</Text>
                  <Text style={newLocal_1}>{item.Apartment.MaSoMB}</Text>
                </View>
                <View style={[rowCenter, { marginTop: spacing[2] }]}>
                  <Text style={newLocal}>Dự án:</Text>
                  <Text style={newLocal_1}>{item.MaCode}</Text>
                </View>
              </View>
            </View>
            {userBeehomeStore.selected !== index ? (
              <Button style={newLocal_4} onPress={onSelect(index)}>
                <Text style={newLocal_5}>Hiển thị thông tin căn hộ này</Text>
              </Button>
            ) : (
              <View style={{ marginTop: spacing[4] }}>
                <View style={newLocal_7} />
                <Text style={newLocal_8}>Đang chọn căn hộ này</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </Screen>
  )
})
