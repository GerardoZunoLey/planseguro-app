import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "app/navigators"
import { Animated, FlatList, View, ViewStyle } from "react-native"
import { colors, spacing } from "app/theme"
import { OnScreen01 } from "./OnScreen01"
import { OnScreen02 } from "./OnScreen02"
import { OnScreen03 } from "./OnScreen03"
import { OnScreen04 } from "./OnScreen04"
import Paginator from "app/components/Paginator"
import NextButton from "app/components/NextButton"
import { SkipButton } from "app/components/SkipButton"
interface OnBoardingScreenProps extends AppStackScreenProps<"OnBoarding"> {}
interface DataProps {
  id: string
  component: JSX.Element
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const OnBoarding: FC<OnBoardingScreenProps> = observer(function OnBoardingScreen(_props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { navigation } = _props
  const sliderRef: any = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const data: DataProps[] = [
    {
      id: "1",
      component: <OnScreen01 />,
    },
    {
      id: "2",
      component: <OnScreen02 />,
    },
    {
      id: "3",
      component: <OnScreen03 />,
    },
    {
      id: "4",
      component: <OnScreen04 />,
    },
  ]

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length) setCurrentIndex(viewableItems[0].index || 0)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const scrollTo = () => {
    if (currentIndex < data.length - 1) {
      sliderRef?.current.scrollToIndex({ index: currentIndex + 1 })
    }
  }

  const onNavigateNext = () => {
    navigation.navigate("Login")
  }

  const RenderView: React.FC<{ item: DataProps }> = ({ item }) => {
    return <View>{item.component}</View>
  }

  return (
    <View style={$viewContainer}>
      <SkipButton onPress={onNavigateNext} />
      <FlatList
        data={data}
        renderItem={({ item }) => <RenderView item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={sliderRef}
      />
      <View style={$viewFooter}>
        <Paginator data={data} scrollX={scrollX} />
        <NextButton
          scrollTo={scrollTo}
          currentIndex={currentIndex}
          percentage={(currentIndex + 1) * (100 / data.length)}
        />
      </View>
    </View>
  )
})

const $viewContainer: ViewStyle = {
  backgroundColor: colors.palette.white,
  flex: 1,
}

const $viewFooter: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: spacing.sm,
}
