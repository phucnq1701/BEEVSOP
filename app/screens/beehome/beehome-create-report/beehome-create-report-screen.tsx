import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"
import { Button, Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize"

import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import { Input } from "react-native-elements/dist/input/Input"
import DropDownPicker from "react-native-dropdown-picker"
import Camera from "./assets/camera.svg"
import ImagePicker from "react-native-image-crop-picker"
import FastImage from "react-native-fast-image"
import Click from "./assets/Group 3.4.svg"
import Toast from "react-native-toast-message"
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet"
const ROOT: ViewStyle = {
  backgroundColor: color.palette.beehome,
  flex: 1,
}

const newLocal = {
  fontFamily: "Mulish",
  fontSize: RFValue(12),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#444444",
}
const newLocal_1 = {
  borderBottomWidth: 1,
  borderBottomColor: "#dddddd",
}
const newLocal_2 = {
  fontSize: RFValue(14),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: color.palette.black,
}
const newLocal_3 = {
  width: 100,
  height: 100,
  borderRadius: 6,
  backgroundColor: "#eaf2ff",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#3784ff",
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing[4],
}
const newLocal_4 = {
  borderWidth: 0,
  borderBottomWidth: 1,
  borderBottomColor: "#dddddd",
  paddingHorizontal: 0,
}
const newLocal_5 = {
  borderWidth: 0,
  paddingHorizontal: 0,
}
const newLocalImage = {
  width: 100,
  height: 100,
  borderRadius: 5,
  marginRight: spacing[4],
  marginBottom: spacing[4],
}
const newLocal_6 = { position: "absolute", top: -15, right: -5 }
const newLocal_7 = { textAlign: "left", marginLeft: spacing[4], color: color.palette.white }
const newLocal_8 = {
  height: 40,
  borderRadius: 4,
  backgroundColor: "#3784ff",
  marginTop: spacing[4],
}
const newLocal_9 = {
  fontSize: RFValue(16),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "center",
  color: "#666666",
}
export const BeehomeCreateReportScreen = observer(function BeehomeCreateReportScreen() {
  // Pull in one of our MST stores
  const { requestTypesStore, userBeehomeStore, requestStore } = useStores()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["15%"], [])
  // const { dismiss, dismissAll } = useBottomSheetModal();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])
  // Pull in navigation via hook
  const navigation = useNavigation()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [selectedImages, setSelectedImages] = useState([])
  const getType = async () => {
    if (requestTypesStore.requestTypeList.length === 0) {
      await requestTypesStore
        .getRequestTypes({
          MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
          MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
        })
        .then((resp) => {})
        .catch((err) => console.log("err", err))
    }
  }
  useEffect(() => {
    getType()
  }, [])

  useEffect(() => {
    if (requestTypesStore.requestTypeList.length > 0) {
      const arr = []
      requestTypesStore.requestTypeList.forEach((item) => {
        if (item.IsViewApCuDan) {
          arr.push({
            label: item.TenLYC,
            value: item.MaLYC,
          })
        }
      })
      setItems(arr)
    }
  }, [requestTypesStore.requestTypeList])

  // const onSelectMode = () => {
  //   <Button onPress={handlePresentModalPress} title="Present Modal" color="black" />

  // }
  const onOpenPicker = () => {
    bottomSheetModalRef.current?.dismiss()

    ImagePicker.openPicker({
      multiple: true,
    }).then(async (images) => {
      const formdata = new FormData()
      images.forEach((item, i) => {
        formdata.append("", {
          uri: item.path,
          type: "image/jpeg",
          name: item.filename || `filename${i}.jpg`,
        })
      })
      await userBeehomeStore
        .uploadFile(userBeehomeStore.users[userBeehomeStore.selected].MaCode, formdata)
        .then((resp) => {
          if (Array.isArray(resp)) {
            const uploadedImg = resp.map((item) => ({
              HinhAnh: item,
            }))
            setSelectedImages([...selectedImages, ...uploadedImg])
          }
        })
    })
  }

  const onOpenCamera = () => {
    bottomSheetModalRef.current?.dismiss()

    ImagePicker.openCamera({}).then(async (image) => {
      const formdata = new FormData()
      formdata.append("", {
        uri: image.path,
        type: "image/jpeg",
        name: image.filename || `filename${new Date().toDateString}.jpg`,
      })
      await userBeehomeStore
        .uploadFile(userBeehomeStore.users[userBeehomeStore.selected].MaCode, formdata)
        .then((resp) => {
          if (Array.isArray(resp)) {
            const uploadedImg = resp.map((item) => ({
              HinhAnh: item,
            }))
            setSelectedImages([...selectedImages, ...uploadedImg])
          }
        })
    })
  }

  const onDelete = (index) => () => {
    const arr = [...selectedImages]
    arr.splice(index, 1)
    setSelectedImages(arr)
  }

  const onCreate = async () => {
    if (!title || !content || !value) {
      Toast.show({
        type: "my_custom_type",
        position: "bottom",
        text2: "Bạn cần nhập đầy đủ thông tin",
      })
      return
    }
    // if (selectedImages.length === 0) {
    //   Toast.show({
    //     text1: "Thông báo",
    //     text2: "Bạn cần thêm ảnh",
    //   })
    //   return
    // }
    requestStore
      .createRequest({
        MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
        TieuDe: title,
        NoiDung: content,
        MaLYC: value,
        RequestIMG: selectedImages,
      })
      .then((resp) => {
        if (resp === "SUCCESS") {
          Toast.show({
            type: "my_custom_type",
            position: "bottom",
            text2: "Tạo yêu cầu thành công",
          })
          navigation.goBack()
        } else {
          Toast.show({
            type: "my_custom_type",
            position: "bottom",
            text2: "Tạo yêu cầu thất bại. Vui lòng thử lại sau",
          })
        }
      })
  }

  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header
        headerText="Tạo phản ánh"
        style={{ backgroundColor: color.palette.beehome }}
        leftIcon="whiteBack"
        titleStyle={newLocal_7}
        onLeftPress={navigation.goBack}
      />
      <View style={{ flex: 1, backgroundColor: color.palette.white }}>
        <ScrollView
          contentContainerStyle={{ backgroundColor: color.palette.white, padding: spacing[4] }}
        >
          <Input
            label="Tiêu đề"
            labelStyle={newLocal}
            inputContainerStyle={newLocal_1}
            inputStyle={newLocal_2}
            onChangeText={setTitle}
            containerStyle={{ paddingHorizontal: 0 }}
          />
          <Text style={newLocal}>Loại yêu cầu</Text>
          <DropDownPicker
            open={open}
            value={value}
            placeholder=""
            items={items}
            containerStyle={newLocal_5}
            style={newLocal_4}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={{ borderWidth: 0.5 }}
          />
          <Input
            label="Nội dung"
            labelStyle={newLocal}
            numberOfLines={5}
            onChangeText={setContent}
            multiline={true}
            containerStyle={{ marginTop: spacing[4], paddingHorizontal: 0 }}
            inputContainerStyle={newLocal_1}
            inputStyle={[newLocal_2, { height: 100 }]}
          />
          <Text style={newLocal}>File đính kèm</Text>
          <View style={{ marginTop: spacing[4], flexDirection: "row", flexWrap: "wrap" }}>
            <TouchableOpacity style={newLocal_3} onPress={handlePresentModalPress}>
              <Camera />
            </TouchableOpacity>
            {selectedImages.map((item, index) => (
              <View key={index}>
                <FastImage source={{ uri: item.HinhAnh }} style={newLocalImage} />
                <TouchableOpacity style={newLocal_6} onPress={onDelete(index)}>
                  <Click />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Button disabled={requestStore.loading} style={newLocal_8} onPress={onCreate}>
            {requestStore.loading ? (
              <ActivityIndicator color={color.palette.white} />
            ) : (
              <Text>Tạo yêu cầu</Text>
            )}
          </Button>
        </ScrollView>
      </View>
      <BottomSheetModalProvider>
        <View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <View style={{ paddingTop: spacing[6] }}>
              <TouchableOpacity style={{ marginBottom: spacing[4] }} onPress={onOpenCamera}>
                <Text style={newLocal_9}>Chụp ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onOpenPicker}>
                <Text style={newLocal_9}>Chọn từ thư viện</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </Screen>
  )
})
