import React, { useCallback, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, TouchableOpacity, View, ViewStyle, FlatList } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../models"

import { color, spacing } from "../../theme"
import MonthPicker from "react-native-month-year-picker"
import FastImage from 'react-native-fast-image'

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
  letterSpacing: 0,
  textAlign: "right",
  color: "#eb383d",
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
const WithdrawComponent = ({ item, index }) => {
  const navigation = useNavigation()
  return (
    <View key={index} style={newLocal_8}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FastImage source={require("./assets/icon.png")} style={newLocal_7} />
        <View style={{ padding: spacing[4] }}>
          <Text style={newLocal_6}>{item.TenGD}</Text>
          <Text style={newLocal_9}>{item.NgayNhap}</Text>
        </View>
      </View>
      <Text style={newLocal_10}>-{item.DiemTru} điểm</Text>
    </View>
  )
}
export const WithdrawHistoryScreen = observer(function WithdrawHistoryScreen() {
  // Pull in one of our MST stores
  const { userStore, withdrawStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [show, setShow] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [date, setDate] = useState(new Date())
  const limit = useRef(20)
  const offset = useRef(0)
  const showPicker = useCallback((value) => {
    setShow(value)
  }, [])
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date

      showPicker(false)
      setDate(selectedDate)
    },
    [date, showPicker],
  )

  const getData = (date) => {
    withdrawStore.getWithDraw({
      DiDong: userStore.phone,
      TenCTDK: userStore.cards[userStore.selected].TenCTDK,
      Month: date.getMonth() + 1,
      Year: date.getFullYear(),
      Limit: limit.current,
      Offset: offset.current,
    })
  }

  useEffect(() => {
    getData(date)
  }, [date])

  const renderItem = useCallback((item) => {
    return <WithdrawComponent {...item} />
  }, [])
  const onLoadMore = () => {
    offset.current += limit.current
    getData(date)
  }
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header headerText="Lịch sử rút" leftIcon="back" onLeftPress={navigation.goBack} />
      <TouchableOpacity style={newLocal} onPress={() => setShow(!show)}>
        <View style={newLocal_1}>
          <View>
            <Text style={newLocal_2}>Tháng</Text>
            <Text style={newLocal_3}>{`Tháng ${date.getMonth() + 1}`}</Text>
          </View>
          <FastImage source={require("./assets/down.png")} />
        </View>
        <View style={newLocal_4} />
        <View style={newLocal_1}>
          <View>
            <Text style={newLocal_2}>Năm</Text>
            <Text style={newLocal_3}>{date.getFullYear()}</Text>
          </View>
          <FastImage source={require("./assets/down.png")} />
        </View>
      </TouchableOpacity>
      <FlatList
        onRefresh={() => getData(date)}
        refreshing={refreshing}
        data={[...withdrawStore.withdraws].slice()}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
      />
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date(2010, 1)}
          maximumDate={new Date(2025, 5)}
          locale="vi"
        />
      )}
    </Screen>
  )
})
