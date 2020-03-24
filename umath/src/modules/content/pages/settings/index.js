import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

import FaqIcon from "../../../../../assets/images/faq_icon.png";
import HelpAndFeedbackIcon from "../../../../../assets/images/help_and_feedback_icon.png";
import TermsAndConditionsIcon from "../../../../../assets/images/terms_and_conditions_icon.png";
import PrivacyPolicyIcon from "../../../../../assets/images/privacy_policy_icon.png";
import SubscriptionIcon from "../../../../../assets/images/subscription_icon.png";
import SignOutIcon from "../../../../../assets/images/sign_out_icon.png";

import { createTabNavigationOptions, navigationWrapper } from '../../../../platform/services/navigation';
import Constants from './../../../../platform/constants';
import ROUTES from './../../../../platform/constants/routes';
import Styles from "../../../../../assets/styles";
import LocalStyles from './styles';
import HelpAndFeedback from "./pages/help-and-feedback";
import FAQ from "./pages/faq";
import TermsAndConditions from "./pages/terms-and-conditions";
import PrivacyPolicy from "./pages/privacy-policy";

class Settings extends Component {

  static navigationOptions = () => ({
    title: 'Settings',
    headerLeft: () => <HeaderBackButton onPress={() => navigationWrapper.navigation.navigate(ROUTES.HOME)} />
  });

  state = { token: null };

  async componentDidMount() {
    this.setState({ token: !!(await AsyncStorage.getItem('token')) });
  }

  get list() {
    const { token } = this.state;

    return [
      {
        name: 'FAQ',
        url: ROUTES.CONTENT_SETTINGS_FAQ,
        avatar_source: FaqIcon,
      },
      {
        name: 'Help & Feedback',
        url: ROUTES.CONTENT_SETTINGS_HELP,
        avatar_source: HelpAndFeedbackIcon,
      },
      {
        name: 'Terms & Conditions',
        url: ROUTES.CONTENT_SETTINGS_TERMS,
        avatar_source: TermsAndConditionsIcon,
      },
      {
        name: 'Privacy Policy',
        url: ROUTES.CONTENT_SETTINGS_PRIVACY,
        avatar_source: PrivacyPolicyIcon,
      },
      {
        name: 'Subscription',
        onPress: () => { /* */ },
        avatar_source: SubscriptionIcon,
      },
      ...(token ? [{
        name: 'Sign out',
        onPress: () => this.signOut(),
        avatar_source: SignOutIcon,
      }] : []),
    ];
  }

  signOut = async () => {
    await AsyncStorage.multiRemove(['token', 'premium']);
    navigationWrapper.navigation.reset({
      index: 0,
      actions: [navigationWrapper.navigation.navigate(ROUTES.HOME, { signOuted: true })],
    });
  }

  render() {

    return (
      <ScrollView style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {this.list.map(item => <ListItem
              key={item.name}
              title={item.name}
              onPress={() => item.url ? navigationWrapper.navigation.navigate(item.url) : item.onPress()}
              containerStyle={LocalStyles.listItem}
              leftAvatar={{ source: item.avatar_source, ...Styles.avatar }}
              roundAvatar
              chevron
            />)}
          </View>
        </View>
        <View style={{ ...Styles.card.classic }}>
          <Text style={LocalStyles.nameText}>{Constants.ProjectTitle} v1.0</Text>
          <Text style={LocalStyles.descriptionText}>By Signing in, you agree to our Terms of Service and Privacy Policy.</Text>
        </View>
      </ScrollView>
    );
  }
};

export default createStackNavigator({
  [ROUTES.CONTENT_SETTINGS]: withNavigation(Settings),
  [ROUTES.CONTENT_SETTINGS_FAQ]: FAQ,
  [ROUTES.CONTENT_SETTINGS_HELP]: HelpAndFeedback,
  [ROUTES.CONTENT_SETTINGS_TERMS]: TermsAndConditions,
  [ROUTES.CONTENT_SETTINGS_PRIVACY]: PrivacyPolicy,
}, {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: () =>  Styles.navigation,
  navigationOptions: createTabNavigationOptions('Settings', 'settings'),
});