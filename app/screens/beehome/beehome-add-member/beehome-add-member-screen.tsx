import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Button, Header, MemberItem, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize"

import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import { Icon } from "react-native-elements/dist/icons/Icon"
import Modal from "react-native-modal"
import { Input } from "react-native-elements"
import Toast from "react-native-toast-message"
import { toastConfig } from "../../../app"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.beehome,
  flex: 1,
}
const newLocal_7 = { textAlign: "left", marginLeft: spacing[4], color: color.palette.white }

const newLocal = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#323232",
}
const newLocal_1 = {
  backgroundColor: color.palette.backgroundBeehome,
  flex: 1,
  padding: spacing[4],
}
const newLocal_2 = {
  width: 56,
  height: 56,
  backgroundColor: "#ea6d1f",
  shadowColor: "rgba(0, 0, 0, 0.2)",
  shadowOffset: {
    width: 1,
    height: 2,
  },
  shadowRadius: 6,
  shadowOpacity: 1,
  borderRadius: 30,
  position: "absolute",
  right: 27,
  bottom: 40,
  justifyContent: "center",
  alignItems: "center",
}
const newLocal_3 = {
  fontSize: RFValue(16),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 24,
  letterSpacing: 0,
  textAlign: "center",
  color: "#444444",
}
const newLocal_4 = {
  flex: 0.7,
  backgroundColor: color.palette.white,
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  padding: spacing[4],
}
const newLocal_5 = {
  margin: 0,
  justifyContent: "flex-end",
  flex: 1,
}
const newLocal6 = {
  fontFamily: "Mulish",
  fontSize: RFValue(12),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#444444",
}
const newLocal7 = {
  borderBottomWidth: 1,
  borderBottomColor: "#dddddd",
}
const newLocal8 = {
  fontSize: RFValue(14),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: color.palette.black,
}
const newLocal_8 = {
  height: 40,
  borderRadius: 4,
  backgroundColor: "#3784ff",
  marginTop: spacing[4],
}
const newLocal_6 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ffffff",
}
const newLocal_9 = { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }
export const BeehomeAddMemberScreen = observer(function BeehomeAddMemberScreen() {
  // Pull in one of our MST stores
  const { userBeehomeStore, memberStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const onEndReachedCalledDuringMomentum = useRef(true)

  // Pull in navigation via hook
  const [refreshing, setRefreshing] = useState(false)
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const limit = useRef(20)
  const offset = useRef(0)
  const getData = () => {
    memberStore.getMembers({
      MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
      MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
      Limit: limit.current,
      Offset: offset.current,
    })
  }
  useEffect(() => {
    getData()
    return () => {
      setPhone("")
      setEmail("")
      setName("")
    }
  }, [])

  const onLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum.current) {
      if (memberStore.members.length > 3) {
        offset.current += limit.current
        getData()
        onEndReachedCalledDuringMomentum.current = true
      }
    }
  }
  const onDelete = (id) => {
    memberStore
      .deleteMember({
        MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
        ID: id,
      })
      .then((resp) => {
        getData()
      })
  }
  const memolizedData = useMemo(() => [...memberStore.members].slice(), [memberStore.members])

  const onHide = useCallback(() => {
    setShow(false)
  }, [])

  const onShow = useCallback(() => {
    setShow(true)
  }, [])

  const alertDelete = (id) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa thành viên này?", [
      {
        text: "Cancel",

        style: "cancel",
      },
      { text: "OK", onPress: () => onDelete(id) },
    ])
  }

  const onCreate = async () => {
    if (!name) {
      Toast.show({
        type: "my_custom_type",
        position: "bottom",
        text2: "Không để trống họ tên thành viên",
      })
      return
    }
    memberStore
      .createMember({
        MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
        FullName: name,
        Mobile: phone,
        Email: email,
      })
      .then((resp) => {
        if (resp === "SUCCESS") {
          Toast.show({
            type: "my_custom_type",
            position: "bottom",
            text2: "Tạo thành viên thành công",
          })
          setTimeout(() => {
            setShow(false)
            getData()
          }, 500)
        }
      })
  }

  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header
        headerText="Thành viên"
        style={{ backgroundColor: color.palette.beehome }}
        leftIcon="whiteBack"
        titleStyle={newLocal_7}
        onLeftPress={navigation.goBack}
      />
      <View style={newLocal_1}>
        <Text style={newLocal}>Danh sách thành viên</Text>
        <FlatList
          onRefresh={getData}
          refreshing={refreshing}
          contentContainerStyle={{ marginTop: spacing[4] }}
          data={[...memberStore.members].slice()}
          keyExtractor={(item) => String(item.ID)}
          renderItem={(item) => <MemberItem onDelete={alertDelete} {...item} />}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false
          }}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.2}
        />
      </View>
      <TouchableOpacity style={newLocal_2} onPress={onShow}>
        <Icon name="plus" type="feather" color={color.palette.white} />
      </TouchableOpacity>
      <Modal isVisible={show} style={newLocal_5}>
        <View style={newLocal_4}>
          <View style={newLocal_9}>
            <TouchableOpacity onPress={onHide}>
              <Icon name="close" type="ant-design" />
            </TouchableOpacity>
            <Text style={newLocal_3}>Thêm thành viên</Text>
            <View />
          </View>
          <ScrollView>
            <Input
              label="Họ và tên"
              labelStyle={newLocal6}
              placeholder="Tên thành viên"
              onChangeText={setName}
              containerStyle={{ marginTop: spacing[4], paddingHorizontal: 0 }}
              inputContainerStyle={newLocal7}
              inputStyle={newLocal8}
            />
            <Input
              label="Số điện thoại"
              labelStyle={newLocal6}
              onChangeText={setPhone}
              placeholder="Số điện thoại thành viên"
              containerStyle={{ marginTop: spacing[4], paddingHorizontal: 0 }}
              inputContainerStyle={newLocal7}
              inputStyle={newLocal8}
            />
            <Input
              label="Email"
              labelStyle={newLocal6}
              placeholder="Email thành viên"
              onChangeText={setEmail}
              containerStyle={{ marginTop: spacing[4], paddingHorizontal: 0 }}
              inputContainerStyle={newLocal7}
              inputStyle={newLocal8}
            />
            <Button disabled={memberStore.loading} style={newLocal_8} onPress={onCreate}>
              {memberStore.loading ? (
                <ActivityIndicator color={color.palette.white} />
              ) : (
                <Text style={newLocal_6}>Lưu thành viên</Text>
              )}
            </Button>
          </ScrollView>
        </View>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </Modal>
    </Screen>
  )
})
