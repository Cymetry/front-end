import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import LocalStyles from './styles';
import Styles from '../../../../../assets/styles';
import ROUTES from '../../../../platform/constants/routes';

const Program = memo(({ data, navigation }) => (
  <View style={LocalStyles.container}>
    <Text style={LocalStyles.title}>
      {data.name}
    </Text>
    <View style={Styles.list.container}>
      {data.curriculums.map(item => <ListItem
        key={item.id}
        title={item.name}
        containerStyle={Styles.list.item}
        leftAvatar={{ uri: '' }}
        onPress={() => navigation.navigate(ROUTES.CONTENT, item)}
        roundAvatar
        chevron
      />)}
    </View>
  </View>
));

export default withNavigation(Program);