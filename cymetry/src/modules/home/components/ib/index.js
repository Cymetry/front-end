import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import LocalStyles from './styles';

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

const IB = () => (
  <View style={LocalStyles.container}>
    <Text style={LocalStyles.title}>
      International Baccalaureate (IB)
    </Text>
    <View style={LocalStyles.listContainer}>
      {list.map(item => <ListItem
        key={item.name}
        title={item.name}
        leftAvatar={{ uri: item.avatar_url }}
        roundAvatar
        topDivider
        chevron
      />)}
    </View>
  </View>
);

export default IB;