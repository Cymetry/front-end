import React, { PureComponent } from 'react';
import { View, Text, AsyncStorage, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import ROUTES from '../../../../../../platform/constants/routes';
import TopicController from '../../../../../../platform/api/topic';
import Styles from '../../../../../../../assets/styles';
import LocalStyles from './styles';
import { withNavigation } from 'react-navigation';
import { navigationWrapper } from '../../../../../../platform/services/navigation';

class Topics extends PureComponent {
  state = {
    topics: [],
  };

  async componentDidMount() {
    const { id } = this.props.route.params || {};
    this.fetchTopics(id);
  }

  fetchTopics = async (id) => {
    const result = await TopicController.List(1);
    result && result.length && this.setState({ topics: result });
  };

  onTopicPress = async (item) => {
    const [token, isPremium] = await AsyncStorage.multiGet([
      'token',
      'isPremium',
    ]);

    const loggedIn = !!token[1];
    const userPremium = isPremium[1] === 'true';

    const navigateToSkill = () =>
      navigationWrapper.navigation.navigate(
        ROUTES.CONTENT_LEARNING_SKILLS,
        item,
      );

    const navigateToSubscribe = () =>
      navigationWrapper.navigation.navigate(
        ROUTES.CONTENT_SETTINGS,
        {
          initialRouteName: ROUTES.CONTENT_SETTINGS_SUBSCRIPTION
        }
      );

    const navigateToLogin = () =>
      navigationWrapper.navigation.navigate(ROUTES.AUTH);

    const cancelObj = {
      text: 'Cancel',
      style: 'cancel',
    };
    const backObj = {
      text: 'Back',
      style: 'cancel',
    };
    const purchaseObj = {
      text: 'Purchase',
      onPress: navigateToSubscribe,
    };
    const continueObj = {
      text: 'Continue',
      onPress: navigateToSkill,
    };
    const signInObj = {
      text: 'Sign in',
      onPress: navigateToLogin,
    };

    if (!loggedIn) {
      Alert.alert('Please sign in to proceed', '', [signInObj, cancelObj]);
    } else if (!userPremium && item.id !== 2) {
      Alert.alert(
        'To proceed to the topic, please purchase a subscription',
        '',
        [purchaseObj, backObj],
      );
    } else if (!userPremium) {
      Alert.alert(
        'This is a trial topic available for everyone to get a taste what umath is about. We hope you enjoy the learning.',
        '',
        [purchaseObj, continueObj],
      );
    } else {
      navigateToSkill();
    }
  };

  render() {
    const { topics } = this.state;

    return (
      <ScrollView style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {topics.map((item) => (
              <ListItem
                key={item.id}
                disabledStyle={{ opacity: 0.3 }}
                title={
                  <View style={LocalStyles.title}>
                    <Text style={Styles.text.smallSize}>{item.name}</Text>
                    <Text style={LocalStyles.completeText}>
                      {item.complete}/{item.total}
                    </Text>
                  </View>
                }
                containerStyle={LocalStyles.listItem}
                leftAvatar={{ source: { uri: item.logo }, ...Styles.avatar }}
                onPress={() => this.onTopicPress(item)}
                roundAvatar
                chevron
              />
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(Topics);
