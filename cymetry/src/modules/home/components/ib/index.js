import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import LocalStyles from './styles';
import Styles from '../../../../../assets/styles';
import ROUTES from '../../../../platform/constants/routes';

const list = [
  {
    name: 'Maths HL',
    avatar_url: '',
  },
  {
    name: 'Maths SL',
    avatar_url: '',
  },
  {
    name: 'Maths Studies',
    avatar_url: '',
  },
  {
    name: 'Further Maths',
    avatar_url: '',
  },
];

const IB = memo(({ navigation }) => (
  <View style={LocalStyles.container}>
    <Text style={LocalStyles.title}>
      International Baccalaureate (IB)
    </Text>
    <View style={Styles.list.container}>
      {list.map(item => <ListItem
        key={item.name}
        title={item.name}
        containerStyle={Styles.list.item}
        leftAvatar={{ uri: item.avatar_url }}
        onPress={() => navigation.navigate(ROUTES.CONTENT, { name: item.name })}
        roundAvatar
        chevron
      />)}
    </View>
  </View>
));

export default withNavigation(IB);