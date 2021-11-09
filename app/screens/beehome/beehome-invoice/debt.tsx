import React, { useEffect, useRef, useState } from "react"
import { View, Text, FlatList } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { InvoiceItem } from "../../../components"
import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"

const newLocal = { flex: 1, backgroundColor: color.palette.backgroundBeehome }
const newLocal_1 = {
  fontSize:  RFValue(10),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 15,
  letterSpacing: 0,
  textAlign: "left",
  color: "#2b2b2b",
}
const newLocal_2 = {
  fontSize:  RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#ea6d1f",
  marginTop:spacing[2]
}
const newLocal_3 = {
  height: 82,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.25)",
  shadowOffset: {
    width: 0,
    height: -0.5,
  },
  shadowRadius: 0,
  shadowOpacity: 1,
  padding: spacing[4],
  paddingBottom: spacing[5],
}
export const Debt = () => {
  const { invoiceStore, userBeehomeStore } = useStores()
  const onEndReachedCalledDuringMomentum = useRef(true)

  // Pull in navigation via hook
  const [refreshing, setRefreshing] = useState(false)
  const limit = useRef(20)
  const offset = useRef(0)
  const getData = (isLoadMore) => {
    invoiceStore.getInvoices(
      {
        MaMB: userBeehomeStore.users[userBeehomeStore.selected].MaMB,
        MaCode: userBeehomeStore.users[userBeehomeStore.selected].MaCode,
        Limit: limit.current,
        Offset: offset.current,
      },
      isLoadMore,
    )
  }
  useEffect(() => {
    getData(false)
  }, [])

  const onLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum.current) {
      if (invoiceStore.invoices.length > 3) {
        offset.current += limit.current
        getData(true)
        onEndReachedCalledDuringMomentum.current = true
      }
    }
  }
  return (
    <View style={newLocal}>
      <FlatList
        onRefresh={getData}
        refreshing={refreshing}
        contentContainerStyle={{ marginTop: spacing[4], padding: spacing[4] }}
        data={[...invoiceStore.invoices].slice()}
        keyExtractor={(item) => String(item.ID)}
        renderItem={(item) => <InvoiceItem {...item} />}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false
        }}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.2}
      />
      <View style={newLocal_3}>
        <Text style={newLocal_1}>Tổng công nợ: </Text>
        <Text style={newLocal_2}>
          {
            invoiceStore.invoices
              .reduce((prev, current) => current.ConLai + prev, 0)
              .toFixed(3)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              .split(".")[0]
          }
        </Text>
      </View>
    </View>
  )
}

export default Debt
