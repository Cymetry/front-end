import React, { Component, createRef } from "react";
import { View, Text, TouchableHighlight, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Video } from "expo-av";
// import { Html5Entities } from "html-entities";
// import KeyboardAccessory from "react-native-sticky-keyboard-accessory";

import MathJax from "../../../../../../../components/math_jax";
import DismissKeyboard from "../../../../../../../components/dismiss-keyboard";
import Styles from "../../../../../../../../assets/styles";
import LocalStyles from "../styles";
import { parseLatex } from "../../../../../../../platform/services/latex";

// const htmlEntities = new Html5Entities();

class ExpandContent extends Component {
  state = {
    data: null,
    showSolution: false,
    erroredChoices: false,
    currentStep: 0,
    stepAnswers: [],
  };

  webViews = [createRef()];

  async componentDidMount() {
    const data = {...this.props.data};

    if (data && data.steps) {
      data.steps = data.steps.map(item => item[0]);
      
      this.setState({
        data,
        currentStep: data.steps.length - 1,
      });
    }
  }

  prepareGraphs = (index, latex) => {
    const { data } = this.state;
    const splitted = latex.split("[()]");
    const activeStep = data.steps[index];

    if (splitted.length > 1) {
      splitted.map((item, index) => {
        if (index === splitted.length - 1) {
          if (splitted[index]) splitted[index] = parseLatex(splitted[index]);
          return;
        }
        splitted[index] = `${parseLatex(splitted[index])} <img src="${
          activeStep.graphs[index]
        }" style="width: 100%; height: 400px" alt="graph" />`;
      });
    } else return parseLatex(splitted[0]);

    return splitted.join("");
  };

  fillInAnswer = (index, postData) => {
    if (postData && !parseInt(postData)) {
      const message = JSON.parse(postData);
      const { stepAnswers, currentStep } = this.state;

      if (stepAnswers[index] && index === currentStep)
        stepAnswers[index][message.input] = message.value;
      else if (!stepAnswers[index])
        stepAnswers[index] = { [message.input]: message.value };

      this.setState({ stepAnswers });
    }
  };

  showSolution = () => {
    const { data } = this.state;
    const stepAnswers = data.steps.map((item) => {
      if (item.fillIn) {
        const obj = {};
        item.answer.map((sub, subIndex) => {
          obj[subIndex] = sub[0];
        });

        return obj;
      } else return item.solution;
    });

    this.webViews = data.steps.map(() => createRef());

    this.setState({ currentStep: data.steps.length - 1, stepAnswers }, () => {
      setTimeout(() => {
        this.webViews.map((item, index) => {
          if (item.current) {
            Object.keys(stepAnswers[index]).map((sub) => {
              item.current.injectJavaScript(`
                (() => {
                  const activeElement = document.getElementById('box-' + '${
                    +sub + 1
                  }');             
                  if (activeElement) {
                    activeElement.value = '${stepAnswers[index][sub]}';
                    activeElement.style.pointerEvents = 'none';
                    const idNum = +activeElement.id.replace('box-', '');
                    window.postMessage(JSON.stringify({ value: activeElement.value, input: ${+sub} }));
                  }
  
                  return;
                })();
              `);
            });
          }
        });
      }, 1500);
    });
  };

  webViewLoaded = index => {
    const ref = this.webViews[index];
    if (ref && ref.current) ref.current.alreadyLoaded = true;

    const invalidRef = this.webViews.find(item => item && item.current && !item.current.alreadyLoaded);
    if (!invalidRef) setTimeout(() => this.showSolution(), 0);
  }

  render() {
    const { data, erroredChoices, currentStep, stepAnswers } = this.state;
    const stepsData = data && data.steps && data.steps.slice(0, currentStep + 1);

    return data ? (
      <View style={Styles.page}>
        <DismissKeyboard>
          <>
            <KeyboardAwareScrollView
              enableOnAndroid
              keyboardShouldPersistTaps="handled"
              innerRef={(ref) => (this.scrollView = ref)}
              onPress={() => Keyboard.dismiss()}
              onContentSizeChange={(width, height) =>
                this.scrollView.scrollTo({ y: height })
              }
            >
              {data.videoUrl && (
                <Video
                  source={{ uri: data.videoUrl }}
                  style={LocalStyles.video}
                  resizeMode="contain"
                  useNativeControls
                />
              )}

              {data.question && (
                <View style={LocalStyles.container}>
                  <View style={LocalStyles.questionWrapper}>
                    <MathJax html={parseLatex(data.question)} />
                  </View>
                </View>
              )}

              {!!stepsData.length && (
                <Text style={LocalStyles.solution}>Solution</Text>
              )}
              {stepsData.map((item, index) => (
                <View key={index} style={LocalStyles.container}>
                  <View style={LocalStyles.stepWrapper}>
                    <Text style={LocalStyles.stepText}>Step {index + 1}:</Text>
                    <View style={Styles.latexWrapper}>
                      <MathJax
                        html={
                          item.graphs.length
                            ? this.prepareGraphs(index, item.instruction)
                            : parseLatex(item.instruction)
                        }
                        onMessage={
                          item.fillIn
                            ? (data) => this.fillInAnswer(index, data)
                            : undefined
                        }
                        onLoadEnd={() => this.webViewLoaded(index)}
                        webViewRef={this.webViews[index]}
                      />
                    </View>

                    {!item.fillIn &&
                      item.options.map(item => (
                        <TouchableHighlight
                          key={item._id}
                          style={Styles.latexWrapper}
                        >
                          <MathJax
                            html={`<span style="${
                              stepAnswers[index] === item.index
                                ? `color: ${erroredChoices && index === stepsData.length - 1 ? 'red' : 'green'}`
                                : ""
                            }">(${item.index}) ${parseLatex(
                              item.content
                            )}</span>`}
                            style={{ width: "100%" }}
                          />
                        </TouchableHighlight>
                      ))}
                  </View>
                </View>
              ))}
            </KeyboardAwareScrollView>
          </>
        </DismissKeyboard>
      </View>
    ) : null;
  }
}

export default ExpandContent;