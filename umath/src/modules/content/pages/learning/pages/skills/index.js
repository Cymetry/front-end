import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { ListItem, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Platform } from '@unimodules/core';

import SkillController from '../../../../../../platform/api/skill';
import ROUTES from "../../../../../../platform/constants/routes";
import Styles from "../../../../../../../assets/styles";
import LocalStyles from './styles';
import { navigationWrapper } from "../../../../../../platform/services/navigation";
  
class Skills extends PureComponent {
  
  state = {
    skills: [],
  };

  get completePercent() {
    const { skills } = this.state;
    const completeCount = skills.filter(item => item.complete).length;
    return Math.floor(100 * completeCount / skills.length);
  }

  componentDidMount() {
    const { id } = navigationWrapper.navigation.state?.params || {};
    this.fetchSkills(id);
  }

  fetchSkills = async id => {
    const result = await SkillController.List(id);
    result && result.length && this.setState({ skills: result });
  }

  render() {
    const { skills } = this.state;
    const { id } = navigationWrapper.navigation.state?.params || {};

    return (
      <ScrollView style={Styles.page}>
        {!!skills.length && <View style={LocalStyles.completeContainer}>
          <Text style={LocalStyles.learningCompleteText}>{this.completePercent}% of learning complete</Text>
          <View style={{ ...LocalStyles.button, ...(this.completePercent < 100 ? Styles.button.disabled : {}) }}>
            <Button
              titleStyle={LocalStyles.buttonTitle} 
              title="Begin Test"
              type="clear"
              onPress={this.submit}
            />
          </View>
        </View>}

        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {skills.map(item => <ListItem
              key={item.id}
              title={item.name}
              containerStyle={LocalStyles.listItem}
              leftAvatar={{ source: { uri: item.logo }, ...Styles.avatar }}
              rightIcon={item.complete ? { name: Platform.OS === 'ios' ? 'ios-checkmark-circle' : 'md-checkmark-circle', type: 'ionicon', color: '#bcbec1' } : {}}
              onPress={() => navigationWrapper.navigation.navigate(ROUTES.CONTENT_LEARNING_SKILL_ITEM, { ...item, parentId: id })}
              roundAvatar
              chevron
            />)}
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default Skills;