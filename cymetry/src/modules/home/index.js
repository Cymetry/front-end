import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import IB from './components/ib';
import AuthReminder from './components/auth-reminder';
import { createNavigationOptions } from '../../platform/services/navigation';

import Constants from '../../platform/constants';
import Styles from '../../../assets/styles';

class Home extends PureComponent {

  static navigationOptions = createNavigationOptions(Constants.ProjectTitle);

  render() {

    return (
      <ScrollView style={Styles.page}>
        <AuthReminder />
        <IB />
      </ScrollView>
    );
  }
};

export default Home;