import React, { useCallback, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize"

import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import { ReportItem } from "../../../components/report-item/report-item"
import { screens } from "../../../navigators/screen"
import { Icon } from "react-native-elements"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.beehome,
  flex: 1,
}

const stylesHeader = { textAlign: "left", marginLeft: spacing[4], color: color.palette.white }
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
  padding: spacing[4],
  backgroundColor: color.palette.backgroundBeehome,
  flex: 1,
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
  fontSize: RFValue(14),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#555555",
}
const newLocal_4 = {
  paddingHorizontal: spacing[3],
  height: 29,
  borderRadius: 30,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#dddddd",
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing[4],
}
export const BeehomeReportListScreen = observer(function BeehomeReportListScreen() {
  // Pull in one of our MST stores
  const { requestStore, userBeehomeStore, requestStatusStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const onEndReachedCalledDuringMomentum = useRef(true)

  // Pull in navigation via hook
  const [refreshing, setRefreshing] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(0)
  const limit = useRef(20)
  const offset = useRef(1)
  const getData = (isLoadmore) => {
    requestStore.getRequest(
      {
        MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
        Limit: limit.current,
        StatusID: selectedStatus,
        Offset: offset.current,
      },
      isLoadmore,
    )
  }

  const getRequestStatusList = () => {
    requestStatusStore.getRequest({
      CompanyCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
      Mobile: userBeehomeStore.users[userBeehomeStore.selected].User.DienThoaiKH,
      MaTN: userBeehomeStore.users[userBeehomeStore.selected]?.Apartment?.MaTN || null,
    })
  }

  useEffect(() => {
    getData(false)
  }, [selectedStatus])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData(false)
      getRequestStatusList()
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  const onLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum.current) {
      if (requestStore.requestList.length > 3) {
        offset.current += limit.current
        getData(true)
        onEndReachedCalledDuringMomentum.current = true
      }
    }
  }

  const onPress = (MaYC) => () => {
    navigation.navigate(screens.BeehomeReportDetailScreen, { MaYC })
  }

  const toCreate = useCallback(() => {
    navigation.navigate(screens.BeehomeCreateReportScreen)
  }, [])
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header
        headerText="Phản ánh"
        style={{ backgroundColor: color.palette.beehome }}
        leftIcon="whiteBack"
        titleStyle={stylesHeader}
        onLeftPress={navigation.goBack}
      />
      <View style={newLocal_1}>
        <Text style={newLocal}>Danh sách phản ánh</Text>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginVertical: spacing[4] }}
          >
            {requestStatusStore.getAvailableStatus?.map((item, index) => (
              <TouchableOpacity
                onPress={() => setSelectedStatus(item.MaTT)}
                key={index}
                style={[
                  newLocal_4,
                  {
                    backgroundColor: item.MaTT === selectedStatus ? "#ffebdf" : `#f8f8f8`,
                  },
                ]}
              >
                <Text
                  style={[
                    newLocal_3,
                    { color: item.MaTT === selectedStatus ? "#ea6d1f" : "#555555" },
                  ]}
                >
                  {item.TenTT}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <FlatList
          onRefresh={getData}
          refreshing={refreshing}
          contentContainerStyle={{ marginTop: spacing[4] }}
          data={[...requestStore.requestList].slice()}
          keyExtractor={(item) => String(item.ID)}
          renderItem={(item) => <ReportItem onPress={onPress(item.item.ID)} {...item} />}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false
          }}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.2}
        />
        <TouchableOpacity style={newLocal_2} onPress={toCreate}>
          <Icon name="plus" type="feather" color={color.palette.white} />
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
