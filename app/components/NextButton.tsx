import { colors } from "app/theme"
import React, { useEffect, useRef } from "react"
import { Animated, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Svg, { G, Rect, Circle, Defs, ClipPath, Path } from "react-native-svg"

interface NextProps {
  percentage: number
  scrollTo: () => void
  currentIndex: number
}

function NextButton({ scrollTo, percentage, currentIndex }: NextProps) {
  const size = 80
  const strokeWidth = 2
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  const rectSize = 50
  const rectRadius = rectSize / 2

  const progressAnimation = useRef(new Animated.Value(0)).current
  const progressRef: any = useRef(null)

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    animation(percentage)
  }, [percentage])

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100
      if (progressRef?.current) {
        progressRef.current?.setNativeProps({
          strokeDashoffset,
        })
      }
    })
    return () => {
      progressAnimation.removeAllListeners()
    }
  }, [percentage])

  return (
    <View style={$container}>
      <TouchableOpacity activeOpacity={1} onPress={() => scrollTo()}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <Defs>
            <ClipPath id="clip0">
              <Rect width={size} height={size} rx={size / 2} fill="white" />
            </ClipPath>
          </Defs>
          <G rotation={-90} originX={center} originY={center}>
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#C9C9C9"
              strokeWidth={strokeWidth}
              fill="none"
            />

            <Circle
              ref={progressRef}
              cx={center}
              cy={center}
              r={radius}
              stroke="#A55B46"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              // strokeDashoffset={strokeDashoffset}
            />
            <Rect
              x={center - rectRadius}
              y={center - rectRadius}
              width={rectSize}
              height={rectSize}
              rx={rectRadius}
              fill="#DBBDB5"
            />

            <Path
              d="M24 27L30 33L36 27"
              stroke={currentIndex ? colors.palette.textDark : colors.palette.white}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${center - 30} ${center - 30})`}
            />
          </G>
        </Svg>
      </TouchableOpacity>
    </View>
  )
}

export default NextButton
const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  padding: 4,
}
