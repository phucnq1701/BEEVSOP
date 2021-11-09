/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from "react"
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
import { Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize"

import { useStores } from "../../../models"
import { color, screenWidth, spacing } from "../../../theme"
import { rowCenterBoth } from "../../../theme/styles"
import { screens } from "../../../navigators/screen"
import Info from "./assets/report.svg"
import Card from "./assets/apartment.svg"
import Withdraw from "./assets/chat.svg"
import History from "./assets/addmember.svg"
import Noti from "./assets/noti.svg"
import Invoice from "./assets/invoice.svg"
import Note from "./assets/note.svg"
import Tool from "./assets/tool.svg"
import FastImage from "react-native-fast-image"
import { load, save } from "../../../utils/storage"
import EnhancedImageViewing from "../../../components/image-viewing"
import { citizen } from "../../../utils/constant"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.background,
}

const newLocal = {
  marginTop: spacing[7] + spacing[4],
  flexDirection: "row",
  justifyContent: "space-between",
}
const newLocal_1 = {
  fontSize: RFValue(16),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 24,
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
  padding: spacing[4],
  position: "absolute",
  top: 70,
  flexDirection: "row",
  left: spacing[4],
  right: spacing[4],
  justifyContent: "space-between",
  flex: 1,
  shadowRadius: 8,
  shadowOpacity: 1,
}
const newLocal_5 = {
  fontSize: RFValue(12),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "center",
  color: "#323232",
  marginTop: spacing[3],
}
const imgbg = {
  width: screenWidth,
  height: 138,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[0],
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
export const BeehomeHomeScreen = observer(function BeehomeHomeScreen() {
  // Pull in one of our MST stores
  const { userStore, newsStore, userBeehomeStore } = useStores()
  const [refreshing, setOnRefresh] = useState(false)
  const [show, setShow] = useState(false)
  const [currentImageIndex, setImageIndex] = useState(0)
  const navigation = useNavigation()
  useEffect(() => {
    newsStore.getBeehomeNews(
      {
        MaTN: userBeehomeStore.users[userBeehomeStore.selected]?.Apartment?.MaTN || null,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected]?.MaCode || null,
        MaMB: userBeehomeStore.users[userBeehomeStore.selected]?.MaMB,
        Limit: 20,
        Offset: 1,
      },
      false,
    )

    // newsStore.getNews({
    //   DiDong: userStore.phone,
    //   TenCTDK: userStore.cards[userStore.selected].TenCTDK,
    //   Limit: 20,
    //   Offset: 1,
    // })
  }, [])
  const onRefresh = () => {
    // const phone = await load("phone")
    // if (phone) {
    //   await userStore.getUser({ DiDong: phone })
    //   setOnRefresh(false)
    // }
    newsStore.getBeehomeNews(
      {
        MaTN: userBeehomeStore.users[userBeehomeStore.selected]?.Apartment?.MaTN || null,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected]?.MaCode || null,
        MaMB: userBeehomeStore.users[userBeehomeStore.selected]?.MaMB,
        Limit: 20,
        Offset: 1,
      },
      false,
    )
  }

  const toDetail = useCallback(
    (id) => () => {
      navigation.navigate(screens.BeehomeNotificationDetailScreen, { id })
    },
    [],
  )

  return (
    <Screen style={ROOT} onRefresh={onRefresh} refreshing={refreshing} preset="scroll">
      <ImageBackground source={require("./assets/bg.png")} style={imgbg} resizeMode="stretch">
        <View style={[rowCenterBoth, { marginTop: spacing[5] }]}>
          <View style={rowCenterBoth}>
            <Text style={newLocal_1}>
              {userBeehomeStore.users[userBeehomeStore.selected]?.Apartment?.SoNha || ""}
            </Text>
          </View>
          <View style={rowCenterBoth}>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.NotificationScreen)}
              // style={[newLocal_2, noticont]}
            >
              <Noti />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={newLocal_4}>
        <TouchableOpacity
          style={newLocal_6}
          activeOpacity={1}
          onPress={() => navigation.navigate(screens.BeehomeCreateReportScreen)}
        >
          <Info />
          <Text style={newLocal_5}>Tạo phản ánh</Text>
        </TouchableOpacity>
        {userBeehomeStore.role === citizen && (
          <TouchableOpacity
            style={newLocal_6}
            activeOpacity={1}
            onPress={() => navigation.navigate(screens.BeehomeAddMemberScreen)}
          >
            <History />
            <Text style={newLocal_5}>Thành viên</Text>
          </TouchableOpacity>
        )}
        {userBeehomeStore.role === citizen ? (
          <TouchableOpacity
            style={newLocal_6}
            activeOpacity={1}
            onPress={() => navigation.navigate(screens.BeehomeChatScreen)}
          >
            <Withdraw />
            <Text style={newLocal_5}>Chat BQL</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={newLocal_6}
            activeOpacity={1}
            onPress={() => navigation.navigate(screens.BeehomeChatScreen)}
          >
            <Withdraw />
            <Text style={newLocal_5}>Chat cư dân</Text>
          </TouchableOpacity>
        )}
          {userBeehomeStore.role === citizen ? (<TouchableOpacity
          style={newLocal_6}
          activeOpacity={1}
          onPress={() => navigation.navigate(screens.CardScreen)}
        >
          <Card />
          <Text style={newLocal_5}>Đổi căn hộ</Text>
        </TouchableOpacity>)
        :
        (<TouchableOpacity
          style={newLocal_6}
          activeOpacity={1}
          onPress={() => navigation.navigate(screens.CardScreen)}
        >
          <Card />
          <Text style={newLocal_5}>Đổi toà nhà</Text>
        </TouchableOpacity>)}
      </View>
      <View style={newLocal}>
        <TouchableOpacity
          style={newLocal_6}
          activeOpacity={1}
          onPress={() => navigation.navigate(screens.BeehomeReportListScreen)}
        >
          <Note />
          <Text style={newLocal_5}>Lịch sử phản ánh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={newLocal_6}
          activeOpacity={1}
          onPress={() => navigation.navigate(screens.BeehomeInvoiceScreen)}
        >
          <Invoice />
          <Text style={newLocal_5}>Hoá đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={newLocal_6}
          activeOpacity={1}
          // onPress={() => navigation.navigate(screens.BeehomeInvoiceScreen)}
        >
          <Tool />
          <Text style={newLocal_5}>Tiện ích</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: spacing[4], marginHorizontal: spacing[4] }}>
        <ScrollView horizontal pagingEnabled>
          {newsStore.getBeehomeBanner?.map((item, index) => {
            return (
              <TouchableOpacity onPress={toDetail(item.MaTB)} key={index}>
                <Image
                  source={{ uri: item.img }}
                  style={{ width: screenWidth - spacing[4] * 2, height: 112, borderRadius: 10 }}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
      <View style={{ marginHorizontal: spacing[4], marginTop: spacing[5] }}>
        <View style={rowCenterBoth}>
          <Text style={newLocal_7}>Bảng tin cư dân</Text>
          <TouchableOpacity onPress={() => navigation.navigate(screens.BeehomeNotificationScreen)}>
            <Text style={newLocal_8}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        {[...newsStore.newsBeehome].slice().map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={toDetail(item.MaTB)}
            style={newLocal_9}
          >
            <FastImage source={{ uri: item.img }} style={newLocal_10} />
            <View style={{ marginLeft: spacing[3], flex: 1 }}>
              <Text style={newLocal_11}>{item.TieuDe}</Text>
              <Text style={newLocal_12}>{item.NgayNhap}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <EnhancedImageViewing
        images={newsStore.getBeehomeBanner?.map((item) => ({ uri: item.img })) || []}
        imageIndex={currentImageIndex}
        visible={show}
        onRequestClose={() => setShow(false)}
      />
    </Screen>
  )
})
