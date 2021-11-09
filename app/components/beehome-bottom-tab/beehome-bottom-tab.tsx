/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from "react"
import {
  Animated,
  Dimensions,
  SafeAreaView,
  Image,
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native"
import { screens } from "../../navigators/screen"
import { color, spacing } from "../../theme"
import { Text } from "../text/text"
import Home from "./assets/home.svg"
import ActiveHome from "./assets/activehome.svg"
import User from "./assets/user.svg"
import Code from "./assets/code.svg"
import ActiveUser from "./assets/activeuser.svg"
import { RFValue } from "react-native-responsive-fontsize"

const bottomBarCont: ViewStyle = {
  flexDirection: "row",
  backgroundColor: color.palette.white,
  shadowColor: "rgba(0, 0, 0, 0.3)",
  shadowOffset: {
    width: 0,
    height: -0.5,
  },
  shadowRadius: 0,
  shadowOpacity: 1,
}

const itemCont: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "center",
  paddingVertical: spacing[2],
}
const itemCenter: ViewStyle = {
  width: 69,
  height: 69,
  borderRadius: 40,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  backgroundColor: "#1074be",
  // position: 'absolute',
  // bottom: 30,
}

const normal: TextStyle = {
  fontSize: RFValue(10),
  fontWeight: "600",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "center",
  marginTop: spacing[1],
  color: "#999999",
}
const focused: TextStyle = {
  fontSize: RFValue(10),
  fontWeight: "600",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "center",
  marginTop: spacing[1],
  color: "#2f79f6",
}

export function BeehomeBottomTab({ state, descriptors, navigation }) {
  return (
    <View style={bottomBarCont}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const iconMapping = {
          [screens.HomeScreen]: {
            image: <Home width={21} height={21} />,
            activeImage: <ActiveHome width={21} height={21} />,
            label: "Trang chủ",
          },
          [screens.BarcodeScreen]: {
            image: <Code width={40} height={40} />,
            activeImage: <Code width={40} height={40} />,
            label: "",
          },
          [screens.AccountScreen]: {
            image: <User width={21} height={21} />,
            label: "Tài khoản",
            activeImage: <ActiveUser width={21} height={21} />,
          },
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            activeOpacity={1}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
            style={itemCont}
          >
            {isFocused ? iconMapping[label].activeImage : iconMapping[label].image}

            {/* <Image
              source={iconMapping[label].image}
              style={[
                iconMapping[label].style,
                index !== 1 && { tintColor: isFocused ? color.primary : "#999999" },
              ]}
            /> */}
            <Text style={isFocused ? focused : normal}>{iconMapping[label].label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export const MemoizedBeehomeBottomTab = React.memo(BeehomeBottomTab)
