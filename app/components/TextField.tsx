import React, {
  ComponentType,
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import {
  Animated,
  Easing,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import {
  isRTL,
  // translate
} from "../i18n"
import { colors, spacing, typography } from "../theme"
import { Text, TextProps } from "./Text"

export interface TextFieldAccessoryProps {
  style: StyleProp<any>
  status: TextFieldProps["status"]
  multiline: boolean
  editable: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps["text"]
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps["tx"]
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps["txOptions"]
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps["text"]
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps["txOptions"]
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
}

/**
 * A component that allows for the entering and editing of text.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/TextField/}
 * @param {TextFieldProps} props - The props for the `TextField` component.
 * @returns {JSX.Element} The rendered `TextField` component.
 */
export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
  const {
    labelTx,
    label,
    labelTxOptions,
    // placeholderTx,
    // placeholder,
    // placeholderTxOptions,
    helper,
    helperTx,
    helperTxOptions,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ...TextInputProps
  } = props
  const input = useRef<TextInput>(null)
  const focusAnim = useRef(new Animated.Value(0)).current
  const disabled = TextInputProps.editable === false || status === "disabled"
  const [isFocused, setIsFocused] = useState(false)
  // const placeholderContent = placeholderTx
  //   ? translate(placeholderTx, placeholderTxOptions)
  //   : placeholder

  const $containerStyles = [$containerStyleOverride]

  const $labelStyles = [$labelStyle, LabelTextProps?.style]

  const $inputWrapperStyles = [
    $inputWrapperStyle,
    status === "error" && { borderColor: colors.error },
    TextInputProps.multiline && { minHeight: 112 },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    $inputWrapperStyleOverride,
  ]

  const $inputStyles: StyleProp<TextStyle> = [
    $inputStyle,
    disabled && { color: colors.textDim },
    isRTL && { textAlign: "right" as TextStyle["textAlign"] },
    TextInputProps.multiline && { height: "auto" },
    $inputStyleOverride,
  ]

  const $helperStyles = [
    $helperStyle,
    status === "error" && { color: colors.error },
    HelperTextProps?.style,
  ]

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!TextInputProps?.value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start()
  }, [focusAnim, isFocused, TextInputProps?.value])

  /**
   *
   */
  function focusInput() {
    if (disabled) {
      return
    }

    input.current?.focus()
  }

  useImperativeHandle(ref, () => input.current as TextInput)
  const color = isFocused ? colors.palette.textGray : colors.palette.textDark20
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[$containerInputStyle, $containerStyles]}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={$leftAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          // placeholder={placeholderContent}
          placeholderTextColor={colors.textDim}
          {...TextInputProps}
          editable={!disabled}
          style={$inputStyles}
          onFocus={() => {
            setIsFocused(true)
          }}
          onBlur={() => {
            setIsFocused(false)
          }}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={$rightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}
      </View>

      {!!(label || labelTx) && (
        <Animated.View
          style={[
            $labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 3],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 9],
                  }),
                },
              ],
            },
          ]}
        >
          <Text
            preset="formLabel"
            text={label}
            tx={labelTx}
            txOptions={labelTxOptions}
            {...LabelTextProps}
            style={[$labelStyles, { color }]}
          />
        </Animated.View>
      )}

      {!!(helper || helperTx) && (
        <Text
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </TouchableOpacity>
  )
})

const $labelStyle: TextStyle = {
  // marginBottom: spacing.xs,
  marginBottom: 0,

  color: colors.palette.textGray,
  fontSize: spacing.md,
}

const $labelContainer: ViewStyle = {
  position: "absolute",
  top: -2,
}

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  // borderWidth: 1,
  borderWidth: 0,
  borderRadius: 12,
  backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.neutral400,
  overflow: "hidden",
}

const $containerInputStyle: ViewStyle = {
  borderWidth: 1,
  borderRadius: 12,
  borderColor: colors.palette.gray40,
  height: 60,
}

const $inputStyle: TextStyle = {
  // alignSelf: "stretch",
  fontFamily: typography.primary.normal,
  color: colors.palette.textDark20,
  fontSize: 16,
  paddingTop: 20,
  paddingHorizontal: spacing.sm,

  justifyContent: "center",
  flex: 1,
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  // paddingVertical: 24,
  // paddingHorizontal: 0,
  // marginVertical: spacing.xs,
  // marginBottom: spacing.xs,
  // marginHorizontal: spacing.sm,
}

const $helperStyle: TextStyle = {
  marginTop: spacing.xs,
}

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: spacing.xs,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}
const $leftAccessoryStyle: ViewStyle = {
  marginStart: spacing.xs,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}
