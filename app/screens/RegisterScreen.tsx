/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import SvgIcons from "app/components/SvgIcons"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import useAuthStore from "../../store/useAuthStore"

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor introduce un correo electrónico válido.",
  }),
  phone: z.string().regex(/^(\+\d{1,3})?\d{10}$/, {
    message: "El número de teléfono debe ser un celular válido con al menos 10 dígitos",
  }),
  termsAndConditions: z
    .boolean()
    .refine((value) => value === true, { message: "Debes aceptar los términos y condiciones" }),
})

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      termsAndConditions: false,
    },
  })

  const { login } = useAuthStore()

  const onSubmit = (data: any) => {
    login()
    console.log(data)
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
      <View style={$viewontentContainer}>
        <View className="flex-row items-start">
          <SvgIcons name="loginImg" width={190} height={60} />
        </View>

        <View className="flex my-5">
          <View className="mb-5">
            <Text
              style={{
                color: colors.palette.textGray20,
              }}
              weight="bold"
              size="xxl"
            >
              Portal de Asegurados
            </Text>
          </View>

          <Text
            style={{
              color: colors.palette.brandBlue,
            }}
            weight="bold"
            size="xl"
          >
            Crea una cuenta
          </Text>

          <Text
            style={{
              color: colors.palette.textGray20,
            }}
            size="sm"
            weight="medium"
          >
            Ingresa tu correo electrónico para crear una cuenta
          </Text>
        </View>

        <View className="">
          <Text
            style={{
              color: colors.palette.brandBlue,
            }}
            weight="medium"
            size="sm"
          >
            Correo electrónico
          </Text>

          <Controller
            control={form.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value}
                onChangeText={onChange}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                placeholderTx="loginScreen.emailFieldPlaceholder"
              />
            )}
            name="email"
          />
          {form.formState.errors.email && (
            <Text style={$hint}>{form.formState.errors.email.message}</Text>
          )}
        </View>

        <View className="">
          <Text
            style={{
              color: colors.palette.brandBlue,
            }}
            weight="medium"
            size="sm"
          >
            Teléfono celular
          </Text>

          <Controller
            control={form.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                ref={authPasswordInput}
                value={value}
                onChangeText={onChange}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={isAuthPasswordHidden}
                placeholderTx="loginScreen.passwordFieldPlaceholder"
                RightAccessory={PasswordRightAccessory}
              />
            )}
            name="phone"
          />
          {form.formState.errors.phone && (
            <Text style={$hint}>{form.formState.errors.phone.message}</Text>
          )}
        </View>

        <View className="flex flex-row gap-5 my-1">
          <Text
            style={{
              color: colors.palette.textGray20,
            }}
            weight="bold"
            tx="loginScreen.forgot"
          />

          <TouchableOpacity style={{ marginBottom: spacing.xs }} activeOpacity={1}>
            <Text
              style={{
                color: colors.palette.primary,
              }}
              weight="bold"
              tx="loginScreen.forgot"
            />
          </TouchableOpacity>
        </View>

        <Button
          testID="login-button"
          tx="loginScreen.tapToSignIn"
          style={$tapButton}
          preset="reversed"
          onPress={form.handleSubmit(onSubmit)}
        />

        <View className="flex flex-row gap-5 my-1">
          <Text
            style={{
              color: colors.palette.textGray20,
            }}
            weight="bold"
          >
            ¿Ya tienes cuenta?
          </Text>

          <TouchableOpacity
            style={{ marginBottom: spacing.xs }}
            activeOpacity={1}
            onPress={() => _props.navigation.navigate("Login")}
          >
            <Text
              style={{
                color: colors.palette.primary,
              }}
              weight="bold"
            >

              Inicia sesión

            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  // paddingHorizontal: spacing.lg,
}

const $viewontentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.error,
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
  backgroundColor: colors.palette.primary,
  borderRadius: 12,
  height: 51,
}
