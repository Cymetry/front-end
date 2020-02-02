import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import LocalStyles from './styles';
import Styles from '../../../../../assets/styles';
import ROUTES from '../../../../platform/constants/routes';

const Programs = memo(({ data, navigation }) => (
  <View style={LocalStyles.container}>
    <Text style={LocalStyles.title}>
      Programs
    </Text>
    <View style={Styles.list.container}>
      {data.map(item => <ListItem
        key={item.id}
        title={item.name}
        containerStyle={Styles.list.item}
        leftAvatar={{ source: { uri: item.logo }, ...Styles.avatar }}
        onPress={() => navigation.navigate(ROUTES.CONTENT_LEARNING, item)}
        roundAvatar
        chevron
      />)}
    </View>
  </View>
));

export default withNavigation(Programs);