/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/sort-styles */
/* eslint-disable react-native/no-color-literals */
/* @flow */

import React, { Component } from "react"
import { View, Image, TouchableHighlight, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import { RFValue } from "react-native-responsive-fontsize"
import { Text } from "../../components"
import { spacing } from "../../theme"
import NotiIcon from "./assets/noti.svg"
const newLocal = {
  fontSize: RFValue(14),
  fontWeight: "bold",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "left",
  color: "#2b2b2b",
}
export const NotificationItem = (props) => {
  const { item } = props
  return (
    <TouchableHighlight underlayColor="transparent">
      <View style={[styles.notify_item, item.read_flag === 0 ? styles.notify_item_active : null]}>
        <View style={styles.notify_item_image_box}>
          <NotiIcon />
        </View>

        <View style={styles.notify_item_content}>
          <View style={styles.notify_item_content_box}>
            <Text style={newLocal}>Thông báo</Text>
            <Text style={styles.notify_item_title}>{item.NoiDung}</Text>
            <Text style={styles.notify_item_time}>{item.NgayGui}</Text>
            {/* <Text style={styles.notify_item_desc}>
                {sub_string(item.short_content, 60)}
              </Text> */}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  notify_item: {
    backgroundColor: "#ffffff",
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    flexDirection: "row",
    borderColor: "#dddddd",
  },
  notify_item_active: {
    backgroundColor: "#ebebeb",
  },
  notify_item_image_box: {
    width: 36,
    height: 36,
    backgroundColor: "#c7dcff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  notify_item_image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 2,
  },
  notify_item_content: {
    flex: 1,
  },
  notify_item_content_box: {
    flex: 1,
    paddingLeft: 15,
  },
  notify_item_title: {
    fontFamily: "Mulish",
    fontSize: RFValue(14),
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    color: "#444444",
  },
  notify_item_time_box: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  notify_item_time: {
    fontSize: RFValue(14),
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    color: "#a1a1a1",
  },
})
