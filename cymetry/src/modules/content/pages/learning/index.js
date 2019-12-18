import React, { PureComponent } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import { withNavigation } from "react-navigation";

import { createTabNavigationOptions } from '../../../../platform/services/navigation';
import Sub from "./pages/sub";
import Skill from "./pages/skill";
import ROUTES from "../../../../platform/constants/routes";
import TopicController from '../../../../platform/api/topic';
import Styles from "../../../../../assets/styles";
import LocalStyles from './styles';
  
class Learning extends PureComponent {

  state = {
    topics: [],
  };

  componentDidMount() {
    const { navigation } = this.props;
    const parentNavigation = navigation.dangerouslyGetParent();

    const { id } = parentNavigation.state.params;
    this.fetchTopics(id);
  }

  fetchTopics = async id => {
    const result = await TopicController.List(id);
    result && result.length && this.setState({ topics: result });
  }

  render() {
    const { topics } = this.state;
    const { navigation } = this.props;

    return (
      <View style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {topics.map(item => <ListItem
              key={item.id}
              title={`${item.name} (${item.complete}/${item.total})`}
              containerStyle={LocalStyles.listItem}
              leftAvatar={{ uri: '' }}
              onPress={() => navigation.navigate(ROUTES.CONTENT_LEARNING_SUB, item)}
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
  [ROUTES.CONTENT_LEARNING_SUB]: withNavigation(Sub),
  [ROUTES.CONTENT_LEARNING_SKILL]: withNavigation(Skill),
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    ...createTabNavigationOptions('Learning', 'Learning', 'sunny'),
  },
});;;