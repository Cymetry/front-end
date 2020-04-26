import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

import FeedbackPageStyles from "./styles";
import Section from "../../../../../../../../components/section";
import Results from "./results";

const percentToSentiment = (percent) => {
  if (percent >= 90) return 'excellent!';
  if (percent >= 80) return 'very good!';
  if (percent >= 60) return 'good!';
  return 'revision needed!';
};

const FeedBackPage = ({
  round,
  percent,
  answers,
  resumeTest
}) => {
  return (
    <>
      <Section style={FeedbackPageStyles.resultContainer}>
        <View style={FeedbackPageStyles.resultTextWrapper}>
          <Text style={FeedbackPageStyles.percent}> {percent}% </Text>
          <Text style={FeedbackPageStyles.sentimentText}> {percentToSentiment(percent)} </Text>
        </View>
        <Results answers={answers} />
      </Section>
      <Section style={FeedbackPageStyles.buttonContainer}>
        <Button
          style={FeedbackPageStyles.button}
          onPress={resumeTest}
          title={
            round === 'round1'
              ? "Mistake Revision"
              : "Proceed to tests"
          }
        />
      </Section>
    </>
  );
};

export default FeedBackPage;
