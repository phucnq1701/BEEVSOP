import React, { useCallback, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Header, Screen, Text } from "../../../components"
import { useNavigation } from "@react-navigation/native"
import { RFValue } from "react-native-responsive-fontsize";

import { useStores } from "../../../models"
import { color, spacing } from "../../../theme"
import { GiftedChat } from "react-native-gifted-chat"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.beehome,
  flex: 1,
}
const newLocal = { textAlign: "left", marginLeft: spacing[4], color: color.palette.white }

export const BeehomeChatScreen = observer(function BeehomeChatScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [messages, setMessages] = useState([])
  // Pull in navigation via hook
  const navigation = useNavigation()
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [])
  return (
    <Screen style={ROOT} backgroundColor={color.palette.beehome} preset="fixed">
      <Header
        headerText="BQT"
        style={{ backgroundColor: color.palette.beehome }}
        leftIcon="whiteBack"
        titleStyle={newLocal}
        onLeftPress={navigation.goBack}
      />
      <View style={{ flex: 1, backgroundColor: color.palette.backgroundBeehome }}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </Screen>
  )
})
