// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import { colors } from "./colors"

export const customFontsToLoad = {
  "Outfit-Light": require("assets/fonts/Outfit-Light.ttf"),
  "Outfit-Regular": require("assets/fonts/Outfit-Regular.ttf"),
  "Outfit-Medium": require("assets/fonts/Outfit-Medium.ttf"),
  "Outfit-SemiBold": require("assets/fonts/Outfit-SemiBold.ttf"),
  "Outfit-Bold": require("assets/fonts/Outfit-Bold.ttf"),
  "Outfit-Black": require("assets/fonts/Outfit-Black.ttf"),
}

const fonts = {
  spaceGrotesk: {
    // Cross-platform Google font.
    light: "spaceGroteskLight",
    normal: "spaceGroteskRegular",
    medium: "spaceGroteskMedium",
    semiBold: "spaceGroteskSemiBold",
    bold: "spaceGroteskBold",
  },
  outfit: {
    light: "Outfit-Light",
    normal: "Outfit-Regular",
    medium: "Outfit-Medium",
    semiBold: "Outfit-SemiBold",
    bold: "Outfit-Bold",
    black: "Outfit-Black",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

const fontWeight = {
  outfit: {
    light: colors.weightFont.light,
    normal: colors.weightFont.regular,
    medium: colors.weightFont.medium,
    semiBold: colors.weightFont.demibold,
    bold: colors.weightFont.bold,
    black: colors.weightFont.black,
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.outfit,
  primaryWeight: fontWeight.outfit,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
