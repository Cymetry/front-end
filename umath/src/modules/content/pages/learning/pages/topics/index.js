import React, { PureComponent } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import ROUTES from "../../../../../../platform/constants/routes";
import TopicController from '../../../../../../platform/api/topic';
import Styles from "../../../../../../../assets/styles";
import LocalStyles from './styles';
  
class Topics extends PureComponent {

  state = {
    topics: [],
  };

  componentDidMount() {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
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
      <ScrollView style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {topics.map(item => <ListItem
              key={item.id}
              title={`${item.name} (${item.complete}/${item.total})`}
              containerStyle={LocalStyles.listItem}
              leftAvatar={{ uri: '' }}
              onPress={() => navigation.navigate(ROUTES.CONTENT_LEARNING_SKILLS, item)}
              roundAvatar
              chevron
            />)}
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default Topics;