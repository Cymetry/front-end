import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';

import Program from './components/program';
import AuthReminder from './components/auth-reminder';
import { createNavigationOptions } from '../../platform/services/navigation';
import ProgramController from '../../platform/api/program';
import Constants from '../../platform/constants';
import Styles from '../../../assets/styles';

AsyncStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW4uYWRtaW5AdW1hdGguY29tIiwiaWF0IjoxNTc2NjEzODE1LCJleHAiOjE1NzY2MTc0MTV9.c_JQL8zCG1iOPh1Bx3UF_SYEIpZBBGIr3YeXIyGlndk');

class Home extends Component {

  state = {
    programs: [],
  };

  static navigationOptions = createNavigationOptions(Constants.ProjectTitle);

  componentDidMount() {
    this.fetchPrograms();  
  }

  fetchPrograms = async () => {
    const result = await ProgramController.List();
    result && result.length && this.setState({ programs: result.map(item => ({ ...item, curriculums: [{ id: 1, name: 'Maths HL' }] })) });
  }

  render() {
    const { programs } = this.state;

    return (
      <ScrollView style={Styles.page}>
        <AuthReminder />
        {programs.map(item => <Program key={item.id} data={item}/>)}
      </ScrollView>
    );
  }
};

export default Home;