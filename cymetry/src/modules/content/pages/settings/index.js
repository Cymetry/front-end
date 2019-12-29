import React, { PureComponent } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

import { createTabNavigationOptions } from '../../../../platform/services/navigation';
import Constants from './../../../../platform/constants';
import ROUTES from './../../../../platform/constants/routes';
import Styles from "../../../../../assets/styles";
import LocalStyles from './styles';
import HelpAndFeedback from "./pages/help-and-feedback";
import Curriculum from "./pages/curriculum";
import FAQ from "./pages/faq";

class Settings extends PureComponent {

  list = [
    {
      name: 'Curriculum',
      url: ROUTES.CONTENT_SETTINGS_CURRICULUM,
      avatar_url: '',
    },
    {
      name: 'FAQ',
      url: ROUTES.CONTENT_SETTINGS_FAQ,
      avatar_url: '',
    },
    {
      name: 'Help & Feedback',
      url: ROUTES.CONTENT_SETTINGS_HELP,
      avatar_url: '',
    },
    {
      name: 'Sign out',
      onPress: () => this.signOut(),
      avatar_url: '',
    },
  ];

  signOut = async () => {
    const { navigation } = this.props;
    await AsyncStorage.removeItem('token');
    navigation.navigate(ROUTES.AUTH);
  }

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {this.list.map(item => <ListItem
              key={item.name}
              title={item.name}
              onPress={() => item.url ? navigation.navigate(item.url) : item.onPress()}
              containerStyle={LocalStyles.listItem}
              leftAvatar={{ uri: item.avatar_url }}
              roundAvatar
              chevron
            />)}
          </View>
        </View>
        <View style={Styles.card.classic}>
          <Text style={LocalStyles.nameText}>{Constants.ProjectTitle} v1.0</Text>
          <Text style={LocalStyles.descriptionText}>By Signing in, you agree to our Terms of Service and Privacy Policy.</Text>
        </View>
      </ScrollView>
    );
  }
};

export default createStackNavigator({
  [ROUTES.CONTENT_SETTINGS]: withNavigation(Settings),
  [ROUTES.CONTENT_SETTINGS_CURRICULUM]: Curriculum,
  [ROUTES.CONTENT_SETTINGS_FAQ]: FAQ,
  [ROUTES.CONTENT_SETTINGS_HELP]: HelpAndFeedback,
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
    ...createTabNavigationOptions('Settings', 'Settings', 'settings'),
  },
});