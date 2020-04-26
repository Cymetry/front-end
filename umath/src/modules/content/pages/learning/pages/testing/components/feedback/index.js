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

const percentToSentiment = (percent) => {
  if (percent >= 90) return 'excellent!';
  if (percent >= 80) return 'very good!';
  if (percent >= 60) return 'good!';
  return 'revision needed!';
};

const FeedBackPage = ({
  percent,
  answers,
  feedbackType = FeedbackTypeEnum.Revision,
}) => {
  return (
    <>
      <Section style={FeedbackPageStyles.resultContainer}>
        <View style={FeedbackPageStyles.resultTextWrapper}>
          <Text style={FeedbackPageStyles.percent}> {percent}% </Text>
          <Text style={FeedbackPageStyles.sentimentText}> {percentToSentiment(percent)} </Text>
        </View>
        <Results answers={answers} />
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
