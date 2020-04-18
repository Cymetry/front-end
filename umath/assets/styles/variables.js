import { PixelRatio } from "react-native";

const PixelRatioValue = PixelRatio.get() <= 2;

const Variables = {
  titleFontSize: PixelRatioValue ? 28 : 32,
  smallFontSize: PixelRatioValue ? 14 : 18,
  normalFontSize: PixelRatioValue ? 18 : 22,
  smallestFontSize: PixelRatioValue ? 12 : 16,

  blue: "#0880FA",
  vividBlue: "#0091FF",
  lightBlue: "#32C5FF",

  darkGray: "#24272C",
  textGray: "#979797",
  gray: "#D8D8D8",
  lightGray: "#F8F8F8",
};

export default Variables;
