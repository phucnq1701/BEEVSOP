import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import { Request } from "../../models"
import { RFValue } from "react-native-responsive-fontsize";


const CONTAINER: ViewStyle = {
  borderRadius: 5,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.1)",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 8,
  shadowOpacity: 1,
  marginBottom:spacing[5]
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: RFValue(14),
  color: color.primary,
}

export interface ReportItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item?: Request
  onPress?: () => void
}

const newLocal = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#444444",
}
const newLocal_1 = {
  fontSize: RFValue(12),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#888888",
  marginTop:spacing[1]
}
const newLocal_2 = {
  backgroundColor: "#faeddf",
  padding: spacing[4],
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const newLocal_3 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#935d2b",
}
const newLocal_4 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "right",
  color: "#323232",
}
/**
 * Describe your component here
 */
export const ReportItem = observer(function ReportItem(props: ReportItemProps) {
  // const { style } = props
  const styles = flatten([CONTAINER])
  const { item } = props
  return (
    <TouchableOpacity style={styles} onPress={props.onPress}>
      <View style={{ margin: spacing[4] }}>
        <Text style={newLocal}>{item.TieuDe}</Text>
        <Text  numberOfLines={1} style={newLocal_1}>{item.TenPhongBan || ''}</Text>
      </View>
      <View style={[newLocal_2,{backgroundColor:item.MauNen}]}>
        <Text style={newLocal_3}>{item.TenTT}</Text>
        <Text style={newLocal_4}>{item.NgayYC}</Text>
      </View>
    </TouchableOpacity>
  )
})
