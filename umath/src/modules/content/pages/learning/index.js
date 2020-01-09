import React, { PureComponent } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

import { createTabNavigationOptions } from '../../../../platform/services/navigation';
import Topics from "./pages/topics";
import Skills from "./pages/skills";
import SkillItem from "./pages/skill-item";
import ROUTES from "../../../../platform/constants/routes";
import CurriculumController from '../../../../platform/api/curriculum';
import Styles from "../../../../../assets/styles";
import LocalStyles from './styles';
  
class Learning extends PureComponent {

  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params;
    
    return {
      title: name,
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate(ROUTES.HOME)} />
    };
  };

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
      <ScrollView style={Styles.page}>
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
      </ScrollView>
    );
  }
};

export default createStackNavigator({
  [ROUTES.CONTENT_LEARNING]: withNavigation(Learning),
  [ROUTES.CONTENT_LEARNING_TOPICS]: withNavigation(Topics),
  [ROUTES.CONTENT_LEARNING_SKILLS]: withNavigation(Skills),
  [ROUTES.CONTENT_LEARNING_SKILL_ITEM]: withNavigation(SkillItem),
}, {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: () =>  Styles.navigation,
  navigationOptions: createTabNavigationOptions('Learning', 'sunny'),
});