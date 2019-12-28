import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { ListItem, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import MathJax from "react-native-mathjax";

import SkillLearningController from '../../../../../../platform/api/skillLearning';
import { createTabNavigationOptions } from '../../../../../../platform/services/navigation';
import Styles from "../../../../../../../assets/styles";
import LocalStyles from './styles';

class SkillItem extends PureComponent {

  static navigationOptions = createTabNavigationOptions('Skill', 'Skill', 'sunny');

  state = {
    data: null,
    currentStep: 0,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    
    const result = await SkillLearningController.Start(id);
    console.log(result.body.content);
    result && result.body && result.body.content && this.setState({ data: result.body.content });
  }

  nextStep = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: currentStep + 1});
  }

  prepareFillIn = latex => {
    return latex.split('{[').join('<input style="width: 20px" />');
  }

  render() {
    const { data, currentStep } = this.state;
    const { navigation } = this.props;

    const stepsData = data && data.steps.slice(0, currentStep + 1);

    return data ? (
      <View style={Styles.page}>
        <ScrollView>
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
                <MathJax html={item.fillIn ? this.prepareFillIn(item.instruction) : `$${item.instruction}$`} />
              </View>

              {!item.fillIn && item.options.map(item => <View key={item._id} style={Styles.latexWrapper}>
                <MathJax html={`$${item.index}) ${item.content}$`} />
              </View>)}
            </View>
          </View>)}
        </ScrollView>
        <View style={LocalStyles.buttonWrapper}>
          <View style={LocalStyles.button}>
            <Button
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