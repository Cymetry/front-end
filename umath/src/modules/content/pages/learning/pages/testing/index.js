import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

import LocalStyles from "./styles";
import Styles from "../../../../../../../assets/styles";
import DismissKeyboard from "../../../../../../components/dismiss-keyboard";
import TestingController from "../../../../../../platform/api/skillTesting";
import TestingItem from "./item";

const numToLetter = ['a', 'b', 'c', 'd'];

const Testing = ({ route }) => {
  const { id } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  const startTesting = async (id) => {
    const result = await TestingController.Start(id);
    setQuestions(result);
  };

  useEffect(() => {
    startTesting(id);
  }, [id]);

  nextStep = () => {
    setUserAnswers([...userAnswers, {
      id: currentQuestion,
      isRight: questions[currentQuestion].answers[0] === numToLetter[selectedAnswer],
    }]);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  };

  console.log(userAnswers);

  return (
    <View stlye={Styles.page}>
      <DismissKeyboard>
        <>
          <TestingItem
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            question={questions[currentQuestion]}
          />
          <View style={LocalStyles.buttonWrapper}>
            <View
              style={
                selectedAnswer !== null ?
                {
                ...LocalStyles.button,
                ...LocalStyles.lastButtons,
                } : {
                  ...LocalStyles.button,
                  ...Styles.button.disabled,
                  ...LocalStyles.lastButtons,
                }
              }
            >
              <Button
                title="Next"
                type="clear"
                onPress={ selectedAnswer !== null ? nextStep : null }
                titleStyle={ selectedAnswer !== null ? LocalStyles.buttonTitle : LocalStyles.disabledButtonTitle }
              />
            </View>

            <View style={{ ...LocalStyles.button, ...LocalStyles.lastButtons }}>
              <Button
                titleStyle={LocalStyles.buttonTitle}
                title="Solution"
                type="clear"
              />
            </View>
          </View>
        </>
      </DismissKeyboard>
    </View>
  );
};

export default Testing;
