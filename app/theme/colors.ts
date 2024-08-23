// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",
  primaryPin: "#5E7AA0",
  primary100: "#A55B46",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
  white: "#FFFFFF",
  header: "#F1F0EE",
  links: "#5E7AA0",
  bgColor: "#FAFBFA",
  bgColorBlue: "#D2E0F1",
  bgColorRed: "#DBBDB5",

  // MyColors
  primaryRed20: "#EDDEDA",
  primaryRed40: "#DBBDB5",
  primaryRed60: "#C99D90",
  primaryRed80: "#B77C6B",
  primaryRed90: "#A55B46",
  primary: "#3686C8", 
  brandBlue: "#0D3E66",
  secondaryBlue20: "#DFE4EC",
  secondaryBlue40: "#BFCAD9",
  secondaryBlue60: "#9EAFC6",
  secondaryBlue80: "#7E95B3",
  secondaryBlue90: "#5E7AA0",
  lightBlue20: "#F0F5FA",
  lightBlue40: "#E1EAF5",
  lightBlue60: "#D2E0F1",
  lightBlue80: "#C3D5EC",
  lightBlue90: "#B4CBE7",
  gray10: "#C3C3C3",
  gray20: "#F1F0EE",
  gray40: "#E3E1DC",
  gray60: "#D4D3CB",
  gray80: "#C6C4B9",
  gray90: "#B8B5A8",
  lightGray20: "#FDFDFC",
  lightGray40: "#FAFBFA",
  lightGray60: "#F8FAF7",
  lightGray80: "#F5F8F5",
  lightGray90: "#F3F6F2",
  textDark: "#2B2B2B",
  textDark20: "#333333",
  textMid: "#A4A4A4",
  textLight: "#E4E4E4",
  textGray: "#B3B3B3",
  textGray20: "#ACADAC",
} as const

const weightFont = {
  thin: "100",
  ultralight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  demibold: "600",
  bold: "700",
  ultrabold: "800",
  black: "900",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  weightFont,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.textDark,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  tabBackground: palette.primaryPin,
  tabFocus: palette.white,
  tabUnFocus: palette.white,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
