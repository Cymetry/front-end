import React, { PureComponent } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import ROUTES from "../../../../../../platform/constants/routes";
import TopicController from '../../../../../../platform/api/topic';
import Styles from "../../../../../../../assets/styles";
import LocalStyles from './styles';
import { withNavigation } from 'react-navigation';
import { navigationWrapper } from "../../../../../../platform/services/navigation";
  
class Topics extends PureComponent {

  state = {
    topics: [],
    userPremium: false,
  };

  async componentDidMount() {
    const { id } = this.props.route.params || {};
    this.fetchTopics(id);
    this.setState({ userPremium: !!(await AsyncStorage.getItem('premium')) });
  }

  fetchTopics = async id => {
    const result = await TopicController.List(id);
    result && result.length && this.setState({ topics: result });
  }

  render() {
    const { navigation } = this.props;
    const { topics, userPremium } = this.state;

    return (
      <ScrollView style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {topics.map(item => <ListItem
              key={item.id}
              // disabled={!!index && !userPremium}
              disabledStyle={{ opacity: .3 }}
              title={<View style={LocalStyles.title}>
                <Text style={Styles.text.smallestSize}>{item.name}</Text>
                <Text style={LocalStyles.completeText}>{item.complete}/{item.total}</Text>
              </View>}
              containerStyle={LocalStyles.listItem}
              leftAvatar={{ source: { uri: item.logo }, ...Styles.avatar }}
              // onPress={() => (!index || userPremium) && navigation.navigate(ROUTES.CONTENT_LEARNING_SKILLS, item)}
              onPress={() => navigationWrapper.navigation.navigate(ROUTES.CONTENT_LEARNING_SKILLS, item)}
              roundAvatar
              chevron
            />)}  
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default withNavigation(Topics);