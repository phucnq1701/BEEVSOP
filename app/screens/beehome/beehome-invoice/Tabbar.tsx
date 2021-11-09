import React from "react"
import { View, TouchableOpacity, Image, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Text } from "../../../components"
import { spacing, color } from "../../../theme"

// const iconMapping = {
//   info: require("../../navigation/drawer/user.png"),
//   limit: require("./icons/awardSolid.png"),
//   account: require("./icons/creditCardSolid.png"),
//   address: require("./icons/pin.png"),
// }

const inactiveText: TextStyle = {
  fontSize: RFValue(12),
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "center",
  color: "#a1a1a1",
}

const activeText: TextStyle = {
  fontSize: RFValue(12),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 18,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ea6d1f",
}

const container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  height: 38,
  backgroundColor: color.palette.white,
  // marginHorizontal: spacing[4],
}
const touchableContainer: ViewStyle = {
  alignItems: "center",
  justifyContent: "space-between",
  flex: 1,
  height: 38,
  paddingHorizontal: spacing[2],
}
const linearGradient = { flex: 1, borderRadius: 20 }
export function TabBar({ navigationState, jumpTo }) {
  const onPress = (index) => {
    jumpTo(index)
  }
  return (
    <View style={container}>
      {navigationState.routes.map((route, index) => {
        const isFocused = navigationState.index === index
        const slash = {
          width: 171,
          height: 2,
          backgroundColor: isFocused ? "#ea6d1f" : color.palette.white,
        }
        return (
          <TouchableOpacity
            style={touchableContainer}
            key={index}
            onPress={() => {
              onPress(route.key)
            }}
          >
            <View />
            <Text style={isFocused ? activeText : inactiveText}>{route.title}</Text>
            <View style={slash} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default React.memo(TabBar)
