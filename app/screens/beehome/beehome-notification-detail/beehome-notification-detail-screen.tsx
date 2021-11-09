import React, { useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize"
import FileViewer from "react-native-file-viewer"
import { useStores } from "../../../models"
import { color, screenHeight, screenWidth, spacing } from "../../../theme"
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
const newLocal_2 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: color.palette.primary,
  marginTop: spacing[2],
}
export const BeehomeNotificationDetailScreen = observer(function BeehomeNotificationDetailScreen({
  route,
}) {
  // Pull in one of our MST stores
  const { newsStore, userBeehomeStore } = useStores()
  const { id } = route.params
  // Pull in navigation via hook
  const navigation = useNavigation()
  const [data, setData] = useState(null)
  useEffect(() => {
    newsStore
      .getBeehomeNewsDetail({
        MaCode: userBeehomeStore.users[userBeehomeStore.selected]?.MaCode || null,
        MaMB: userBeehomeStore.users[userBeehomeStore.selected]?.MaMB,
        MaTB: id,
      })
      .then((resp) => {
        setData(resp)
      })
  }, [])

  const onViewPdf = useCallback(
    (path) => () => {
      FileViewer.open(path)
        .then(() => {
          // success
        })
        .catch((error) => {
          // error
        })
    },
    [],
  )
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header headerText="Chi tiết tin tức" leftIcon="back" onLeftPress={navigation.goBack} />
      <ScrollView contentContainerStyle={{paddingBottom:spacing[6], paddingHorizontal:spacing[4]}}>
        <Image
          source={{ uri: data?.img }}
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
        {data?.ListLink?.map((item, index) => (
          <TouchableOpacity key={index} onPress={onViewPdf(item.Link)}>
            <Text style={newLocal_2}>Tài liệu {index}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Screen>
  )
})
