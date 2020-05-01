import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { Button } from "react-native-elements";

import LocalStyles from "./styles";
import { withNavigation } from "react-navigation";
import Styles from "../../../../../../../assets/styles";
import DismissKeyboard from "../../../../../../components/dismiss-keyboard";
import TestingController from "../../../../../../platform/api/skillTesting";
import VideoController from "../../../../../../platform/api/video";
import TestingItem from "./item";
import FeedBackPage from "./components/feedback";
import Videos from './components/videos';
import ROUTES from "../../../../../../platform/constants/routes";
import { ScrollView } from "react-native-gesture-handler";

const numToLetter = ['a', 'b', 'c', 'd'];
const letterToNum = {
  a: 0,
  b: 1,
  c: 2,
  d: 3
};

const Testing = ({ route, navigation }) => {
  const { id } = route.params;
  const [round, setRound] = useState(null);
  const [videos, setVideos] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [fillInAnswer, setFillinAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [solutionShown, setSolutionShown] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const startTesting = async (id) => {
    const {body, round} = await TestingController.Start(id);
    setQuestions(body);
    setRound(round);
  };

  const resumeTesting = async (id) => {
    const {body, round, weakSet, message} = await TestingController.Resume(id);

    if ("Failed to find coverable skills for test" === message) {
      navigation.navigate(ROUTES.CONTENT_LEARNING_SKILLS, { id });
      Alert.alert(
        'Skill Testing',
        'Coming soon',
      );
      return;
    }

    if (["SkillTest has been completed", "SkillTest Complete!"].includes(message)) {
      navigation.navigate(ROUTES.CONTENT_LEARNING_SKILLS, { id });
      Alert.alert(
        'Skill Testing',
        'The test has been completed',
      );
      return;
    }
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
    setFillinAnswer(null);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setSolutionShown(false);
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
    const answer = questions[currentQuestion].fillIn ? fillInAnswer : numToLetter[selectedAnswer];
    const isRight = questions[currentQuestion].answers.includes(answer);

    setUserAnswers([...userAnswers, {
      id: currentQuestion,
      uid: questions[currentQuestion].id,
      isRight: !solutionShown ? isRight : false,
    }]);
    setFillinAnswer(null);
    setSelectedAnswer(null);

    const isLastPage = !questions[currentQuestion + 1];

    if (isLastPage) {
      setShowFeedback(true);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
    setSolutionShown(false);
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

  const showSolution = () => {
    setSolutionShown(true);
    if (questions[currentQuestion].fillIn) {
      setFillinAnswer(questions[currentQuestion].answers[0]);
    }
    else {
      setSelectedAnswer(letterToNum[questions[currentQuestion].answers[0]]);
    }
  };

  const clearVideos = () => {
    setVideos([]);
  };

  const handleFillinAnswer = (data) => {
    const {value} = JSON.parse(data);
    setFillinAnswer(value);
  };

  if (showFeedback) {
    return (
      <View style={Styles.page}>
        <FeedBackPage
          round={round}
          answers={userAnswers}
          percent={calculatePercent()}
          resumeTest={() => resumeTesting(id)}
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
        <View style={LocalStyles.buttonWrapper}>
          <View style={{ ...LocalStyles.button, ...LocalStyles.lastButtons }}>
            <Button
              title="Done"
              type="clear"
              onPress={ clearVideos }
              titleStyle={ LocalStyles.buttonTitle }
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View stlye={Styles.page}>
      <DismissKeyboard>
        <ScrollView>
          <TestingItem
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            question={questions[currentQuestion]}
            onMessage={questions[currentQuestion]?.fillIn ? handleFillinAnswer : null}
            showAnswer={solutionShown}
          />
          <View style={LocalStyles.buttonWrapper}>
            <View
              style={
                (selectedAnswer !== null || fillInAnswer !== null) ?
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
                onPress={ (selectedAnswer !== null || fillInAnswer !== null) ? nextStep : null }
                titleStyle={ (selectedAnswer !== null || fillInAnswer !== null) ? LocalStyles.buttonTitle : LocalStyles.disabledButtonTitle }
              />
            </View>

            { round === 'round1' ? null :
              <View style={{ ...LocalStyles.button, ...LocalStyles.lastButtons }}>
                <Button
                  onPress={showSolution}
                  type="clear"
                  title="Solution"
                  titleStyle={LocalStyles.buttonTitle}
                />
              </View>
            }
          </View>
        </ScrollView>
      </DismissKeyboard>
    </View>
  );
};

export default withNavigation(Testing);
