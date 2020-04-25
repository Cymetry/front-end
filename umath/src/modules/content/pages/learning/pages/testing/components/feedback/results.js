import React from "react";
import { Text, View, StyleSheet } from "react-native";

import CheckMark from "../../../../../../../../../assets/icons/checkmark.svg";
import WrongIcon from "../../../../../../../../../assets/icons/wrong.svg";
import Styles from "../../../../../../../../../assets/styles";
import Variables from "../../../../../../../../../assets/styles/variables";

const Results = ({ answers }) => {
  const _renderAnswers = () =>
    answers.map((answer, index) => {
      return (
        <View key={index} style={ResultStyles.questionWrapper}>
          <Text style={ResultStyles.questionText}>Question {index + 1} </Text>
          {answer.isRight ? <CheckMark /> : <WrongIcon />}
        </View>
      );
    });

  return <View style={ResultStyles.resultsWrapper}>{_renderAnswers()}</View>;
};

const ResultStyles = StyleSheet.create({
  resultsWrapper: {
    alignSelf: "center",
    justifyContent: "flex-start",
    flexBasis: "50%",
    flexWrap: "wrap",
  },
  questionWrapper: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  questionText: {
    fontSize: Variables.smallFontSize,
  },
});

export default Results;
