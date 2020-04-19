import { StyleSheet } from "react-native";

import Variables from "../../../../../assets/styles/variables";

const LocalStyles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    marginVertical: '5%',
  },

  image: {
    width: 110,
    height: 110,
    borderWidth: 12,
    borderRadius: 90,
    marginBottom: '1%',
    borderColor: "#F8F8F8",
    backgroundColor: "gray",
  },

  fullName: {
    width: "100%",
    textAlign: "center",
    marginVertical: '1%',
    fontSize: Variables.smallFontSize,
  },

  progressItem: {
    width: '100%',
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  progressBar: {
    marginHorizontal: 10,
  },

  button: {
    width: 250,
    padding: 15,
    borderRadius: 8,
  },

  progress: {
    width: "100%",
    height: "22%",
    alignItems: "center",
    justifyContent: "space-around",
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
