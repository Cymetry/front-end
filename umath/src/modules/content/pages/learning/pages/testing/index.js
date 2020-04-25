import React, { useEffect, useState } from 'react';
import { Text, View, Keyboard, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';

import LocalStyles from './styles';
import Styles from '../../../../../../../assets/styles';
import DismissKeyboard from '../../../../../../components/dismiss-keyboard';
import TestingController from '../../../../../../platform/api/skillTesting';
import TestingItem from './item';

const Testing = ({ route }) => {
  const { id } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const startTesting = async id => {
    const result = await TestingController.Start(id);
    setQuestions(result);
  };

  useEffect(() => {
    startTesting(id);
  }, [id]);

  return (
    <View stlye={Styles.page}>
      <DismissKeyboard>
        <>
          <TestingItem question={questions[currentQuestion]} />
          <View style={LocalStyles.buttonWrapper}>
            <View
              style={{
                ...LocalStyles.button,
                ...LocalStyles.lastButtons,
                ...Styles.button.disabled,
              }}
            >
              <Button
                titleStyle={LocalStyles.disabledButtonTitle}
                title="Next"
                type="clear"
              />
            </View>

            <View
              style={{ ...LocalStyles.button, ...LocalStyles.lastButtons }}
            >
              <Button
                titleStyle={LocalStyles.buttonTitle}
                title="Solution"
                type="clear"
              />
            </View>
          </View>
        </>
      </DismissKeyboard>
    </View>
  );
};

export default Testing;