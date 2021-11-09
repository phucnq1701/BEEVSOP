import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../models"

import { color, screenHeight, screenWidth, spacing } from "../../theme"
import { WebView } from "react-native-webview"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.background,
  flex: 1,
}

const newLocal = {
  fontSize: RFValue(18),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 27,
  letterSpacing: 0,
  textAlign: "left",
  color: "#323232",
}
const newLocal_1 = {
  backgroundColor: color.palette.white,
  padding: spacing[4],
  borderRadius: 8,
}
export const NewsDetailScreen = observer(function NewsDetailScreen({ route }) {
  // Pull in one of our MST stores
  const { newsStore, userStore } = useStores()
  const { id } = route.params
  // Pull in navigation via hook
  const navigation = useNavigation()
  const [data, setData] = useState(null)
  useEffect(() => {
    newsStore
      .getDetailNews({ ID: id, TenCTDK: userStore.cards[userStore.selected].TenCTDK })
      .then((resp) => {
        setData(resp)
      })
  }, [])
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header headerText="Chi tiết tin tức" leftIcon="back" onLeftPress={navigation.goBack} />
      <ScrollView>
        <Image
          source={{ uri: data?.imgIcon }}
          style={{
            width: screenWidth,
            height: 250,
          }}
        />
        <View style={newLocal_1}>
          <Text style={newLocal}>{data?.TieuDe}</Text>
          <WebView
            source={{ html: data?.NoiDung }}
            style={{ width: screenWidth, height: screenHeight }}
            androidHardwareAccelerationDisabled={true}
          />
        </View>
      </ScrollView>
    </Screen>
  )
})
