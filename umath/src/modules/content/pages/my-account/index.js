import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { Bar } from 'react-native-progress';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { Button } from 'react-native-elements';

import { navigationWrapper } from '../../../../platform/services/navigation';
import AccountController from '../../../../platform/api/account';
import ROUTES from '../../../../platform/constants/routes';

import Styles from '../../../../../assets/styles';
import LocalStyles from './styles';
import Variables from '../../../../../assets/styles/variables';

class MyAccount extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'My Account',
    headerLeft: () => (
      <HeaderBackButton
        onPress={() => navigationWrapper.navigation.navigate(ROUTES.HOME)}
      />
    ),
  });

  state = { details: null, skills: [] };

  handleProgressClick = route => () =>
    navigationWrapper.navigation.navigate(route);

  BarItem = ({ percent }) => (
    <Bar
      color={Variables.lightBlue}
      unfilledColor={Variables.lightGray}
      width={120}
      height={10}
      progress={percent}
      borderRadius={0}
      borderWidth={0}
    />
  );

  async componentDidMount() {
    const result = await AccountController.Details();

    this.setState({
      details: result && result.user ? result.user : null,
      skills: [
        {
          rating: 9,
          title: 'Vector Skills',
          route: ROUTES.CONTENT_LEARNING,
        },
        {
          rating: 7,
          title: 'Polynomial Skills',
          route: ROUTES.CONTENT_LEARNING,
        },
      ],
    });
  }

  render() {
    const { details, skills } = this.state;

    return details ? (
      <View style={Styles.page}>
        <View style={Styles.card.classic}>
          <Image style={LocalStyles.profileImage} source={{}} />
          <Text style={LocalStyles.fullName}>
            {details.name} {details.surname}
          </Text>
          <View style={LocalStyles.progress}>
            {skills.map(skill => (
              <Button
                type="solid"
                key={skill.title}
                buttonStyle={LocalStyles.button}
                titleStyle={Styles.button.title}
                title={`${skill.title} ${skill.rating}`}
                onPress={this.handleProgressClick(skill.route)}
              />
            ))}
          </View>
          <View style={LocalStyles.divider} />
          <Text style={Styles.text.normalSize}>Progress:</Text>
          <View style={LocalStyles.progressItem}>
            <Text style={Styles.text.smallSize}>Learning: &nbsp;&nbsp;</Text>
            <this.BarItem percent={0.75} />
            <Text style={Styles.text.smallSize}>&nbsp;&nbsp; 75%</Text>
          </View>
          <View style={LocalStyles.progressItem}>
            <Text style={Styles.text.smallSize}>Revision: &nbsp;&nbsp;</Text>
            <this.BarItem percent={0.25} />
            <Text style={Styles.text.smallSize}>&nbsp;&nbsp; 25%</Text>
          </View>
        </View>
      </View>
    ) : null;
  }
}

const Stack = createStackNavigator();

const MyAccountScreens = () => (
  <Stack.Navigator
    headerLayoutPreset="center"
    screenOptions={() => Styles.navigation}
    initialRouteName={ROUTES.CONTENT_MY_ACCOUNT}
  >
    <Stack.Screen name={ROUTES.CONTENT_MY_ACCOUNT}>
      {props => <MyAccount {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default MyAccountScreens;
