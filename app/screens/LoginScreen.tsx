import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import SvgIcons from "app/components/SvgIcons"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <Screen preset="auto" contentContainerStyle={$screenContentContainer}>
      <View>
        <View style={$imgLoginText}>
          <Text
            testID="login-title-1"
            tx="loginScreen.header.title_1"
            weight="black"
            size="lxl"
            style={$headerTextTitle}
          />
          <Text
            testID="login-title-1"
            tx="loginScreen.header.title_2"
            weight="black"
            size="lxl"
            style={$headerTextTitle}
          />
          <Text
            testID="login-title-1"
            tx="loginScreen.header.title_3"
            weight="black"
            size="lxl"
            style={$headerTextTitle}
          />
          <Text
            testID="login-title-1"
            tx="loginScreen.header.title_4"
            weight="black"
            size="lxl"
            style={$headerTextTitle}
          />
          <Text
            testID="login-title-1"
            style={$headerTextTitle}
            tx="loginScreen.header.text"
            weight="semiBold"
            size="xl"
          />
        </View>
        <SvgIcons name="loginImg" width={"100%"} height={377} />
      </View>

      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}
      <View style={$viewontentContainer}>
        <TextField
          value={authEmail}
          onChangeText={setAuthEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          labelTx="loginScreen.emailFieldLabel"
          placeholderTx="loginScreen.emailFieldPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <TextField
          ref={authPasswordInput}
          value={authPassword}
          onChangeText={setAuthPassword}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={isAuthPasswordHidden}
          labelTx="loginScreen.passwordFieldLabel"
          placeholderTx="loginScreen.passwordFieldPlaceholder"
          onSubmitEditing={login}
          RightAccessory={PasswordRightAccessory}
        />
        <TouchableOpacity style={{ marginBottom: spacing.xs }} activeOpacity={1}>
          <Text
            style={{
              color: colors.palette.primaryRed90,
            }}
            weight="bold"
            tx="loginScreen.forgot"
          />
        </TouchableOpacity>
        <Button
          testID="login-button"
          tx="loginScreen.tapToSignIn"
          style={$tapButton}
          preset="reversed"
          onPress={login}
        />

        <Button
          testID="signup-button"
          tx="loginScreen.tapToSignUp"
          style={$tapSingUp}
          textStyle={$textTapSingup}
          preset="reversed"
          onPress={login}
        />
        <View style={$viewContainerGuest}>
          <Text
            style={{
              color: colors.palette.textGray20,
            }}
            weight="light"
            tx="loginScreen.text1"
          />
          <TouchableOpacity
            style={{
              padding: spacing.md,
            }}
            activeOpacity={1}
          >
            <Text
              style={{
                color: colors.palette.primaryRed90,
              }}
              weight="bold"
              tx="loginScreen.guest"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.xxl,
  // paddingHorizontal: spacing.lg,
}

const $viewContainerGuest: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  padding: spacing.md,
}

const $viewontentContainer: ViewStyle = {
  paddingVertical: spacing.lg,
  paddingHorizontal: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
  // borderWidth: 1,
  // borderRadius: 12,
  // borderColor: colors.palette.gray40,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.primaryRed90,
  borderRadius: 12,
  height: 51,
}

const $tapSingUp: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.transparent,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.palette.textDark,
  height: 51,
}

const $textTapSingup: TextStyle = {
  color: colors.palette.textDark,
}

const $imgLoginText: ViewStyle = {
  position: "absolute",
  zIndex: 5,
  width: "100%",
  height: "100%",
  justifyContent: "center",
}

const $headerTextTitle: TextStyle = {
  color: colors.palette.white,
  textAlign: "center",
}
