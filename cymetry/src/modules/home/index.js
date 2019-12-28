import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';

import Programs from './components/programs';
import AuthReminder from './components/auth-reminder';
import { createNavigationOptions, navigationWrapper } from '../../platform/services/navigation';
import ProgramController from '../../platform/api/program';
import Constants from '../../platform/constants';
import Styles from '../../../assets/styles';

class Home extends Component {

  state = {
    programs: [],
    logined: true,
  };

  static navigationOptions = createNavigationOptions(Constants.ProjectTitle);

  async componentDidMount() {
    const { navigation } = this.props;
    navigationWrapper.navigation = navigation; 
    this.fetchPrograms();
    this.setState({ logined: !!(await AsyncStorage.getItem('token')) });
  }

  fetchPrograms = async () => {
    const result = await ProgramController.List();
    result && result.length && this.setState({ programs: result });
  }

  render() {
    const { programs, logined } = this.state;

    return (
      <ScrollView style={Styles.page}>
        {!logined && <AuthReminder />}
        <Programs data={programs} />
      </ScrollView>
    );
  }
};

export default withNavigation(Home);