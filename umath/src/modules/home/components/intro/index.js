import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

import Variables from '../../../../../assets/styles/variables';
import ROUTES from '../../../../platform/constants/routes';
import Styles from '../../../../../assets/styles';
import { navigationWrapper } from '../../../../platform/services/navigation';
import LocalStyles from './styles';

const Intro = ({ skip }) => (
  <View style={LocalStyles.container}>
    <View>
        <Text style={{ ...Styles.text.center, ...Styles.text.title }}>
        Welcome to Umath!
        </Text>
        <Text style={LocalStyles.subTitle}>
            Start with signing up or signing in
        </Text>
    </View>
    <Image 
        source={require('assets/images/intro.png')}
        style={LocalStyles.image}
    />
    <View>
        <View style={LocalStyles.button}>
            <Button
                titleStyle={Styles.button.title}
                title="Sign in"
                type="clear"
                onPress={() => navigationWrapper.navigation.navigate(ROUTES.AUTH, { signUp: false, lastPath: ROUTES.HOME })} 
            />
        </View>
        <View style={LocalStyles.button}>
            <Button
                titleStyle={Styles.button.title}
                title="Sign up"
                type="clear"
                onPress={() => navigationWrapper.navigation.navigate(ROUTES.AUTH, { signUp: true, lastPath: ROUTES.HOME })} 
            />
        </View>
        <Button
            type="clear"
            onPress={skip} 
            title="Skip for now"
            color={Variables.textGray}
            style={LocalStyles.skipButton}
        />
    </View>
  </View>
);

export default Intro;