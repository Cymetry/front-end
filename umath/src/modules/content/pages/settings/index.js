import React, { Component } from "react";
import { View, Text, AsyncStorage, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import {
  createStackNavigator,
  HeaderBackButton
} from "@react-navigation/stack";
import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

import FaqIcon from "../../../../../assets/images/faq_icon.png";
import HelpAndFeedbackIcon from "../../../../../assets/images/help_and_feedback_icon.png";
import TermsAndConditionsIcon from "../../../../../assets/images/terms_and_conditions_icon.png";
import PrivacyPolicyIcon from "../../../../../assets/images/privacy_policy_icon.png";
import SubscriptionIcon from "../../../../../assets/images/subscription_icon.png";
import SignOutIcon from "../../../../../assets/images/sign_out_icon.png";

import {
  createTabNavigationOptions,
  navigationWrapper
} from "../../../../platform/services/navigation";
import Constants from "./../../../../platform/constants";
import ROUTES from "./../../../../platform/constants/routes";
import Styles from "../../../../../assets/styles";
import LocalStyles from "./styles";
import HelpAndFeedback from "./pages/help-and-feedback";
import FAQ from "./pages/faq";
import TermsAndConditions from "./pages/terms-and-conditions";
import PrivacyPolicy from "./pages/privacy-policy";
import PaymentScreen from "./pages/payments";

const Stack = createStackNavigator();

class Settings extends Component {
  static navigationOptions = () => ({
    title: "Settings",
    headerLeft: () => (
      <HeaderBackButton
        onPress={() => navigationWrapper.navigation.navigate(ROUTES.HOME)}
      />
    )
  });

  state = { token: null };

  async componentDidMount() {
    this.setState({ token: !!(await AsyncStorage.getItem("token")) });
  }

  get list() {
    const { token } = this.state;

    return [
      {
        name: "FAQ",
        url: ROUTES.CONTENT_SETTINGS_FAQ,
        avatar_source: FaqIcon
      },
      {
        name: "Help & Feedback",
        url: ROUTES.CONTENT_SETTINGS_HELP,
        avatar_source: HelpAndFeedbackIcon
      },
      {
        name: "Terms & Conditions",
        url: ROUTES.CONTENT_SETTINGS_TERMS,
        avatar_source: TermsAndConditionsIcon
      },
      {
        name: "Privacy Policy",
        url: ROUTES.CONTENT_SETTINGS_PRIVACY,
        avatar_source: PrivacyPolicyIcon
      },
      {
        name: "Subscription",
        onPress: () =>
          token
            ? navigationWrapper.navigation.navigate(
                ROUTES.CONTENT_SETTINGS_SUBSCRIPTION
              )
            : Alert.alert("Please sign in to be able to subscribe", "", [
                {
                  text: "Sign in",
                  onPress: () =>
                    navigationWrapper.navigation.navigate(ROUTES.AUTH)
                },
                {
                  text: "Cancel",
                  style: "cancel"
                }
              ]),
        avatar_source: SubscriptionIcon
      },
      ...(token
        ? [
            {
              name: "Sign out",
              onPress: () => this.onSignOutPress(),
              avatar_source: SignOutIcon
            }
          ]
        : [])
    ];
  }

  signOut = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "premium"]);
      navigationWrapper.navigation.navigate(ROUTES.HOME);
    } catch (e) {
      console.warn(e);
    }
  };

  onSignOutPress = () => {
    Alert.alert("Are you sure you want to sign out?", "", [
      {
        text: "Confirm",
        onPress: this.signOut
      },
      {
        text: "Cancel",
        style: "cancel"
      }
    ]);
  };

  render() {
    return (
      <ScrollView style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {this.list.map(item => (
              <ListItem
                key={item.name}
                title={item.name}
                onPress={() =>
                  item.url
                    ? navigationWrapper.navigation.navigate(item.url)
                    : item.onPress()
                }
                containerStyle={LocalStyles.listItem}
                leftAvatar={{ source: item.avatar_source, ...Styles.avatar }}
                roundAvatar
                chevron
              />
            ))}
          </View>
        </View>
        <View style={{ ...Styles.card.classic }}>
          <Text style={LocalStyles.nameText}>
            {Constants.ProjectTitle} v1.0
          </Text>
          <Text style={LocalStyles.descriptionText}>
            By Signing in, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const MyAccountScreens = () => (
  <Stack.Navigator
    headerLayoutPreset="center"
    screenOptions={() => Styles.navigation}
    initialRouteName={ROUTES.CONTENT_SETTINGS}
  >
    <Stack.Screen
      component={Settings}
      name={ROUTES.CONTENT_SETTINGS}
      options={{ title: "Settings" }}
    />
    <Stack.Screen
      component={FAQ}
      name={ROUTES.CONTENT_SETTINGS_FAQ}
      options={{ title: "FAQ" }}
    />
    <Stack.Screen
      component={HelpAndFeedback}
      name={ROUTES.CONTENT_SETTINGS_HELP}
    />
    <Stack.Screen
      component={TermsAndConditions}
      name={ROUTES.CONTENT_SETTINGS_TERMS}
    />
    <Stack.Screen
      component={PrivacyPolicy}
      name={ROUTES.CONTENT_SETTINGS_PRIVACY}
    />
    <Stack.Screen
      component={PaymentScreen}
      name={ROUTES.CONTENT_SETTINGS_SUBSCRIPTION}
      options={{
        title: "Subscription"
      }}
    />
  </Stack.Navigator>
);

export default MyAccountScreens;
