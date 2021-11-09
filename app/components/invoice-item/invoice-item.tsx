import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import { Invoice } from "../../models"
import { RFValue } from "react-native-responsive-fontsize"

const CONTAINER: ViewStyle = {
  borderRadius: 10,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 8,
  shadowOpacity: 1,
  padding: spacing[4],
  marginBottom: spacing[4],
  borderWidth: 0.3,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: RFValue(14),
  color: color.primary,
}

export interface InvoiceItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item?: Invoice
}

const newLocal = {
  fontSize: RFValue(12),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#666666",
}
const newLocal_1 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "right",
  color: "#323232",
}
const newLocal_2 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#323232",
}
const newLocal_3 = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: spacing[2],
}
const newLocal_4 = {
  height: 1,
  backgroundColor: "#eeeeee",
  marginVertical: spacing[4],
}
const newLocal_5 = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "right",
  color: "#ea6d1f",
}
/**
 * Describe your component here
 */
export const InvoiceItem = observer(function InvoiceItem(props: InvoiceItemProps) {
  const { style, item } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <View>
        <Text style={newLocal_2}>{item.TenDichVu}</Text>
        <View style={newLocal_3}>
          <Text style={newLocal}>
            Kỳ:<Text style={newLocal_1}> {item.KyThanhToan}</Text>
          </Text>
          <Text style={newLocal}>
            Căn hộ:<Text style={newLocal_1}> {item.ThuocKhachHang}</Text>
          </Text>
        </View>
      </View>
      <View style={newLocal_4} />
      <View style={[newLocal_3, { marginTop: spacing[0] }]}>
        <Text style={newLocal}>Số tiền:</Text>
        <Text style={newLocal_5}>
          {
            (item.SoTien || 0)
              .toFixed(3)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              .split(".")[0]
          }
        </Text>
      </View>
    </View>
  )
})
