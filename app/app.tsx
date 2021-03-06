/* eslint-disable react-native/no-inline-styles */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import "intl"
import "intl/locale-data/jsonp/vi"
import React, { useState, useEffect, useRef } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  RootNavigator,
  BeehomeRootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import codePush from "react-native-code-push"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import { Alert, Platform, View } from "react-native"
import AwesomeAlert from "react-native-awesome-alerts"
import AppCodePush from "./AppCodePush"
import Toast, { BaseToast } from "react-native-toast-message"
import { RFValue } from "react-native-responsive-fontsize"
import { screenWidth } from "./theme"
import { Text } from "./components"
enableScreens()
const CPDK = {
  ios: "ndpmRyPNVfzgPczmiwS7Rh6YBryDWQkWg7Oly",
  android: "li3bZoPtttL0kXg8kRiDt1jRKcurNwW4He6I6",
}
export const toastConfig = {
  /* 
    overwrite 'success' type, 
    modifying the existing `BaseToast` component
  */
  success: ({ text1, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
      text1={text1}
      text2={props.uuid}
    />
  ),

  /* 
    or create a completely new type - `my_custom_type`,
    building the layout from scratch
  */
  my_custom_type: ({ text2, props, ...rest }) => (
    <View style={textToastContainer}>
      <Text style={textToast}>{text2}</Text>
    </View>
  ),
}
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

const textToastContainer = {
  height: 48,
  borderRadius: 50,
  justifyContent: "center",
  alignItems: "center",
  width: screenWidth - 30,
  backgroundColor: "rgba(43, 43, 43, 0.8)",
}

const textToast = {
  fontSize: RFValue(14),
  fontWeight: "600",
  fontStyle: "normal",
  lineHeight: 21,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ffffff",
}

/**
 * This is the root component of our app.
 */
function App() {
  const navigationRef = useRef<NavigationContainerRef>(null)
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const [progress, setProgress] = useState(null)
  const [isOpenCodepushModal, setIsOpenCodepushModal] = useState(false)
  const [codePushUpdateProgress, setCodePushUpdateProgress] = useState(0)
  const [codePushUpdatePackage, setCodePushUpdatePackage] = useState(null)
  const [codePushLocalPackage, setCodePushLocalPackage] = useState(null)
  const [titleUpdateCodePushModal, setTitleUpdateCodePushModal] = useState("???? c?? b???n c???p nh???t m???i")
  const [descriptionUpdateCodepushModal, setDescriptionUpdateCodepushModal] = useState(
    "???? c?? b???n c???p nh???t m???i",
  )

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  // Kick off initial async loading actions, like loading fonts and RootStore

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.

  const codePushStatusDidChange = (syncStatus) => {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        setDescriptionUpdateCodepushModal("Ki???m tra c???p nh??t.")
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setDescriptionUpdateCodepushModal("??ang t???i...")
        break
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        setDescriptionUpdateCodepushModal("Ch??? ng?????i d??ng cho ph??p.")

        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        setDescriptionUpdateCodepushModal("??ang c??i ?????t...")
        break
      case codePush.SyncStatus.UP_TO_DATE:
        setDescriptionUpdateCodepushModal("C???p nh???t ???ng d???ng.")
        setProgress(false)
        break
      case codePush.SyncStatus.UPDATE_IGNORED:
        setDescriptionUpdateCodepushModal("B??? qua c???p nh???t.")
        setProgress(false)
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        setDescriptionUpdateCodepushModal("???? c??i ?????t\r\nM??? l???i ???ng d???ng ????? c???p nh???t")
        setProgress(false)
        break
      case codePush.SyncStatus.UNKNOWN_ERROR:
        setDescriptionUpdateCodepushModal("C?? l???i x???y ra.")
        setProgress(false)
        break
    }
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  const sync = () => {
    codePush.sync({}, codePushStatusDidChange, codePushDownloadDidProgress)
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  const syncImmediate = () => {
    codePush.sync(
      {
        deploymentKey: CPDK[Platform.OS],
        installMode: codePush.InstallMode.IMMEDIATE,
        updateDialog: {
          optionalIgnoreButtonLabel: "B??? qua",
          optionalInstallButtonLabel: "C???p nh???t",
          mandatoryContinueButtonLabel: "C???p nh???t ngay",
          mandatoryUpdateMessage:
            "???? c?? b???n c???p nh??t m???i. B???n vui l??ng c???p nh???t ????? c?? tr???i nghi???m t???t nh???t!",
          optionalUpdateMessage: "???? c?? b???n c???p nh??t m???i. B???n c?? mu???n c??i ?????t kh??ng?",
          title: "C???p nh???t ???ng d???ng",
        },
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    )
  }

  const updateAppVersionsInfo = async (codePushVersion) => {
    const data = {
      code_push_version: codePushVersion,
      // tag_version: appConfig.tagVersion,
    }
    // const response = await APIHandler.user_device(data)
  }

  const codePushGetMetaData = () => {
    codePush.getUpdateMetadata().then((localPackage) => {
      // console.log(localPackage)
      // store.setCodePushMetaData(localPackage)
      // updateAppVersionsInfo(localPackage?.label)
    })
  }

  const codePushSyncManually = async () => {
    const update = await codePush.checkForUpdate(CPDK[Platform.OS])
    if (!update) {
      console.log("The app is up to date!")
    } else {
      setIsOpenCodepushModal(true)
      setCodePushUpdatePackage(update)
      setTitleUpdateCodePushModal("C???p nh???t " + update.label)
    }
  }

  useEffect(() => {
    if (isOpenCodepushModal && codePushUpdatePackage) {
      codePushDownloadUpdate()
    }
  }, [isOpenCodepushModal, codePushUpdatePackage])

  const codePushDownloadDidProgress = (progress) => {
    setCodePushUpdateProgress(Math.round((progress.receivedBytes / progress.totalBytes) * 100))
  }

  const codePushDownloadUpdate = () => {
    if (!codePushUpdatePackage) {
      closeCodePushModal()
      return
    }

    codePushUpdatePackage
      .download((progress) => codePushDownloadDidProgress(progress))
      .then((localPackage) => {
        setCodePushLocalPackage(localPackage)
        setTimeout(() => codePushInstallUpdate(localPackage), 300)
      })
      .catch((err) => {
        console.log("%cdownload_update_codepush", "color:red", err)
        Alert.alert("L???i c???p nh???t", "T???i c???p nh???t th???t b???i! B???n vui l??ng th??? l???i sau.", [
          {
            text: "OK",
            onPress: () => closeCodePushModal(),
          },
        ])
      })
  }

  const codePushInstallUpdate = (codePushLocalPackageParams = codePushLocalPackage) => {
    codePushLocalPackageParams
      ?.install(codePush.InstallMode.IMMEDIATE)
      .then(() => {
        codePush.notifyAppReady()
      })
      .catch((err) => {
        console.log("%cinstall_update_codepush", "color:red", err)
        Alert.alert("L???i c???p nh???t", "C??i ?????t c???p nh???t th???t b???i! B???n vui l??ng th??? l???i sau.", [
          {
            text: "OK",
            onPress: () => closeCodePushModal(),
          },
        ])
      })
  }

  const handleCodePushProgressComplete = () => {
    let intervalCheckingLocalPackage = null
    intervalCheckingLocalPackage = setInterval(() => {
      if (codePushLocalPackage) {
        clearInterval(intervalCheckingLocalPackage)
      }
    }, 500)
  }

  const closeCodePushModal = () => {
    setIsOpenCodepushModal(false)
  }

  useEffect(() => {
    codePushInstallUpdate()
  }, [isOpenCodepushModal])

  useEffect(() => {
    ;(async () => {
      await initFonts() // expo
      setupRootStore().then(setRootStore)
    })()
    if (__DEV__) {
      console.log("DEVELOPMENT")
      codePushSyncManually()
    } else {
      codePushSyncManually()
    }
    codePushGetMetaData()
    // syncImmediate()
  }, [])

  if (!rootStore) return null

  return (
    <View style={{ flex: 1 }}>
      <ToggleStorybook>
        <RootStoreProvider value={rootStore}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <RootNavigator
              ref={navigationRef}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </SafeAreaProvider>
        </RootStoreProvider>
      </ToggleStorybook>
      {isOpenCodepushModal && (
        <AwesomeAlert
          useNativeDriver
          show={isOpenCodepushModal}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          customView={
            <AppCodePush
              title={titleUpdateCodePushModal}
              description={descriptionUpdateCodepushModal}
              btnTitle="C???p nh???t ngay"
              showConfirmBtn={false}
              // onPressConfirm={codePushDownloadUpdate}
              progress={codePushUpdateProgress}
              onProgressComplete={handleCodePushProgressComplete}
            />
          }
        />
      )}
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </View>
  )
}

export default App
