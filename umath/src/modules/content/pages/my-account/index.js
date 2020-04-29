import React, { PureComponent } from "react";
import { View, ScrollView, Text, Image } from "react-native";
import { Bar } from "react-native-progress";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { Button } from "react-native-elements";

import truncate from "../../../../utils/truncate";

import ROUTES from "../../../../platform/constants/routes";
import SkillController from "../../../../platform/api/skill";
import TopicController from "../../../../platform/api/topic";
import AccountController from "../../../../platform/api/account";
import { navigationWrapper } from "../../../../platform/services/navigation";

import LocalStyles from "./styles";
import Styles from "../../../../../assets/styles";
import Variables from "../../../../../assets/styles/variables";
import TestsIcon from "../../../../../assets/icons/test.svg";
import ChaptersIcon from "../../../../../assets/icons/file.svg";
import QuestionsIcon from "../../../../../assets/icons/tools.svg";

const SVGIcon = ({ SVG }) => (
  <View style={LocalStyles.iconWrapper}>
    <SVG width={50} height={50} style={LocalStyles.icon} />
  </View>
);

class MyAccount extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: "My Account",
    headerLeft: () => (
      <HeaderBackButton
        onPress={() => navigationWrapper.navigation.navigate(ROUTES.HOME)}
      />
    ),
  });

  state = {
    skill: {},
    topic: {},
    tests: null,
    details: {},
    chapters: null,
    questions: null,
    progress: { revision: 0, learning: 0 },
  };

  handleSkillClick = () =>
    this.state.skill.redirectToTopic
      ? this.handleTopicClick()
      : navigationWrapper.navigation.navigate(ROUTES.CONTENT_LEARNING, {
          screen: ROUTES.CONTENT_LEARNING_SKILL_ITEM,
          params: this.state.skill,
        });

  handleTopicClick = () =>
    navigationWrapper.navigation.navigate(ROUTES.CONTENT_LEARNING, {
      screen: ROUTES.CONTENT_LEARNING_SKILLS,
      params: this.state.topic,
    });

  getPercentage = (num) => Math.round(num * 100);

  BarItem = ({ percent }) => (
    <Bar
      width={120}
      height={12}
      borderWidth={0}
      borderRadius={0}
      progress={percent}
      color={Variables.lightBlue}
      style={LocalStyles.progressBar}
      unfilledColor={Variables.lightGray}
    />
  );

  updateState = async () => {
    const {
      progress: { learning, revision },
    } = this.state;
    const result = await AccountController.Details();

    const { tests, chapters, questions } = result;

    this.setState({ tests, chapters, questions });

    if (result.recent?.lastSkill) {
      const {
        lastSkill: { skillId, topicId },
      } = result.recent;

      const [topics, skills] = await Promise.all([
        TopicController.List(1),
        SkillController.List(topicId),
      ]);

      const topic = topics.find(({ id }) => id === Number(topicId));

      const retrieveSkill = () => {
        const skillIndex = skills.findIndex(
          (skill) => skill.id === Number(skillId)
        );

        if (!skills[skillIndex].complete)
          return { ...skills[skillIndex], step: skillIndex + 1 };

        if (!skills[skillIndex + 1])
          return { ...skills[skillIndex], redirectToTopic: true };

        return { ...skills[skillIndex + 1], step: skillIndex + 2 };
      };

      const skill = retrieveSkill();

      this.setState({
        skill,
        topic,
      });
    } else {
      const topics = await TopicController.List(1);
      const topic = topics[0];

      const skills = await SkillController.List(topic.id);
      const skill = { ...skills[0], step: 1 };

      this.setState({
        skill,
        topic,
      });
    }

    this.setState({
      details: result?.user || null,
      progress: {
        revision: result?.revision || revision,
        learning: result?.learning || learning,
      },
    });
  };

  async componentDidMount() {
    this.updateState();
    this.props.navigation.addListener("focus", this.updateState);
  }

  render() {
    const {
      tests,
      topic,
      skill,
      details,
      chapters,
      progress,
      questions,
    } = this.state;

    return (
      <ScrollView style={Styles.page}>
        <View style={LocalStyles.container}>
          <Image
            style={LocalStyles.image}
            source={require("../../../../../assets/images/user.png")}
          />
          <Text style={LocalStyles.fullName}>
            {details.name} {details.surname}
          </Text>
          {skill.id && topic.id && (
            <View style={LocalStyles.progress}>
              <Button
                type="solid"
                key={skill.id}
                onPress={this.handleSkillClick}
                buttonStyle={LocalStyles.button}
                titleStyle={Styles.button.myAccountButtonTitle}
                title={truncate(`${skill.name} ${skill.step}`)}
              />
              <Button
                type="solid"
                key={topic.id}
                title={truncate(topic.name)}
                onPress={this.handleTopicClick}
                buttonStyle={LocalStyles.button}
                titleStyle={Styles.button.myAccountButtonTitle}
              />
            </View>
          )}
          <View style={LocalStyles.divider} />
          <Text style={Styles.text.normalSize}>Progress:</Text>
          <View style={LocalStyles.progressItem}>
            <Text style={Styles.text.smallSize}>Learning:</Text>
            <this.BarItem percent={progress.learning} />
            <Text style={Styles.text.smallSize}>
              {this.getPercentage(progress.learning)}%
            </Text>
          </View>
          <View style={LocalStyles.progressItem}>
            <Text style={Styles.text.smallSize}>Revision:</Text>
            <this.BarItem percent={progress.revision} />
            <Text style={Styles.text.smallSize}>
              {this.getPercentage(progress.revision)}%
            </Text>
          </View>
          <View style={LocalStyles.achievements}>
            {chapters && (
              <View style={LocalStyles.achievementItem}>
                <SVGIcon SVG={ChaptersIcon} />
                <Text style={Styles.text.smallSize}>
                  {chapters.attempted}/{chapters.total}
                </Text>
                <Text style={Styles.text.smallSize}>Chapters</Text>
              </View>
            )}
            {questions && (
              <View style={LocalStyles.achievementItem}>
                <SVGIcon SVG={QuestionsIcon} />
                <Text style={Styles.text.smallSize}>
                  {questions.completed}/{questions.total}
                </Text>
                <Text style={Styles.text.smallSize}>Skills</Text>
              </View>
            )}
            {tests && (
              <View style={LocalStyles.achievementItem}>
                <SVGIcon SVG={TestsIcon} />
                <Text style={Styles.text.smallSize}>
                  {tests.completed}/{tests.total}
                </Text>
                <Text style={Styles.text.smallSize}>Tests</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const Stack = createStackNavigator();

const MyAccountScreens = () => (
  <Stack.Navigator
    headerLayoutPreset="center"
    screenOptions={() => Styles.navigation}
    initialRouteName={ROUTES.CONTENT_MY_ACCOUNT}
  >
    <Stack.Screen
      name={ROUTES.CONTENT_MY_ACCOUNT}
      options={{ title: "My Account" }}
    >
      {(props) => <MyAccount {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default MyAccountScreens;
