/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
 import React, { useEffect } from "react"
 import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
 
 import { createNativeStackNavigator } from "react-native-screens/native-stack"
 import { BeeHomeAuthNavigator, BeehomeNavigator } from "./beehome-main-navigator"
 import { load } from "../utils/storage/storage"
 import { screens } from "./screen"
 import { StatusBar } from "react-native"
import { AuthContext } from "./root-navigator"
 
 /**
  * This type allows TypeScript to know what routes are defined in this navigator
  * as well as what properties (if any) they might take when navigating to them.
  *
  * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
  *
  * For more information, see this documentation:
  *   https://reactnavigation.org/docs/params/
  *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
  */
 
 const Stack = createNativeStackNavigator()
 export const BeehomeRootNavigator = React.forwardRef<
   NavigationContainerRef,
   Partial<React.ComponentProps<typeof NavigationContainer>>
 >((props, ref) => {
   const [state, dispatch] = React.useReducer(
     (prevState, action) => {
       switch (action.type) {
         case "RESTORE_TOKEN":
           return {
             ...prevState,
             phone: action.phone,
             isLoading: false,
           }
         case "SIGN_IN":
           return {
             ...prevState,
             isSignout: false,
             phone: action.phone,
           }
         case "SIGN_OUT":
           return {
             ...prevState,
             isSignout: true,
             phone: null,
           }
       }
     },
     {
       isLoading: true,
       isSignout: false,
       userToken: null,
     },
   )
 
   React.useEffect(() => {
     // // Fetch the token from storage then navigate to our appropriate place
     const bootstrapAsync = async () => {
       let phone
       try {
        phone = await load("phone")
       } catch (e) {
         // Restoring token failed
       }
       dispatch({ type: "RESTORE_TOKEN", phone: phone })
     }
 
     bootstrapAsync()
   }, [])
 
   const authContext = React.useMemo(
     () => ({
       signIn: async (data) => {
         dispatch({ type: "SIGN_IN", phone: data.phone })
       },
       signOut: () => {
         dispatch({ type: "SIGN_OUT" })
       },
     }),
     [],
   )
 
   return (
     <AuthContext.Provider value={authContext}>
       <NavigationContainer {...props} ref={ref}>
         <StatusBar animated={true} barStyle={"dark-content"} backgroundColor="white" />
         <Stack.Navigator>
           {state.phone == null ? (
             <Stack.Screen
               name={screens.AuthNavigator}
               component={BeeHomeAuthNavigator}
               options={{
                 headerShown: false,
               }}
             />
           ) : (
             <Stack.Screen
               name={screens.MainNavigator}
               component={BeehomeNavigator}
               options={{
                 headerShown: false,
               }}
             />
           )}
         </Stack.Navigator>
       </NavigationContainer>
     </AuthContext.Provider>
   )
 })
 BeehomeRootNavigator.displayName = "BeehomeRootNavigator"
 