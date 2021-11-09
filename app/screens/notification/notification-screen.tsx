import React, { useCallback, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, TouchableOpacity, View, ViewStyle, FlatList } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../models"

import { color, spacing } from "../../theme"
import MonthPicker from "react-native-month-year-picker"
import { NotificationItem } from "./notification-item"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.background,
  flex: 1,
}

const newLocal = {
  height: 62,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.3)",
  shadowOffset: {
    width: 0,
    height: 0.5,
  },
  shadowRadius: 0,
  shadowOpacity: 1,
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[3],
}
const newLocal_1 = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  flex: 1,
}
const newLocal_2 = {
  fontSize: RFValue(12),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#82878d",
}
const newLocal_3 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#323232",
}
const newLocal_4 = {
  width: 1,
  height: 46,
  backgroundColor: "#dddddd",
  marginHorizontal: spacing[4],
}

const newLocal_5 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "right",
  color: "#3784ff",
  marginTop: spacing[3],
}
const newLocal_6 = {
  fontSize: RFValue(14),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#000000",
}
const newLocal_7 = {
  width: 24,
  height: 24,
}
const newLocal_8 = {
  marginHorizontal: spacing[4],
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottomWidth: 1,
  borderBottomColor: "#eeeeee",
}

const newLocal_10 = {
  fontSize: RFValue(13),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 20,
  letterSpacing: 0,
  textAlign: "right",
  color: "#5077f7",
}
const newLocal_9 = {
  fontSize: RFValue(12),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#666666",
}

export const NotificationScreen = observer(function NotificationScreen() {
  // Pull in one of our MST stores
  const { userStore, notiStore } = useStores()
  const onEndReachedCalledDuringMomentum = useRef(true)
  // Pull in navigation via hook
  const navigation = useNavigation()
  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date())
  const limit = useRef(20)
  const offset = useRef(0)
  const [refreshing, setRefreshing] = useState(false)

  const getData = () => {
    notiStore.getNotifs({
      DienThoai: userStore.phone,
      LoaiApp: 3,
      Limit: limit.current,
      Offset: offset.current,
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const renderItem = useCallback((item) => {
    return <NotificationItem {...item} />
  }, [])

  const onLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum.current) {
      offset.current += limit.current
      getData()
      onEndReachedCalledDuringMomentum.current = true
    }
  }
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header headerText="Thông báo" leftIcon="back" onLeftPress={navigation.goBack} />
      <FlatList
        onRefresh={() => {
          offset.current = 0
          getData()
        }}
        refreshing={refreshing}
        data={[...notiStore.notiList].slice()}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false
        }}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        onEndReached={onLoadMore}
        initialNumToRender={10}
        onEndReachedThreshold={0.2}
      />
    </Screen>
  )
})
