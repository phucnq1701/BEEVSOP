/* eslint-disable camelcase */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"

import { useStores } from "../../models"
import { RFValue } from "react-native-responsive-fontsize";

import { color, screenWidth, spacing } from "../../theme"
import { rowCenterBoth } from "../../theme/styles"
import { screens } from "../../navigators/screen"
import Info from "./assets/info.svg"
import Card from "./assets/card.svg"
import Withdraw from "./assets/withdraw.svg"
import History from "./assets/history.svg"
import Noti from "./assets/noti.svg"
import FastImage from 'react-native-fast-image'
import { load, save } from "../../utils/storage"
import EnhancedImageViewing from "../../components/image-viewing"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.background,
}

const newLocal = {
  fontSize: RFValue(14),
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "left",
  color: "#ffffff",
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
  borderRadius: 30,
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
const newLocal_4 = {
  borderRadius: 8,
  backgroundColor: color.palette.white,
  shadowColor: "rgba(0, 0, 0, 0.12)",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  padding: spacing[3],
  position: "absolute",
  top: 127,
  flexDirection: "row",
  left: spacing[4],
  right: spacing[4],
  justifyContent: "space-between",
  flex: 1,
  shadowRadius: 8,
  shadowOpacity: 1,
}
const newLocal_5 = {
  fontSize: RFValue(11),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: "center",
  color: "#323232",
  marginTop: spacing[2],
}
const imgbg = {
  width: screenWidth,
  height: 187,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[6],
}
const newLocal_6 = { alignItems: "center", flex: 1, marginHorizontal: 6 }
const newLocal_7 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#323232",
}
const newLocal_8 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "right",
  color: "#3784ff",
}
const newLocal_9 = {
  flexDirection: "row",
  alignItems: "center",
  borderBottomWidth: 1,
  borderBottomColor: "#eeeeee",
  paddingVertical: spacing[4],
  flex: 1,
}
const newLocal_10 = {
  width: 100,
  height: 60,
  borderRadius: 3,
}
const newLocal_11 = {
  fontSize: RFValue(12),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#323232",
  flex: 1,
  flexWrap: "wrap",
  marginBottom: spacing[2],
}
const newLocal_12 = {
  fontSize: RFValue(12),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#888888",
}
const noticont = {
  paddingHorizontal: 0,
  width: 40,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: spacing[4],
}
export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { userStore, newsStore } = useStores()
  const [refreshing, setOnRefresh] = useState(false)
  const [show, setShow] = useState(false)
  const [currentImageIndex, setImageIndex] = useState(0);
  const navigation = useNavigation()
  useEffect(() => {
    newsStore.getNews({
      DiDong: userStore.phone,
      TenCTDK: userStore.cards[userStore.selected].TenCTDK,
      Limit: 20,
      Offset: 0,
    })
  }, [])
console.log(newsStore.getBanner?.map((item) => ({ uri: item.imgIcon })))
  const onRefresh = async () => {
    const phone = await load("phone")
    if (phone) {
      await userStore.getUser({ DiDong: phone })
      setOnRefresh(false)
    }
  }

  return (
    <Screen style={ROOT} onRefresh={onRefresh} refreshing={refreshing} preset="scroll" unsafe>
      <ImageBackground source={require("./assets/bg.png")} style={imgbg} resizeMode="stretch">
        <SafeAreaView>
          <View style={[rowCenterBoth, { marginTop: spacing[4] }]}>
            <View style={rowCenterBoth}>
              <FastImage source={require("./assets/user.png")} />
              <View style={{ marginLeft: spacing[3] }}>
                <Text style={newLocal}>Xin chào</Text>
                <Text style={newLocal_1}>{userStore.cards[userStore.selected].TenCTDK}</Text>
              </View>
            </View>
            <View style={rowCenterBoth}>
              <View style={newLocal_2}>
                <Text style={newLocal_3}>
                  {`${userStore.cards[userStore.selected].DiemThe} điểm`}{" "}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate(screens.NotificationScreen)}
                style={[newLocal_2, noticont]}
              >
                <Noti />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={newLocal_4}>
        <TouchableOpacity
          style={newLocal_6}
          activeOpacity={1}
          onPress={() => navigation.navigate(screens.UserInfoScreen)}
        >
          <Info />
          <Text style={newLocal_5}>Thông tin khách hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={newLocal_6}
          activeOpacity={1}
          onPress={() => navigation.navigate(screens.PayinHistoryScreen)}
        >
          <History />
          <Text style={newLocal_5}>Lịch sử nạp điểm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={newLocal_6}
          activeOpacity={1}
          onPress={() => navigation.navigate(screens.WithdrawHistoryScreen)}
        >
          <Withdraw />
          <Text style={newLocal_5}>Lịch sử rút</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={newLocal_6}
          activeOpacity={1}
          onPress={() => navigation.navigate(screens.CardScreen)}
        >
          <Card />
          <Text style={newLocal_5}>Thẻ thành viên</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: spacing[8], marginHorizontal: spacing[4] }}>
        <ScrollView horizontal pagingEnabled>
          {newsStore.getBanner?.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => setShow(true)} key={index}>
                <Image
                  source={{ uri: item.imgIcon }}
                  style={{ width: screenWidth - spacing[4] * 2, height: 193, borderRadius: 10 }}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
      <View style={{ marginHorizontal: spacing[4], marginTop: spacing[5] }}>
        <View style={rowCenterBoth}>
          <Text style={newLocal_7}>Tin tức</Text>
          <TouchableOpacity onPress={() => navigation.navigate(screens.NewsScreen)}>
            <Text style={newLocal_8}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        {[...newsStore.news].slice().map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => navigation.navigate(screens.NewsDetailScreen, { id: item.ID })}
            style={newLocal_9}
          >
            <FastImage source={{ uri: item.imgIcon }} style={newLocal_10} />
            <View style={{ marginLeft: spacing[3], flex: 1 }}>
              <Text style={newLocal_11}>{item.TieuDe}</Text>
              <Text style={newLocal_12}>{item.NgayNhap}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <EnhancedImageViewing
        images={newsStore.getBanner?.map((item) => ({ uri: item.imgIcon })) || []}
        imageIndex={currentImageIndex}
        visible={show}
        onRequestClose={() => setShow(false)}
      />
    </Screen>
  )
})
