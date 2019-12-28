import React, { PureComponent } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import SkillController from '../../../../../../platform/api/skill';
import ROUTES from "../../../../../../platform/constants/routes";
import Styles from "../../../../../../../assets/styles";
import LocalStyles from './styles';
  
class Skills extends PureComponent {

  state = {
    skills: [],
  };

  componentDidMount() {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    this.fetchSkills(id);
  }

  fetchSkills = async id => {
    const result = await SkillController.List(id);
    result && result.length && this.setState({ skills: result });
  }

  render() {
    const { skills } = this.state;
    const { navigation } = this.props;

    return (
      <ScrollView style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {skills.map(item => <ListItem
              key={item.id}
              title={`${item.name} ${item.complete ? '(complete)' : ''}`}
              containerStyle={LocalStyles.listItem}
              leftAvatar={{ uri: '' }}
              onPress={() => navigation.navigate(ROUTES.CONTENT_LEARNING_SKILL_ITEM, item)}
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