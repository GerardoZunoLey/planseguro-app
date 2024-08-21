/* eslint-disable react-native/sort-styles */
import { StyleSheet, Dimensions } from "react-native"
import { colors } from "./colors"
const heightW = Dimensions.get("window").height - 160

export const commonStyles = StyleSheet.create({
  // width and height 100%
  size100: {
    width: "100%",
    height: "100%",
  },
  sizeAuto: {
    width: "auto",
    height: "auto",
  },
  // Space between components in vertical
  spaceTopMargin: {
    marginTop: 20,
  },
  // Main button design
  button: {
    borderRadius: 50,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingButton: {
    opacity: 0.7,
  },
  // Adjust main content
  container: {
    height: "100%",
    paddingHorizontal: 20,
    width: "100%",
  },
  // Main Card design
  card: {
    margin: 0,
    padding: 0,
  },
  contentCard: {
    borderBottomWidth: 1,
    borderColor: colors.palette.neutral200,
    height: 45,
    paddingHorizontal: 6,
    paddingVertical: 5,
    width: "100%",
  },
  titleCard: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 10,
    width: "100%",
  },
  expandedContentCard: {
    borderBottomWidth: 1,
    borderColor: colors.palette.neutral100,
    height: 45,
    paddingHorizontal: 6,
    paddingVertical: 5,
    width: "100%",
  },
  rowList: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shadow: {
    // shadowColor: colors.palette.secondary,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 5,
  },
  center: {
    flex: 1,
    width: "auto",
    height: heightW,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  spinner: {
    color: colors.palette.primary600,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.palette.links,
  },
  cardButtonIcon: {
    backgroundColor: colors.palette.bgColorBlue,
    padding: 15,
    borderRadius: 50,
  },
  cardButtonText: {
    marginLeft: "5%",
  },
  cardButtomHome: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    borderColor: colors.palette.gray40,
    marginVertical: 10,
  },
  cardView: {
    flexDirection: "row",
    alignItems: "center",
  },
  conatiner: {
    flex: 1,
    backgroundColor: colors.palette.bgColor,
  },
})
