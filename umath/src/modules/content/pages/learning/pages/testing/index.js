import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

import LocalStyles from "./styles";
import Styles from "../../../../../../../assets/styles";
import DismissKeyboard from "../../../../../../components/dismiss-keyboard";
import TestingController from "../../../../../../platform/api/skillTesting";
import VideoController from "../../../../../../platform/api/video";
import TestingItem from "./item";
import FeedBackPage from "./components/feedback";
import Videos from './components/videos';

const numToLetter = ['a', 'b', 'c', 'd'];

const Testing = ({ route }) => {
  const { id } = route.params;
  const [round, setRound] = useState(null);
  const [videos, setVideos] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const startTesting = async (id) => {
    const {body, round} = await TestingController.Start(id);
    setQuestions(body);
    setRound(round);
  };

  const resumeTesting = async (id) => {
    const {body, round, weakSet} = await TestingController.Resume(id);

    if (weakSet && weakSet.length) {
      const {body} = await VideoController.getVideos(weakSet);
      setVideos(body);
    } else {
      setVideos([]);
    }

    setRound(round);
    setUserAnswers([]);
    setQuestions(body);
    setCurrentQuestion(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  const testAction = async (id) => {
    const result = await TestingController.CheckStatus(id);
    if (result.task === 'start') {
      startTesting(id);
    }
    else {
      resumeTesting(id);
    }
  }

  useEffect(() => {
    testAction(id);
  }, [id]);

  const nextStep = () => {
    setUserAnswers([...userAnswers, {
      id: currentQuestion,
      uid: questions[currentQuestion].id,
      isRight: questions[currentQuestion].answers[0] === numToLetter[selectedAnswer],
    }]);
    setSelectedAnswer(null);

    const isLastPage = !questions[currentQuestion + 1];

    if (isLastPage) {
      setShowFeedback(true);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
  };

  useEffect(() => {
    if (questions.length === userAnswers.length && userAnswers.length !== 0)
      TestingController.SaveProgress(userAnswers, id);
  }, [showFeedback]);

  const calculatePercent = () => {
    const totalScore = questions.reduce((score, question) => score + question.score, 0);
    const percent = userAnswers.reduce((percent, answer, answerIndex) => {
      if (answer.isRight)
        return percent + (questions[answerIndex].score / totalScore) * 100;
      return percent;
    }, 0);
    return Math.floor(percent);
  };

  if (showFeedback) {
    return (
      <View style={Styles.page}>
        <FeedBackPage
          round={round}
          answers={userAnswers}
          percent={calculatePercent()}
          resumeTest={resumeTesting}
        />
      </View>
    );
  }

  if (videos.length) {
    return (
      <View style={Styles.page}>
        <Videos
          videos={videos}
        />
      </View>
    );
  }

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

            { round === 'round1' ? null :
              <View style={{ ...LocalStyles.button, ...LocalStyles.lastButtons }}>
                <Button
                  titleStyle={LocalStyles.buttonTitle}
                  title="Solution"
                  type="clear"
                />
              </View>
            }
          </View>
        </>
      </DismissKeyboard>
    </View>
  );
};

export default Testing;
