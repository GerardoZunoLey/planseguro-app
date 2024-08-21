import { colors } from "app/theme"
import React from "react"
import { View, ViewStyle, Animated, useWindowDimensions } from "react-native"

interface PaginatorProps {
  data: any[]
  scrollX: any
}

function Paginator({ data, scrollX }: PaginatorProps) {
  const { width } = useWindowDimensions()
  return (
    <View style={$viewContainer}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 40, 8],
          extrapolate: "clamp",
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        })

        return <Animated.View style={[$viewDot, { width: dotWidth, opacity }]} key={i.toString()} />
      })}
    </View>
  )
}

export default Paginator

const $viewDot: ViewStyle = {
  height: 8,
  borderRadius: 5,
  backgroundColor: colors.palette.secondaryBlue90,
  marginHorizontal: 8,
}

const $viewContainer: ViewStyle = {
  flexDirection: "row",
  height: 64,
  alignItems: "center",
}
