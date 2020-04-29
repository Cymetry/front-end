import { StyleSheet, Dimensions } from "react-native";

import Variables from "../../../../../assets/styles/variables";

const { height } = Dimensions.get("window");

const LocalStyles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: "center",
    marginVertical: "5%",
  },

  image: {
    width: 110,
    height: 110,
    borderWidth: 12,
    borderRadius: 90,
    marginBottom: "1%",
    borderColor: "#F8F8F8",
    backgroundColor: "gray",
    marginTop: "8%",
  },

  fullName: {
    width: "100%",
    textAlign: "center",
    marginVertical: "1%",
    fontSize: Variables.smallFontSize,
  },

  progressItem: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  progressBar: {
    marginHorizontal: 10,
  },

  button: {
    minWidth: "60%",
    height: height / 14,
    marginVertical: 5,
    borderRadius: 8,
    marginHorizontal: "20%",
  },

  buttonTitle: {
    padding: 5,
    color: "white",
    fontSize: 1,
  },

  progress: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 25,
  },

  divider: {
    height: "2.5%",
    width: 400,
    backgroundColor: "#F8F8F8",
    marginVertical: "5%",
  },

  achievements: {
    width: "100%",
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10%",
  },

  achievementItem: {
    alignItems: "center",
    marginHorizontal: 15,
    justifyContent: "center",
  },

  icon: {
    marginVertical: 10,
  },

  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    marginBottom: 5,
  },
});

export default LocalStyles;
