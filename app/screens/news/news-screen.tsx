import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../models"

import { color, spacing } from "../../theme"
import { screens } from "../../navigators/screen"
import FastImage from "react-native-fast-image"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.background,
  flex: 1,
}

const newLocal = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "right",
  color: "#3784ff",
  marginTop: spacing[3],
}
const newLocal_1 = {
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "center",
  color: "#323232",
}
const newLocal_2 = {
  height: 200,
  borderRadius: 8,
}
const newLocal_3 = {
  backgroundColor: color.palette.white,
  marginHorizontal: spacing[4],
  marginTop: spacing[4],
  borderRadius: 8,
  shadowColor: "rgba(0, 0, 0, 0.1)",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 8,
  shadowOpacity: 1,
}

const NewsComponent = ({ item, index }) => {
  const navigation = useNavigation()
  return (
    <View key={index} style={newLocal_3}>
      <FastImage source={{ uri: item.imgIcon }} style={newLocal_2} />
      <View style={{ padding: spacing[4] }}>
        <Text style={newLocal_1}>{item.TieuDe}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(screens.NewsDetailScreen, { id: item.ID })}
        >
          <Text style={newLocal}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export const NewsScreen = observer(function NewsScreen() {
  // Pull in one of our MST stores
  const { newsStore, userStore } = useStores()
  const onEndReachedCalledDuringMomentum = useRef(true)

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const limit = useRef(20)
  const offset = useRef(0)
  const getData = (isLoadmore) => {
    newsStore.getNews(
      {
        DiDong: userStore.phone,
        TenCTDK: userStore.cards[userStore.selected].TenCTDK,
        Limit: limit.current,
        Offset: offset.current,
      },
      isLoadmore,
    )
  }
  useEffect(() => {
    getData(false)
  }, [])

  const onLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum.current) {
      if (newsStore.news.length > 3) {
        offset.current += limit.current
        getData(true)
        onEndReachedCalledDuringMomentum.current = true
      }
    }
  }
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header headerText="Tin tức" leftIcon="back" onLeftPress={navigation.goBack} />
      <FlatList
        onRefresh={getData}
        refreshing={refreshing}
        data={[...newsStore.news].slice()}
        keyExtractor={(item) => String(item.ID)}
        renderItem={(item) => <NewsComponent {...item} />}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false
        }}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.2}
      />
    </Screen>
  )
})
