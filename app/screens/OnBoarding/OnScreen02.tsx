import { Text } from "app/components"

import React from "react"
import { observer } from "mobx-react-lite"
import SvgIcons from "app/components/SvgIcons"
import { View, ViewStyle, useWindowDimensions } from "react-native"
import { colors, spacing } from "app/theme"
import { commonStyles } from "app/theme/commonStyles"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const OnScreen02: any = observer(function OnScreen02Screen() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { width } = useWindowDimensions()
  return (
    <View style={[$viewContainer, { width }]}>
      <View style={$svgViewSection}>
        <SvgIcons name="onBoarding2" width={320} height={200} />
      </View>
      <View style={$viewTextSection}>
        <View style={{ flexDirection: commonStyles.rowList.flexDirection }}>
          <Text
            testID="title_1"
            tx={"onBoarding.on2_title.title_1"}
            size="xxl"
            weight="bold"
            style={{
              color: colors.palette.secondaryBlue90,
            }}
          />
          <Text
            testID="title_2"
            tx={"onBoarding.on2_title.title_2"}
            size="xxl"
            weight="bold"
            style={{
              color: colors.palette.textDark,
            }}
          />
        </View>
        <Text
          testID="title_3"
          tx={"onBoarding.on2_title.title_3"}
          size="xxl"
          weight="bold"
          style={{
            color: colors.palette.textDark,
          }}
        />
      </View>
      <View style={$bodySection}>
        <Text
          testID="title_1"
          tx={"onBoarding.on2_title.bodyText_1"}
          size="md"
          weight="medium"
          style={{
            color: colors.palette.textDark,
          }}
        />
      </View>
    </View>
  )
})

const $viewContainer: ViewStyle = {
  backgroundColor: colors.palette.white,
  padding: spacing.md,
  flex: 1,
}

const $svgViewSection: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  flex: 1.3,
}

const $viewTextSection: ViewStyle = {
  flex: 2 / 3,
  justifyContent: "center",
}

const $bodySection: ViewStyle = {
  flex: 1 / 3,
}
