import React, { Component } from "react";
import { AsyncStorage, View } from "react-native";
import { StackActions } from "@react-navigation/native";

import Programs from "./components/programs";
import AuthReminder from "./components/auth-reminder";
import Intro from "./components/intro";
import { navigationWrapper } from "../../platform/services/navigation";
import ProgramController from "../../platform/api/program";
import Styles from "../../../assets/styles";
import ROUTES from "../../platform/constants/routes";
import { withNavigation } from "react-navigation";
import { checkAndTryToRestorePurchase } from "../../platform/services/payments";

class Home extends Component {
  state = {
    programs: [],
    loggedIn: true,
    skipped: false,
  };

  async componentDidMount() {
    // this.fetchPrograms();
    const loggedIn = !!(await AsyncStorage.getItem("token"));
    if (loggedIn) {
      navigationWrapper.navigation.dispatch(
        StackActions.replace(ROUTES.CONTENT, { loggedIn })
      );
    }
    this.setState({ loggedIn });
    checkAndTryToRestorePurchase();
  }

  // fetchPrograms = async () => {
  //   const result = await ProgramController.List();
  //   result && result.length && this.setState({ programs: result });
  // }

  skip = () => {
    navigationWrapper.navigation.dispatch(StackActions.replace(ROUTES.CONTENT));
  };

  render() {
    const { loggedIn } = this.state;

    return (
      <View style={Styles.page}>
        {!loggedIn ? <Intro skip={this.skip} /> : <AuthReminder />}
      </View>
    );
  }
}

export default withNavigation(Home);
