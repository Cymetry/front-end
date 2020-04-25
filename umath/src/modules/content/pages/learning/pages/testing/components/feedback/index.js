import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

import FeedbackPageStyles from "./styles";
import Section from "../../../../../../../../components/section";
import Results from "./results";

const FeedbackTypeEnum = Object.freeze({
  Revision: 0,
  Test: 1,
});

const questions = [
  {
    id: 1,
    isRight: false,
  },
  {
    id: 2,
    isRight: true,
  },
  {
    id: 3,
    isRight: true,
  },
  {
    id: 4,
    isRight: true,
  },
  {
    id: 5,
    isRight: true,
  },
  {
    id: 6,
    isRight: true,
  },
  {
    id: 7,
    isRight: false,
  },
];

const FeedBackPage = ({
  percent = "70%",
  sentiment = "Very good !",
  feedbackType = FeedbackTypeEnum.Revision,
}) => {
  return (
    <>
      <Section style={FeedbackPageStyles.resultContainer}>
        <View style={FeedbackPageStyles.resultTextWrapper}>
          <Text style={FeedbackPageStyles.percent}> {percent} </Text>
          <Text style={FeedbackPageStyles.sentimentText}> {sentiment} </Text>
        </View>
        <Results answers={questions} />
        {feedbackType === FeedbackTypeEnum.Test ? (
          <Button style={FeedbackPageStyles.button} title="See the solutions" />
        ) : null}
      </Section>
      <Section style={FeedbackPageStyles.buttonContainer}>
        <Button
          style={FeedbackPageStyles.button}
          title={
            feedbackType === FeedbackTypeEnum.Revision
              ? "Mistake Revision"
              : "Proceed to tests"
          }
        />
      </Section>
    </>
  );
};

export default FeedBackPage;
