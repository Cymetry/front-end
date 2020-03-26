import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Programs from './components/programs';
import AuthReminder from './components/auth-reminder';
import Intro from './components/intro';
import { navigationWrapper } from '../../platform/services/navigation';
import ProgramController from '../../platform/api/program';
import Styles from '../../../assets/styles';

class Home extends Component {

  state = {
    programs: [],
    loggedIn: true,
    skipped: false,
  };

  async componentDidMount() {
    this.fetchPrograms();
    this.setState({ loggedIn: !!(await AsyncStorage.getItem('token')) });
  }
  
  fetchPrograms = async () => {
    const result = await ProgramController.List();
    result && result.length && this.setState({ programs: result });
  }

  skip = () => {
    this.setState({ skipped: true })
  }

  render() {
    const { programs, loggedIn, skipped } = this.state;
    const { signedOut } = navigationWrapper.navigation.state?.params || {};

    return (
      <ScrollView style={Styles.page}>
        {(!loggedIn || signedOut) && (
          !skipped
          ? (
            <Intro skip={this.skip} />
          )
          : (
            <AuthReminder />
          )
        )}
        { skipped && 
          <Programs data={programs} />
        }
      </ScrollView>
    );
  }
};

export default Home;