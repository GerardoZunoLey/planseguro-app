/* eslint-disable @typescript-eslint/no-unused-vars */
import { observer } from "mobx-react-lite"
import React, { ComponentType, FC,  useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import SvgIcons from "app/components/SvgIcons"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Link } from 'expo-router';


import useAuthStore from "../../store/useAuthStore"
import { useNavigation } from "@react-navigation/native"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor introduce un correo electrónico válido.",
  }),
  password: z.string().min(2, {
    message: "La contraseña debe tener al menos 2 caracteres",
  }),
})

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {

  const navigation  = useNavigation()
  const authPasswordInput = useRef<TextInput>(null)

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)

   
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "VGARCIA@PLANSEGURO.COM.MX",
      password: "",
    },
  })



   const {login}  =  useAuthStore()



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
            Inicio de sesion
          </Text>

          <Text
            style={{
              color: colors.palette.textGray20,
            }}
            size="sm"
            weight="medium"
          >
            Ingresa tus datos para acceder a la plataforma
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
          render={({ field: { onChange,  value } }) => (
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
        {form.formState.errors.email && <Text style={$hint}>{form.formState.errors.email.message}</Text>}

        </View>
    


        <View className="">

        
        <Text
            style={{
              color: colors.palette.brandBlue,
            }}
            weight="medium"
            size="sm"
          >
            Contraseña
          </Text>


        <Controller
          control={form.control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange,  value } }) => (
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
          name="password"
        />
        {form.formState.errors.password && <Text style={$hint}>{form.formState.errors.password.message}</Text>}
     
        </View>

      

        <View className="flex flex-row gap-5 my-1">
          <Text
            style={{
              color: colors.palette.textGray20,
            }}
            weight="bold"
          >
            ¿Olvidaste tu contraseña?
          </Text>

          <TouchableOpacity style={{ marginBottom: spacing.xs }} activeOpacity={1}>
            <Text
              style={{
                color: colors.palette.primary,
              }}
              weight="bold"
            >
              Recupéralo aquí
            </Text>
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
            ¿Todavía no tienes cuenta?
          </Text>




          <TouchableOpacity style={{ marginBottom: spacing.xs }} activeOpacity={1}
          onPress={() => _props.navigation.navigate("Register")}
          >


            <Text
              style={{
                color: colors.palette.primary,
              }}
              weight="bold"
            >
              Regístrate aquí

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
