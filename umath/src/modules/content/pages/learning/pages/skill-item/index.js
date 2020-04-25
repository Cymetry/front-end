import React, { Component, createRef } from "react";
import { View, Text, TouchableHighlight, Keyboard, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Video } from "expo-av";
import { withNavigation } from "react-navigation";
// import { Html5Entities } from "html-entities";
// import KeyboardAccessory from "react-native-sticky-keyboard-accessory";

import * as AlertMessage from "../../../../../../const/alert";

import MathJax from "../../../../../../components/math_jax";
import DismissKeyboard from "../../../../../../components/dismiss-keyboard";
import SkillLearningController from "../../../../../../platform/api/skillLearning";
import Styles from "../../../../../../../assets/styles";
import LocalStyles from "./styles";
import { parseLatex } from "../../../../../../platform/services/latex";
import AsyncAlert from "../../../../../../components/async_alert";
import ExpandContent from "./components/expand-content";
import { navigationWrapper } from "../../../../../../platform/services/navigation";

// const htmlEntities = new Html5Entities();

class SkillItem extends Component {
  state = {
    data: null,
    showSolution: false,
    erroredChoices: false,
    expandOpened: false,
    expandData: null,
    currentStep: 0,
    stepAnswers: [],
  };

  webViews = [createRef()];
  reamingMistakes = 2;
  mistakeCount = 0;

  async componentDidMount() {
    const { id } = this.props.route.params || {};

    let response = await SkillLearningController.Resume(id);

    if (
      response.message === "Skill has been completed" ||
      !Object.keys(response).length
    )
      response = await SkillLearningController.Start(id);
    const result = JSON.parse(response);

    if (result?.body?.content) {
      if (typeof result.body.content.content === "string")
        result.body.content.videoUrl = result.body.content.content;
      this.reamingMistakes =
        result.body.maxMistakes || result.body.maxMistakes === 0
          ? result.body.maxMistakes + 1
          : 2;
      result.body.content.steps = result.body.content.steps
        ? result.body.content.steps.map((item) =>
            Array.isArray(item) ? item[0] : item
          )
        : [];
      this.setState({
        data: result.body.content,
        expandData: result.body.given,
        currentStep: 0,
        stepAnswers: [],
        showSolution: result.body.maxMistakes && result.body.maxMistakes > 100,
      });
    }
  }

  get nextDisabled() {
    const { data, stepAnswers, currentStep } = this.state;

    if (data.steps.length) {
      const lastAnswer = stepAnswers[currentStep];
      const lastActiveStep = data.steps[currentStep];

      if (lastActiveStep.fillIn)
        return (
          !lastAnswer ||
          Object.keys(lastAnswer).length !== lastActiveStep.answer.length
        );
      else return !lastAnswer;
    }

    return false;
  }

  toggleExpand = () => {
    const { expandOpened } = this.state;
    this.setState({ expandOpened: !expandOpened }, () => {
      setTimeout(() => this.scrollView.scrollTo({ y: 0 }), 0);
    });
  }

  nextStep = async () => {
    if (this.state.data.videoUrl) {
      const dialogResult = await AsyncAlert(
        AlertMessage.videoRedirectWarning,
        "",
        {
          confirmText: "Continue",
          cancelText: "Cancel",
        }
      );

      if (!dialogResult) return null;
    }

    if (!this.nextDisabled) {
      const reamingMistakesSave = this.reamingMistakes;
      const { currentStep, stepAnswers, data } = this.state;

      const answer = stepAnswers[stepAnswers.length - 1];
      const stepData = data.steps[currentStep];

      if (stepData && answer) {
        let correct = true;

        if (stepData.fillIn)
          Object.values(answer).map((item, index) => {
            if (!stepData.answer[index].find((sub) => sub === item))
              correct = false;
          });
        else if (answer !== stepData.solution) correct = false;

        if (!correct) {
          this.reamingMistakes--;
          this.mistakeCount++;
        }
      }

      const lastWebview = this.webViews[this.webViews.length - 1];
      if (lastWebview.current || data.videoUrl) {
        if (this.reamingMistakes <= 0) this.setState({ erroredChoices: true }, () => this.finish(false));
        else if (reamingMistakesSave !== this.reamingMistakes) {
          lastWebview.current && lastWebview.current.injectJavaScript(`
            (() => {
              const inputs = document.querySelectorAll('[id^="box-"]');             
              Array.from(inputs).forEach(item => {
                item.value = '';
                item.style.border = '1px solid red';
              });

              return;
            })();
          `);

          this.setState({ erroredChoices: true });
        } else {
          lastWebview.current && lastWebview.current.injectJavaScript(`
            (() => {
              const inputs = document.querySelectorAll('[id^="box-"]');             
              Array.from(inputs).forEach(item => {
                delete item.style.border;
              });

              return;
            })();
          `);

          this.setState({ erroredChoices: false });

          if (currentStep === data.steps.length - 1 || !data.steps.length) {
            this.finish(true);
          } else {
            this.webViews.push(createRef());
            this.setState({ currentStep: currentStep + 1 });
          }
        }
      }
    }
  };

  finish = fullFinished => this.setState({ expandData: null }, async () => {
    const { id } = this.props.route.params || {};
    const { data, currentStep } = this.state;
    const stepsData = data && data.steps.slice(0, currentStep + 1);

    const body = {
      skillId: id,
      mistakeCount: this.mistakeCount,
      correctCount: fullFinished ? stepsData.length : stepsData.length - 1,
    };

    await SkillLearningController.SaveProgress(body);

    const response = await SkillLearningController.Resume(id);

    if (response && response.message) Alert.alert(response.message, '', [{
        text: 'Back',
        onPress: () => navigationWrapper.navigation.goBack(),
    }]);

    try {
      const result = JSON.parse(response);

      if (result && result.message) Alert.alert(result.message, '', [{
        text: 'Back',
        onPress: () => navigationWrapper.navigation.goBack(),
      }]); else if (data && !data.videoUrl) Alert.alert(AlertMessage.stepRedirectWarning, '', [{
        text: 'Continue',
      }]);

      if (typeof result.body.content.content === "string") {
        result.body.content.videoUrl = result.body.content.content;
      } else {
        // fullFinished
        //   ? await AsyncAlert(AlertMessage.completeSkill)
        //   : await AsyncAlert(AlertMessage.nextSkill);
      }

      result.body.content.steps = result.body.content.steps
        ? result.body.content.steps.map((item) =>
            Array.isArray(item) ? item[0] : item
          )
        : [];

      this.mistakeCount = 0;
      this.reamingMistakes =
        result.body.maxMistakes || result.body.maxMistakes === 0
          ? result.body.maxMistakes + 1
          : 2;

      this.webViews = [createRef()];
      this.setState({
        data: result.body.content,
        expandData: result.body.given,
        currentStep: 0,
        stepAnswers: [],
        showSolution: result.body.maxMistakes && result.body.maxMistakes > 100,
        erroredChoices: false,
      });
    } catch (e) {
      /* */
    }
  });

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

  nonFillInAnswer = (index, item) => this.setState({ erroredChoices: false }, async () => {
    const { stepAnswers, currentStep } = this.state;

    if (!stepAnswers[index] || index === currentStep) {
      stepAnswers[index] = item.index;
      this.setState({ stepAnswers });
    }
  });

  // keyboardType = (content) => {
  //   const currents = this.webViews
  //     .filter((item) => item.current)
  //     .map((item) => item.current);

  //   currents.map((item) =>
  //     item.injectJavaScript(`
  //       (() => {
  //         if (document.activeElement && document.activeElement.tagName === 'INPUT') {
  //           const { activeElement } = document;
  //           const splitted = activeElement.value.split('');
  //           splitted[activeElement.selectionStart] = '${content}' + (splitted[activeElement.selectionStart] || '');
  //           activeElement.value = splitted.join('');
  //           const idNum = +activeElement.id.replace('box-', '');
  //           window.postMessage(JSON.stringify({ value: activeElement.value, input: idNum - 1 }));
  //         }

  //         return;
  //       })(); 
  //     `)
  //   );
  // };

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

  render() {
    const { data, erroredChoices, expandOpened, expandData, currentStep, stepAnswers, showSolution } = this.state;
    const stepsData = data && data.steps.slice(0, currentStep + 1);

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
                !expandOpened && this.scrollView.scrollTo({ y: height })
              }
            >
              {expandOpened && expandData && <ExpandContent data={expandData} />}
              {expandData && <TouchableOpacity
                onPress={this.toggleExpand}
                style={{
                  ...LocalStyles.expandToggle,
                  ...(expandOpened ? LocalStyles.expandToggleOpened : {})
                }}
              >
                <Text style={LocalStyles.expandToggleText}>
                  {expandOpened ? '-' : '+'} Solution of the previous problem
                </Text>
              </TouchableOpacity>}

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
                        webViewRef={this.webViews[index]}
                      />
                    </View>

                    {!item.fillIn &&
                      item.options.map((item) => console.warn(item) || (
                        <TouchableHighlight
                          key={item._id}
                          style={Styles.latexWrapper}
                          onPress={() => this.nonFillInAnswer(index, item)}
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
            {/* <KeyboardAccessory>
              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  bottom: -60,
                  flex: 1,
                  backgroundColor: "transparent",
                }}
              >
                <View
                  style={{
                    ...LocalStyles.button,
                    width: Dimensions.get("window").width / 5,
                  }}
                >
                  <Button
                    titleStyle={Styles.button.title}
                    title={htmlEntities.decode("&radic;")}
                    onPress={() => this.keyboardType("√()")}
                    type="clear"
                  />
                </View>
                <View
                  style={{
                    ...LocalStyles.button,
                    width: Dimensions.get("window").width / 5,
                  }}
                >
                  <Button
                    titleStyle={Styles.button.title}
                    title="sin"
                    onPress={() => this.keyboardType("sin()")}
                    type="clear"
                  />
                </View>
                <View
                  style={{
                    ...LocalStyles.button,
                    width: Dimensions.get("window").width / 5,
                  }}
                >
                  <Button
                    titleStyle={Styles.button.title}
                    title="cos"
                    onPress={() => this.keyboardType("cos()")}
                    type="clear"
                  />
                </View>
                <View
                  style={{
                    ...LocalStyles.button,
                    width: Dimensions.get("window").width / 5,
                  }}
                >
                  <Button
                    titleStyle={Styles.button.title}
                    title="tan"
                    onPress={() => this.keyboardType("tan()")}
                    type="clear"
                  />
                </View>
                <View
                  style={{
                    ...LocalStyles.button,
                    width: Dimensions.get("window").width / 5,
                  }}
                >
                  <Button
                    titleStyle={Styles.button.title}
                    title="kot"
                    onPress={() => this.keyboardType("kot()")}
                    type="clear"
                  />
                </View>
              </View>
            </KeyboardAccessory> */}
            <View style={LocalStyles.buttonWrapper}>
              <View
                style={{
                  ...LocalStyles.button,
                  ...LocalStyles.lastButtons,
                  ...(this.nextDisabled ? Styles.button.disabled : {}),
                }}
              >
                <Button
                  titleStyle={
                    this.nextDisabled
                      ? LocalStyles.disabledButtonTitle
                      : LocalStyles.buttonTitle
                  }
                  title={
                    !stepsData.length || currentStep === data.steps.length - 1
                      ? "Done"
                      : "Next step"
                  }
                  onPress={this.nextStep}
                  type="clear"
                />
              </View>

              {!!showSolution && (
                <View
                  style={{ ...LocalStyles.button, ...LocalStyles.lastButtons }}
                >
                  <Button
                    titleStyle={LocalStyles.buttonTitle}
                    title="Solution"
                    onPress={this.showSolution}
                    type="clear"
                  />
                </View>
              )}
            </View>
          </>
        </DismissKeyboard>
      </View>
    ) : null;
  }
}

export default withNavigation(SkillItem);
