import React from "react"
import { Text } from "app/components"
import { View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { colors, spacing } from "app/theme"

interface SkipProps {
  onPress: () => void
}

export const SkipButton = ({ onPress }: SkipProps) => {
  return (
    <View style={$skipViwSection}>
      <TouchableOpacity onPress={() => onPress()} style={$skipButton}>
        <Text
          testID="title_1"
          tx={"onBoarding.buttonSkip"}
          size="sm"
          weight="bold"
          style={{
            color: colors.palette.textDark,
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const $skipButton: ViewStyle = {
  borderWidth: 0,
  padding: spacing.sm,
}

const $skipViwSection: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
}
