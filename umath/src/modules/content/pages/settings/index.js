import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { withNavigation } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

import FaqIcon from "../../../../../assets/images/faq_icon.png";
import HelpAndFeedbackIcon from "../../../../../assets/images/help_and_feedback_icon.png";
import TermsAndConditionsIcon from "../../../../../assets/images/terms_and_conditions_icon.png";
import PrivacyPolicyIcon from "../../../../../assets/images/privacy_policy_icon.png";
import SubscriptionIcon from "../../../../../assets/images/subscription_icon.png";
import SignOutIcon from "../../../../../assets/images/sign_out_icon.png";

import { useToken, useNavigationFocus } from "../../../../utils/hooks_util";

import {
  createTabNavigationOptions,
  navigationWrapper,
} from "../../../../platform/services/navigation";
import Constants from "./../../../../platform/constants";
import ROUTES from "./../../../../platform/constants/routes";
import Styles from "../../../../../assets/styles";

import LocalStyles from "./styles";
import HelpAndFeedback from "./pages/help-and-feedback";
import FAQ from "./pages/faq";
import TermsAndConditions from "./pages/terms-and-conditions";
import PrivacyPolicy from "./pages/privacy-policy";
import SubscriptionPage from "./pages/subscription";
import PaymentPage from "./pages/payments";

const Stack = createStackNavigator();

const Settings = ({ navigation }) => {
  const token = useToken();
  const [isPremium, setPremium] = useState(false);

  const getPremium = async () => {
    const _isPremium = await AsyncStorage.getItem("isPremium");
    setPremium(_isPremium === "true");
    return null;
  };

  useNavigationFocus(navigation, getPremium);

  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "isPremium"]);
      navigation.navigate(ROUTES.HOME);
    } catch (e) {
      console.warn(e);
    }
  };

  const onSignOutPress = () => {
    Alert.alert("Are you sure you want to sign out?", "", [
      {
        text: "Confirm",
        onPress: signOut,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const list = [
    {
      name: "FAQ",
      url: ROUTES.CONTENT_SETTINGS_FAQ,
      avatar_source: FaqIcon,
    },
    {
      name: "Help & Feedback",
      url: ROUTES.CONTENT_SETTINGS_HELP,
      avatar_source: HelpAndFeedbackIcon,
    },
    {
      name: "Terms & Conditions",
      url: ROUTES.CONTENT_SETTINGS_TERMS,
      avatar_source: TermsAndConditionsIcon,
    },
    {
      name: "Privacy Policy",
      url: ROUTES.CONTENT_SETTINGS_PRIVACY,
      avatar_source: PrivacyPolicyIcon,
    },
    {
      name: "Subscription",
      onPress: () =>
        token
          ? navigation.navigate(
              isPremium
                ? ROUTES.CONTENT_SETTINGS_PAYMENT
                : ROUTES.CONTENT_SETTINGS_SUBSCRIPTION
            )
          : Alert.alert("Please sign in to be able to subscribe", "", [
              {
                text: "Sign in",
                onPress: () =>
                  navigationWrapper.navigation.navigate(ROUTES.AUTH),
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]),
      avatar_source: SubscriptionIcon,
    },
    ...(token
      ? [
          {
            name: "Sign out",
            onPress: onSignOutPress,
            avatar_source: SignOutIcon,
          },
        ]
      : []),
  ];

  return (
    <ScrollView style={Styles.page}>
      <View style={LocalStyles.container}>
        <View style={Styles.list.container}>
          {list.map((item) => (
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
        <Text style={LocalStyles.nameText}>{Constants.ProjectTitle} v1.0</Text>
        <Text style={LocalStyles.descriptionText}>
          By Signing in, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </ScrollView>
  );
};

const MyAccountScreens = ({ route }) => (
  <Stack.Navigator
    headerLayoutPreset="center"
    screenOptions={() => Styles.navigation}
    initialRouteName={route.params?.initialRouteName || ROUTES.CONTENT_SETTINGS}
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
      options={{ title: "Feedback" }}
      component={HelpAndFeedback}
      name={ROUTES.CONTENT_SETTINGS_HELP}
    />
    <Stack.Screen
      options={{ title: "Terms and Conditions" }}
      component={TermsAndConditions}
      name={ROUTES.CONTENT_SETTINGS_TERMS}
    />
    <Stack.Screen
      options={{ title: "Privacy Policy" }}
      component={PrivacyPolicy}
      name={ROUTES.CONTENT_SETTINGS_PRIVACY}
    />
    <Stack.Screen
      component={SubscriptionPage}
      name={ROUTES.CONTENT_SETTINGS_SUBSCRIPTION}
      options={{
        title: "Subscription",
      }}
    />
    <Stack.Screen
      component={PaymentPage}
      name={ROUTES.CONTENT_SETTINGS_PAYMENT}
      options={{
        title: "Payment",
      }}
    />
  </Stack.Navigator>
);

export default MyAccountScreens;
