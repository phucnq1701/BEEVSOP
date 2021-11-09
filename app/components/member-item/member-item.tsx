import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"
import { Member } from "../../models"
import { RFValue } from "react-native-responsive-fontsize";
import Avatar from "../../screens/beehome/beehome-add-member/assets/avatar.svg"
import Trash from "../../screens/beehome/beehome-add-member/assets/trash.svg"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: RFValue(14),
  color: color.primary,
}

export interface MemberItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item?: Member
  onDelete?: (id) => void
}

const newLocal = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing[4] + spacing[1],
}
const newLocal_1 = {
  flexDirection: "row",
  alignItems: "center",
}
const newLocal_2 = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#2b2b2b",
}
const newLocal_3 = {
  fontSize: RFValue(12),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "left",
  color: "#888888",
}
/**
 * Describe your component here
 */
export const MemberItem = observer(function MemberItem(props: MemberItemProps) {
  const { style, item, onDelete } = props
  const styles = flatten([CONTAINER, style])
  const onDeleteItem = () => onDelete(item.ID)
  return (
    <View style={newLocal}>
      <View style={newLocal_1}>
        <Avatar />
        <View style={{ marginLeft: spacing[4] }}>
          <Text style={newLocal_2}>{item.HoTenNK}</Text>
          <Text style={newLocal_3}>{item.DienThoai}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onDeleteItem}>
        <Trash />
      </TouchableOpacity>
    </View>
  )
})
