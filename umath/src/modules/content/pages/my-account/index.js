import React, { PureComponent } from "react";
import { View, Text, Image } from 'react-native';
import { Bar } from 'react-native-progress';

import { createTabNavigationOptions } from '../../../../platform/services/navigation';

import Styles from "../../../../../assets/styles";
import LocalStyles from "./styles";
import Variables from "../../../../../assets/styles/variables";

class MyAccount extends PureComponent {

  static navigationOptions = createTabNavigationOptions('My Account', 'My Account', 'person');

  BarItem = ({ percent }) => <Bar
    color={Variables.lightBlue}
    unfilledColor={Variables.lightGray}
    width={120}
    height={10}
    progress={percent}
    borderRadius={0}
    borderWidth={0}
  />;

  render() {

    return (
      <View style={Styles.page}>
        <View style={Styles.card.classic}>
          <Image style={LocalStyles.profileImage} source={{}} />
          <Text style={LocalStyles.fullName}>Name Surname</Text>
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
    );
  }
};

export default MyAccount;