import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { Button } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Video } from "expo-av";

import SampleVideo from '../../../../../../../assets/videos/sample.mp4';
import MathJax from '../../../../../../components/mathjax';
import SkillLearningController from '../../../../../../platform/api/skillLearning';
import { createTabNavigationOptions } from '../../../../../../platform/services/navigation';
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
    const { id } = navigation.state.params;
    const result = await SkillLearningController.Start(id);
    
    if (result && result.body && result.body.content) {
      result.body.content.steps = result.body.content.steps.map(item => Array.isArray(item) ? item[0] : item);
      this.setState({ data: result.body.content });
    }
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
      let correct = false;
      
      if (stepData.fillIn) correct = JSON.stringify(Object.values(item)) === JSON.stringify(stepData.answer);
      else correct = item === stepData.solution;

      if (correct) body.correctCount += 1;
      else body.mistakeCount += 1;
    });

    await SkillLearningController.SaveProgress(body);
    navigation.navigate(ROUTES.CONTENT_LEARNING_SKILLS, { id: parentId });
  }

  prepareFillIn = latex => {
    const splitted = latex.split('{[');

    if (splitted.length > 1) {
      splitted.map((item, index) => {
        if (index === splitted.length - 1) return splitted[index] = '';

        if (index) {
          const number = parseInt(splitted[index + 1].split(']}')[0]);
          splitted[index] = item.split(`${number}]}`).join('');
        }
        
        const number = parseInt(splitted[index + 1].split(']}')[0]);
        const func = `(function(e) { window.postMessage(JSON.stringify({ value: e.target.value, input: ${number - 1} })); })(event)`;
        splitted[index] = `$${item}$ <input style="width: 40px" onchange="${func}" />`;
      });
    }

    return splitted.join('');
  }

  fillInAnswer = (index, postData) => {
    if (postData && !parseInt(postData)) {
      const message = JSON.parse(postData);
      const { data, stepAnswers, currentStep } = this.state;

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
        <KeyboardAwareScrollView enableOnAndroid>
          <Video
            source={SampleVideo}
            style={LocalStyles.video}
            resizeMode="contain"
            useNativeControls
          />

          <View style={LocalStyles.container}>
            <View style={LocalStyles.questionWrapper}>
              <Text style={Styles.text.normalSize}>{data.question}</Text>
            </View>          
          </View>
          
          <Text style={LocalStyles.solution}>Solution</Text>
          {stepsData.map((item, index) => <View key={index} style={LocalStyles.container}>
            <View style={LocalStyles.stepWrapper}>
              <Text style={LocalStyles.stepText}>Step {index + 1}:</Text>
              <View style={Styles.latexWrapper}>
                <MathJax
                  html={item.fillIn ? this.prepareFillIn(item.instruction) : `$${item.instruction}$`}
                  onMessage={item.fillIn ? data => this.fillInAnswer(index, data) : undefined}
                />
              </View>

              {!item.fillIn && item.options.map(item => <TouchableHighlight key={item._id} style={Styles.latexWrapper} onPress={() => this.nonFillInAnswer(index, item)}>
                <MathJax html={`<span style="${stepAnswers[index] === item.index ? 'color: blue' : ''}">$(${item.index}) ${item.content}$</span>`} />
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
      </View>
    ) : null;
  }
};

export default SkillItem;