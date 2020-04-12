import React, { PureComponent } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import { ViewTypeEnum } from "./constants/enums";
import Styles from "../../../assets/styles";
import { withNavigation } from "react-navigation";
import { navigationWrapper } from "../../platform/services/navigation";

class Auth extends PureComponent {
  state = {
    viewType: null,
  };

  changeViewType = (viewType) => {
    this.setState({ viewType });
  };

  componentDidMount() {
    const isSignUpScreen = this.props.route.params?.signUp;
    console.log(isSignUpScreen);

    this.setState({
      viewType: isSignUpScreen ? ViewTypeEnum.SignUp : ViewTypeEnum.SignIn,
    });
  }

  render() {
    const { viewType } = this.state;
    const { navigation } = this.props;

    return (
      <KeyboardAwareScrollView style={Styles.page} enableOnAndroid>
        {viewType == ViewTypeEnum.SignIn ? (
          <SignIn
            signUpActive
            navigation={navigation}
            changeViewType={this.changeViewType}
          />
        ) : (
          <SignUp
            navigation={navigation}
            changeViewType={this.changeViewType}
          />
        )}
      </KeyboardAwareScrollView>
    );
  }
}

export default withNavigation(Auth);
