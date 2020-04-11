import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { StackActions } from "@react-navigation/native";

import Programs from "./components/programs";
import AuthReminder from "./components/auth-reminder";
import Intro from "./components/intro";
import { navigationWrapper } from "../../platform/services/navigation";
import ProgramController from "../../platform/api/program";
import Styles from "../../../assets/styles";
import ROUTES from "../../platform/constants/routes";
import { withNavigation } from "react-navigation";

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
      <ScrollView style={Styles.page}>
        {!loggedIn ? <Intro skip={this.skip} /> : <AuthReminder />}
      </ScrollView>
    );
  }
}

export default withNavigation(Home);
