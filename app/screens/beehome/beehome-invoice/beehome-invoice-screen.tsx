import React from "react"
import { observer } from "mobx-react-lite"
import { useWindowDimensions, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import { TabView, SceneMap } from "react-native-tab-view"
import Debt from "./debt"
import Paid from "./paid"
import { TabBar } from "./Tabbar"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.beehome,
  flex: 1,
}
const newLocal_7 = { textAlign: "left", marginLeft: spacing[4], color: color.palette.white }

export const BeehomeInvoiceScreen = observer(function BeehomeInvoiceScreen() {
  // Pull in one of our MST stores
  const { invoiceStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "debt", title: "Chưa thanh toán" },
    { key: "paid", title: "Đã thanh toán" },
  ])

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "debt":
        return <Debt jumpTo={jumpTo} />
      case "paid":
        return <Paid jumpTo={jumpTo} />
    }
  }
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header
        headerText="Hóa đơn"
        style={{ backgroundColor: color.palette.beehome }}
        leftIcon="whiteBack"
        titleStyle={newLocal_7}
        onLeftPress={navigation.goBack}
      />
      <View style={{ flex: 1, backgroundColor: color.palette.white }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={(props) => <TabBar {...props} />}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </Screen>
  )
})
