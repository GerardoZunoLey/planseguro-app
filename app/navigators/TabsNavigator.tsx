import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { DemoCommunityScreen, DemoDebugScreen } from "../screens"
import Home from "app/screens/Dashboard/Home"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

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
export type DemoTabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
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
        tabBarStyle: [$tabBar, { height: bottom + 60 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={focused ? "home" : "lihome"}
              color={focused ? colors.tabFocus : colors.tabUnFocus}
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
              icon={focused ? "map" : "map_line"}
              color={focused ? colors.tabFocus : colors.tabUnFocus}
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
              icon={focused ? "search" : "search_line"}
              color={focused ? colors.tabFocus : colors.tabUnFocus}
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
            <Icon icon="pin_icon" color={focused ? colors.tabFocus : colors.tabUnFocus} size={30} />
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
