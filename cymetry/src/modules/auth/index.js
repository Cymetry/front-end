import React, { PureComponent } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import { ViewTypeEnum } from './constants/enums';
import { createNavigationOptions } from '../../platform/services/navigation';
import Styles from '../../../assets/styles';

class Auth extends PureComponent {

  static navigationOptions = createNavigationOptions('Welcome');

  state = {
    viewType: ViewTypeEnum.SignIn,
  };

  changeViewType = viewType => this.setState({ viewType });

  render() {
    const { viewType } = this.state;

    return (
      <KeyboardAwareScrollView style={Styles.page} enableOnAndroid>
        {viewType === ViewTypeEnum.SignIn
          ? <SignIn changeViewType={this.changeViewType} />
          : <SignUp changeViewType={this.changeViewType} />}
      </KeyboardAwareScrollView>
    );
  }
};

export default Auth;