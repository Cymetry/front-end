import React, { Component } from "react";
import { View, Text, TouchableHighlight, Keyboard } from "react-native";
import { Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Video } from "expo-av";

import SampleVideo from '../../../../../../../assets/videos/sample.mp4';
import MathJax from '../../../../../../components/mathjax';
import DismissKeyboard from '../../../../../../components/dismiss-keyboard';
import SkillLearningController from '../../../../../../platform/api/skillLearning';
import ROUTES from '../../../../../../platform/constants/routes';
import Styles from '../../../../../../../assets/styles';
import LocalStyles from './styles';

class SkillItem extends Component {

  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params;
    return { title: name };
  };

  state = {
    data: null,
    currentStep: 0,
    stepAnswers: [],
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { id, parentId } = navigation.state.params;
    let response = await SkillLearningController.Resume(id);
    if (response.message === 'Skill has been completed' || !Object.keys(response).length) response = await SkillLearningController.Start(id);
    try {
      const result = JSON.parse(response);
      if (result && result.body && result.body.content) {
        result.body.content.steps = result.body.content.steps.map(item => Array.isArray(item) ? item[0] : item);
        console.log(result.body);
        this.setState({ data: result.body.content });
      }
    } catch (e) { /* */ }
  }

  get nextDisabled() {
    const { data, stepAnswers, currentStep } = this.state;
    const lastAnswer = stepAnswers[currentStep];
    const lastActiveStep = data.steps[currentStep];

    if (lastActiveStep.fillIn) return !lastAnswer || Object.keys(lastAnswer).length !== lastActiveStep.answer.length;
    else return !lastAnswer;
  }

  nextStep = () => {
    const { currentStep, data } = this.state;
    if (currentStep === data.steps.length - 1) this.finish();
    else this.setState({ currentStep: currentStep + 1 });
  }

  finish = async () => {
    const { navigation } = this.props;
    const { id, parentId } = navigation.state.params;
    const { data, stepAnswers } = this.state;

    const body = {
      skillId: id,
      mistakeCount: 0,
      correctCount: 0,
    };

    stepAnswers.map((item, index) => {
      const stepData = data.steps[index];
      let correct = true;
      
      if (stepData.fillIn) Object.values(item).map((item, index) => {
        if (!stepData.answer[index].find(sub => sub === item)) correct = false;
      });

      else correct = item === stepData.solution;

      if (correct) body.correctCount += 1;
      else body.mistakeCount += 1;
    });

    await SkillLearningController.SaveProgress(body);
    this.setState({ data: null }, async () => {
      const response = await SkillLearningController.Resume(id);
      if (response.message === 'Skill has been completed') return navigation.navigate(ROUTES.CONTENT_LEARNING_SKILLS, { id: parentId });
  
      if (response && response.body && response.body.content) {
        response.body.content.steps = response.body.content.steps.map(item => Array.isArray(item) ? item[0] : item);
        this.setState({ data: response.body.content });
      } 
    });
  }

  prepareGraphs = (index, latex) => {
    const { data } = this.state;
    const splitted = latex.split('[()]');
    const activeStep = data.steps[index];

    if (splitted.length > 1) {
      splitted.map((item, index) => {
        if (index === splitted.length - 1) {
          splitted[index] = `$${splitted[index]}$`;
          return;
        }
        splitted[index] = `$${splitted[index]}$ <img src="${activeStep.graphs[index]}" style="width: 100%" alt="graph" />`;
      });
    } else splitted[0] = `$${splitted[0]}$ <img src="${activeStep.graphs[0]}" style="width: 100%" alt="graph" />`;
    return splitted.join('');
  } 

  fillInAnswer = (index, postData) => {
    if (postData && !parseInt(postData)) {
      const message = JSON.parse(postData);
      const { stepAnswers, currentStep } = this.state;

      if (stepAnswers[index] && index === currentStep) stepAnswers[index][message.input] = message.value;
      else if (!stepAnswers[index]) stepAnswers[index] = { [message.input]: message.value };

      this.setState({ stepAnswers });
    }
  }

  nonFillInAnswer = (index, item) => {
    const { stepAnswers, currentStep } = this.state;

    if (!stepAnswers[index] || index === currentStep) {
      stepAnswers[index] = item.index;
      this.setState({ stepAnswers });
    }
  }

  render() {
    const { data, currentStep, stepAnswers } = this.state;
    const stepsData = data && data.steps.slice(0, currentStep + 1);

    return data ? (
      <View style={Styles.page}>
        <DismissKeyboard>
          <>
            <KeyboardAwareScrollView
              enableOnAndroid
              keyboardShouldPersistTaps="handled"
              innerRef={ref => this.scrollView = ref}
              onPress={() => Keyboard.dismiss()}
              onContentSizeChange={(width, height) => this.scrollView.scrollTo({ y:height })}
            >
              {data.videoUrl && <Video
                source={SampleVideo}
                style={LocalStyles.video}
                resizeMode="contain"
                useNativeControls
              />}

              <View style={LocalStyles.container}>
                <View style={LocalStyles.questionWrapper}>
                  <MathJax html={`$${data.question}$`} />
                </View>          
              </View>
              
              <Text style={LocalStyles.solution}>Solution</Text>
              {stepsData.map((item, index) => <View key={index} style={LocalStyles.container}>
                <View style={LocalStyles.stepWrapper}>
                  <Text style={LocalStyles.stepText}>Step {index + 1}:</Text>
                  <View style={Styles.latexWrapper}>
                    <MathJax
                      html={item.graphs.length ? this.prepareGraphs(index, item.instruction) : `$${item.instruction}$`}
                      onMessage={item.fillIn ? data => this.fillInAnswer(index, data) : undefined}
                    />
                  </View>

                  {!item.fillIn && item.options.map(item => <TouchableHighlight key={item._id} style={Styles.latexWrapper} onPress={() => this.nonFillInAnswer(index, item)}>
                    <MathJax html={`<span style="${stepAnswers[index] === item.index ? 'color: blue' : ''}">(${item.index}) ${item.content}</span>`} style={{ width: '100%' }} />
                  </TouchableHighlight>)}
                </View>
              </View>)}
            </KeyboardAwareScrollView>
            <View style={LocalStyles.buttonWrapper}>
              <View style={{ ...LocalStyles.button, ...(this.nextDisabled ? Styles.button.disabled : {}) }}>
                <Button
                  disabled={this.nextDisabled}
                  titleStyle={LocalStyles.buttonTitle}
                  title={currentStep === data.steps.length - 1 ? "Finish" : "Next step"}
                  onPress={this.nextStep}
                  type="clear"
                />
              </View>
            </View>
          </>
        </DismissKeyboard>
      </View>
    ) : null;
  }
};

export default SkillItem;