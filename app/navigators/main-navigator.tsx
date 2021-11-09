/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { PhoneScreen, CodeInputScreen, HomeScreen, BarcodeScreen, AccountScreen, UserInfoScreen, NotificationScreen, InputPhoneScreen, BeehomeCodeInputScreen, SelectRoleScreen, BeehomeCreateReportScreen, BeehomeReportListScreen, BeehomeReportDetailScreen, BeehomeAddMemberScreen, BeehomeChatScreen, BeehomeInvoiceScreen, BeehomeNotificationScreen, BeehomeNotificationDetailScreen } from "../screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { screens } from "./screen"
import { BottomTab } from "../components/bottom-tab/bottom-tab"
import { CardScreen } from "../screens/card/card-screen"
import { NewsScreen } from "../screens/news/news-screen"
import { NewsDetailScreen } from "../screens/news-detail/news-detail-screen"
import { useStores } from "../models"
import { WithdrawHistoryScreen } from "../screens/withdraw-history/withdraw-history-screen"
import { PayinHistoryScreen } from "../screens/payin-history/payin-history-screen"
import { BeehomeHomeScreen } from "../screens/beehome/home/home-screen"
import { SelectApartmentScreen } from "../screens/beehome/select-apartment/select-apartment-screen"
import { BeehomeBottomTab } from "../components/beehome-bottom-tab/beehome-bottom-tab"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Stack.Screen name={screens.PhoneScreen} component={PhoneScreen} />
      <Stack.Screen name={screens.CodeInputScreen} component={CodeInputScreen} />
    </Stack.Navigator>
  )
}


export function BottomMenu() {
  return (
    <Tab.Navigator tabBar={BottomTab}>
      <Tab.Screen name={screens.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={screens.BarcodeScreen} component={BarcodeScreen} />
      <Tab.Screen name={screens.AccountScreen} component={AccountScreen} />
    </Tab.Navigator>
  )
}


export function MainNavigator() {
  const { userStore } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userStore.selected === -1 ? screens.CardScreen : screens.BottomTab}
    >
      <Stack.Screen name={screens.BottomTab} component={BottomMenu} />
      <Stack.Screen name={screens.NewsScreen} component={NewsScreen} />
      <Stack.Screen name={screens.CardScreen} component={CardScreen} />
      <Stack.Screen name={screens.UserInfoScreen} component={UserInfoScreen} />
      <Stack.Screen name={screens.NewsDetailScreen} component={NewsDetailScreen} />
      <Stack.Screen name={screens.WithdrawHistoryScreen} component={WithdrawHistoryScreen} />
      <Stack.Screen name={screens.PayinHistoryScreen} component={PayinHistoryScreen} />
      <Stack.Screen name={screens.NotificationScreen} component={NotificationScreen} />
    </Stack.Navigator>
  )
}



/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
