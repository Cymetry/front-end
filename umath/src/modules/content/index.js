import React from "react";
import { Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Learning from "./pages/learning";
import Settings from "./pages/settings";
import MyAccount from "./pages/my-account";
import ROUTES from "../../platform/constants/routes";
import {
  createTabNavigationOptions,
  navigationWrapper
} from "../../platform/services/navigation";

const Tab = createBottomTabNavigator();

const ContentScreens = ({ route }) => {
  const { id, loggedIn } = route.params;

  const myAccountTabPressListener = {
    tabPress: event => {
      if (!loggedIn) {
        Alert.alert("Please sign in to see your account", "", [
          {
            text: "Sign in",
            onPress: () => navigationWrapper.navigation.navigate(ROUTES.AUTH)
          },
          {
            text: "Cancel",
            style: "cancel"
          }
        ]);
        event.preventDefault();
      }
      return null;
    }
  };

  return (
    <Tab.Navigator
      initialRouteName={
        loggedIn ? ROUTES.CONTENT_MY_ACCOUNT : ROUTES.CONTENT_LEARNING
      }
    >
      <Tab.Screen
        name={ROUTES.CONTENT_LEARNING}
        options={createTabNavigationOptions("Learning", "sunny")}
      >
        {props => <Learning {...props} id={id} />}
      </Tab.Screen>
      <Tab.Screen
        listeners={myAccountTabPressListener}
        name={ROUTES.CONTENT_MY_ACCOUNT}
        component={MyAccount}
        options={createTabNavigationOptions("My Account", "person")}
      />
      <Tab.Screen
        name={ROUTES.CONTENT_SETTINGS}
        component={Settings}
        options={createTabNavigationOptions("Settings", "settings")}
      />
    </Tab.Navigator>
  );
};

export default withNavigation(ContentScreens);
