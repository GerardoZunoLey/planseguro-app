import React, { ReactNode } from "react"
import { Button, Text } from "app/components"
import { iconRegistry } from "./Icon"
import { View, StyleSheet, Image, SafeAreaView } from "react-native"
import { colors } from "app/theme"
import { Icon } from "../components"
import { useNavigation, useRoute } from "@react-navigation/native"
import { commonStyles } from "app/theme/commonStyles"

interface Props {
  children: ReactNode
  moduleName?: string
  showMenu?: boolean
}

// const THREE_QUARTERS_WINDOW = 1

export const Layout = ({ children, moduleName, showMenu = false }: Props) => {
  const navigate = useNavigation()
  const route = useRoute()

  /**
   * This header render when the prop showMenu is equal to true
   * Display the logo and menu options
   */
  const Menu = () => {
    return (
      <View style={styles.menuHeader}>
        <View style={commonStyles.rowList}>
          <Image source={iconRegistry.pin_icon} style={styles.logo} resizeMode="contain" />
        </View>
        <View>
          <Icon icon="bell" color="#A55B46" size={24} />
        </View>
      </View>
    )
  }
  /**
   * This header render when the prop showMenu is equal to false
   * Display back button and the module name
   */
  const HeaderWithBackArrow = () => {
    return (
      <View style={styles.header}>
        <Button style={styles.button} onPress={() => navigate.goBack()}>
          <Image source={iconRegistry.back} />
        </Button>
        <Text size="lg" weight="bold">
          {moduleName || route.name || "BMAYS"}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.container}>
        {/**
         * This condition select one of them
         * If the showMenu prop is true display the header with the logo and menu options
         **/}
        {showMenu ? <Menu /> : <HeaderWithBackArrow />}
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.transparent,
    borderWidth: 0,
    justifyContent: "center",
    paddingRight: 15,
  },
  container: {
    backgroundColor: colors.palette.bgColor,
    flex: 1,
  },
  content: {
    flex: 1,
    resizeMode: "contain",
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.palette.header,
    flexDirection: "row",
    justifyContent: "flex-start",

    width: "100%",
  },
  logo: { height: 34, width: 34 },
  menuHeader: {
    alignItems: "center",
    backgroundColor: colors.palette.header,
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
  },
})
