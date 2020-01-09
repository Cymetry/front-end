import React, { PureComponent } from "react";
import { View, Text, Image } from 'react-native';
import { Bar } from 'react-native-progress';
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";

import { createTabNavigationOptions, createNavigationOptions } from '../../../../platform/services/navigation';
import AccountController from '../../../../platform/api/account';
import ROUTES from '../../../../platform/constants/routes';

import Styles from "../../../../../assets/styles";
import LocalStyles from "./styles";
import Variables from "../../../../../assets/styles/variables";

class MyAccount extends PureComponent {

  static navigationOptions = ({ navigation }) => ({
    title: 'My Account',
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate(ROUTES.HOME)} />
  });

  state = { details: null };

  BarItem = ({ percent }) => <Bar
    color={Variables.lightBlue}
    unfilledColor={Variables.lightGray}
    width={120}
    height={10}
    progress={percent}
    borderRadius={0}
    borderWidth={0}
  />;

  async componentDidMount() {
    const result = await AccountController.Details();
    this.setState({ details: result && result.user ? result.user : null });
  }

  render() {
    const { details } = this.state;

    return details ? (
      <View style={Styles.page}>
        <View style={Styles.card.classic}>
          <Image style={LocalStyles.profileImage} source={{}} />
          <Text style={LocalStyles.fullName}>{details.name} {details.surname}</Text>
          <Text style={Styles.text.smallSize}>Curriculum: IB Maths HL</Text>
          <View style={LocalStyles.progressItem}>
            <Text style={Styles.text.smallSize}>Learning: &nbsp;&nbsp;</Text>
            <this.BarItem percent={.75} />
            <Text style={Styles.text.smallSize}>&nbsp;&nbsp; 75%</Text>
          </View>
          <View style={LocalStyles.progressItem}>
            <Text style={Styles.text.smallSize}>Revision: &nbsp;&nbsp;</Text>
            <this.BarItem percent={.25} />
            <Text style={Styles.text.smallSize}>&nbsp;&nbsp; 25%</Text>
          </View>
        </View>   
      </View>
    ) : null;
  }
};

export default createStackNavigator({
  [ROUTES.CONTENT_MY_ACCOUNT]: MyAccount,
}, {
  headerLayoutPreset: 'center',
  defaultNavigationOptions: () =>  Styles.navigation,
  navigationOptions: createTabNavigationOptions('My Account', 'person'),
});;