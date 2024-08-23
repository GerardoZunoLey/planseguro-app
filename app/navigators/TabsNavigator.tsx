/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, Touchable, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { DemoCommunityScreen, DemoDebugScreen } from "../screens"
import Home from "app/screens/Dashboard/Home"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { TouchableOpacity } from "react-native-gesture-handler"

export type TabParamList = {
  Home: undefined
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `TabsNavigator`.
 */
export function TabsNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: { backgroundColor: 'white', borderTopWidth: 0, elevation: 0, }, 
        tabBarItemStyle: { borderRadius: 20, padding: 5, margin: 5, }, tabBarLabelStyle: { fontSize: 20, marginTop: 0, }, tabBarIconStyle: { marginBottom: -5, },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: true,
          tabBarLabel: "Inicio",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "home" : "lihome"}
              color={focused ? colors.palette.neutral100 : colors.palette.neutral900}
              style={{
                backgroundColor: colors.palette.primary,
                paddingHorizontal: 20,
                paddingVertical: 2,
                borderRadius: 10,
              }}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DemoCommunity"
        component={DemoCommunityScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "home" : "lihome"}
              color={focused ? colors.palette.neutral100 : colors.palette.neutral900}
              style={{
                backgroundColor: colors.palette.primary,
                paddingHorizontal: 20,
                paddingVertical: 2,
                borderRadius: 10,
              }}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DemoPodcastList"
        component={DemoPodcastListScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "home" : "lihome"}
              color={focused ? colors.palette.neutral100 : colors.palette.neutral900}
              style={{
                backgroundColor: colors.palette.primary,
                paddingHorizontal: 20,
                paddingVertical: 2,
                borderRadius: 10,
              }}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "home" : "lihome"}
              color={focused ? colors.palette.neutral100 : colors.palette.neutral900}
              style={{
                backgroundColor: colors.palette.primary,
                paddingHorizontal: 20,
                paddingVertical: 2,
                borderRadius: 10,
              }}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.tabBackground,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: 0,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
