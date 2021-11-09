import React, { useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize"
import { ifIphoneX } from "react-native-iphone-x-helper"
import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import { GiftedChat } from "react-native-gifted-chat"
import { v4 as uuidv4 } from "uuid"
import { Icon } from "react-native-elements/dist/icons/Icon"
import Collapsible from "react-native-collapsible"
import FastImage from "react-native-fast-image"
import EnhancedImageViewing from "../../../components/image-viewing/ImageViewing"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.beehome,
  flex: 1,
}

const newLocal = { textAlign: "left", marginLeft: spacing[4], color: color.palette.white }
const newLocal_1 = {
  height: 1,
  backgroundColor: "#eeeeee",
}
const newLocal_2 = {
  fontSize: RFValue(12),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#888888",
}
const newLocal_3 = {
  fontSize: RFValue(12),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "center",
  color: "#888888",
  marginBottom: spacing[2],
}
const newLocal_4 = {
  fontSize: RFValue(16),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: "#da0000",
  marginTop: spacing[4],
  marginBottom: spacing[2],
}
const newLocal_5 = {
  borderRadius: 10,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 8,
  shadowOpacity: 1,
  position: "absolute",
  ...ifIphoneX(
    {
      top: 110,
    },
    {
      top: 60,
    },
  ),

  left: spacing[4],
  right: spacing[4],
}
const newLocal_6 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "right",
  color: "#da0000",
}
const newLocal_7 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ea6d1f",
  marginVertical: spacing[4],
}
const newLocal_8 = {
  padding: spacing[4],
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
const newLocal_9 = {
  width: 68,
  height: 68,
  borderRadius: 5,
  marginRight: spacing[3],
}
export const BeehomeReportDetailScreen = observer(function BeehomeReportDetailScreen({ route }) {
  // Pull in one of our MST stores
  const { requestStore, userBeehomeStore } = useStores()
  const { MaYC } = route.params
  const [detail, setDetail] = useState(null)
  const [show, setShow] = useState(false)
  const [currentImageIndex, setImageIndex] = useState(0)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const navigation = useNavigation()

  const [messages, setMessages] = useState([])

  useEffect(() => {
    requestStore
      .getRequestDetail({
        Offset: 0,
        Limit: 100,
        MaYC: MaYC,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
        MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
      })
      .then((resp) => {
        if (resp) {
          setDetail(resp)
          if (resp.TaskProcess && Array.isArray(resp.TaskProcess)) {
            const arr = []
            resp.TaskProcess.forEach((element) => {
              const data = {
                createdAt: element.NgayXL,
                text: element.NoiDung,
                user: {
                  _id: 2,
                },
                id: uuidv4(),
              }
              arr.push(data)
            })
            onSend(arr)
          }
        }
      })
    // setMessages([
    //   {
    //     _id: 1,
    //     text: "Hello developer",
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any",
    //     },
    //   },
    // ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [])
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header
        headerText="Chi tiết phản ánh"
        style={{ backgroundColor: color.palette.beehome }}
        leftIcon="whiteBack"
        titleStyle={newLocal}
        onLeftPress={navigation.goBack}
      />
      <View style={{ flex: 1, backgroundColor: color.palette.backgroundBeehome }}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
      <View style={newLocal_5}>
        <Text style={newLocal_4}>{detail?.Request?.TieuDe || ""}</Text>
        <Text style={newLocal_3}>{detail?.Request?.TenPhongBan || ""}</Text>
        <View style={newLocal_1} />
        <View style={newLocal_8}>
          <Text style={newLocal_2}>Trạng thái</Text>
          <Text style={newLocal_6}>{detail?.Request?.TenTT || ""}</Text>
        </View>
        <View style={newLocal_1} />
        <Collapsible collapsed={isCollapsed}>
          <View style={newLocal_8}>
            <Text style={newLocal_2}>Nhân viên xử lí</Text>
            <Text style={newLocal_6}>{""}</Text>
          </View>
          <View style={newLocal_1} />
          <View style={newLocal_8}>
            <Text style={newLocal_2}>Thời gian yêu cầu</Text>
            <Text style={newLocal_6}>{detail?.Request?.NgayYC || ""}</Text>
          </View>
          <View style={newLocal_1} />
          <View style={[newLocal_8, { flexDirection: "column", alignItems: "flex-start" }]}>
            <Text style={newLocal_2}>Nội dung</Text>
            <Text
              style={[newLocal_6, { color: "#323232", marginTop: spacing[3], textAlign: "left" }]}
            >
              {detail?.Request?.NoiDung || ""}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: spacing[4] }}>
            {detail?.Request?.ImageRequest.map((item, index) => {
              return (
                <TouchableOpacity  key={index} onPress={() => setShow(true)}>
                  <FastImage source={{ uri: item.DuongDan }} style={newLocal_9} />
                </TouchableOpacity>
              )
            })}
          </View>
          <View style={newLocal_1} />
        </Collapsible>
        <TouchableOpacity
          onPress={() => setIsCollapsed(!isCollapsed)}
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}
        >
          <Text style={newLocal_7}>{isCollapsed ? "Mở rộng" : "Thu gọn"}</Text>
          <Icon name={isCollapsed ? "chevron-down" : "chevron-up"} type="entypo" color="#ea6d1f" />
        </TouchableOpacity>
      </View>
      <EnhancedImageViewing
        images={detail?.Request?.ImageRequest.map((item) => ({ uri: item.DuongDan })) || []}
        imageIndex={currentImageIndex}
        visible={show}
        onRequestClose={() => setShow(false)}
      />
    </Screen>
  )
})
