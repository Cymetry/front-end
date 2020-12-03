import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

/**
 * The link to the article explaining this utils
 * (https://medium.com/soluto-engineering/size-matters-5aeeb462900a)
 */
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
