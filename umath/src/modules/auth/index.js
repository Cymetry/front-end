import React, { PureComponent } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HeaderBackButton } from 'react-navigation-stack';

import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import { ViewTypeEnum } from './constants/enums';
import { createNavigationOptions } from '../../platform/services/navigation';
import ROUTES from '../../platform/constants/routes';
import Styles from '../../../assets/styles';

class Auth extends PureComponent {

  static navigationOptions = ({ navigation }) => ({
    title: 'Welcome',
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate(ROUTES.HOME)} />,
  });

  state = {
    viewType: ViewTypeEnum.SignIn,
  };

  changeViewType = viewType => this.setState({ viewType });

  render() {
    const { viewType } = this.state;
    const { navigation } = this.props;
    const { signUp } = navigation.state.params;

    return (
      <KeyboardAwareScrollView style={Styles.page} enableOnAndroid>
        {viewType === ViewTypeEnum.SignIn
          ? <SignIn changeViewType={this.changeViewType} signUpActive={signUp} />
          : <SignUp changeViewType={this.changeViewType} />}
      </KeyboardAwareScrollView>
    );
  }
};

export default Auth;