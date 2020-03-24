import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Programs from './components/programs';
import AuthReminder from './components/auth-reminder';
import { navigationWrapper } from '../../platform/services/navigation';
import ProgramController from '../../platform/api/program';
import Styles from '../../../assets/styles';

class Home extends Component {

  state = {
    programs: [],
    logined: true,
  };

  async componentDidMount() {
    this.fetchPrograms();
    this.setState({ logined: !!(await AsyncStorage.getItem('token')) });
  }
  
  fetchPrograms = async () => {
    const result = await ProgramController.List();
    result && result.length && this.setState({ programs: result });
  }

  render() {
    const { programs, logined } = this.state;
    const { signOuted } = navigationWrapper.navigation.state?.params || {};

    return (
      <ScrollView style={Styles.page}>
        {(!logined || signOuted) && <AuthReminder />}
        <Programs data={programs} />
      </ScrollView>
    );
  }
};

export default Home;