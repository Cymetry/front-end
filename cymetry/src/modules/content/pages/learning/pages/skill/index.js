import React, { PureComponent } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";

import { createTabNavigationOptions } from '../../../../../../platform/services/navigation';
import Styles from "../../../../../../../assets/styles";
import LocalStyles from './styles';
  
const list = [
  {
    name: '1 Geometric Manipulatiom',
    avatar_url: '',
  },
  {
    name: '1 Algebraic Manipulation',
    avatar_url: '',
  },
  {
    name: '1 Cross Product',
    avatar_url: '',
  },
  {
    name: '1 Perpindicular Vectors',
    avatar_url: '',
  },
  {
    name: '1 Negative Product Property',
    avatar_url: '',
  },
];

class Skill extends PureComponent {

  static navigationOptions = createTabNavigationOptions('Skill', 'Skill', 'sunny');

  render() {

    return (
      <View style={Styles.page}>
        <View style={LocalStyles.container}>
          <View style={Styles.list.container}>
            {list.map(item => <ListItem
              key={item.name}
              title={item.name}
              containerStyle={LocalStyles.listItem}
              leftAvatar={{ uri: item.avatar_url }}
              roundAvatar
              chevron
            />)}
          </View>
        </View>
      </View>
    );
  }
};

export default Skill;