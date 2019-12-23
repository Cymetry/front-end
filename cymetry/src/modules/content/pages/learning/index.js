import React, { PureComponent } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import { withNavigation } from "react-navigation";

import { createTabNavigationOptions } from '../../../../platform/services/navigation';
import Topics from "./pages/topics";
import Skills from "./pages/skills";
import SkillItem from "./pages/skill-item";
import ROUTES from "../../../../platform/constants/routes";
import CurriculumController from '../../../../platform/api/curriculum';
import Styles from "../../../../../assets/styles";
import LocalStyles from './styles';
  
class Learning extends PureComponent {

  state = {
    curriculums: [],
  };

  componentDidMount() {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    this.fetchCurriculums(id);
  }

  fetchCurriculums = async id => {
    const result = await CurriculumController.List(id);
    result && result.length && this.setState({ curriculums: result });
  }

  render() {
    const { curriculums } = this.state;
    const { navigation } = this.props;

    return (
      <View style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {curriculums.map(item => <ListItem
              key={item.id}
              title={item.name}
              containerStyle={LocalStyles.listItem}
              leftAvatar={{ uri: '' }}
              onPress={() => navigation.navigate(ROUTES.CONTENT_LEARNING_TOPICS, item)}
              roundAvatar
              chevron
            />)}
          </View>
        </View>
      </View>
    );
  }
};

export default createStackNavigator({
  [ROUTES.CONTENT_LEARNING]: withNavigation(Learning),
  [ROUTES.CONTENT_LEARNING_TOPICS]: withNavigation(Topics),
  [ROUTES.CONTENT_LEARNING_SKILLS]: withNavigation(Skills),
  [ROUTES.CONTENT_LEARNING_SKILL_ITEM]: withNavigation(SkillItem),
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    ...createTabNavigationOptions('Learning', 'Learning', 'sunny'),
  },
});;;