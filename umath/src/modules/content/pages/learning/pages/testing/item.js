import React, {useState} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MathJax from '../../../../../../components/math_jax';
import { parseLatex } from '../../../../../../platform/services/latex';
import Styles from '../../../../../../../assets/styles';
import LocalStyles from './styles';

let scrollView = null;

const TestingItem = ({ question, selectedAnswer, setSelectedAnswer, onMessage }) => {
  if (!question) return null;

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      innerRef={(ref) => (scrollView = ref)}
      onPress={() => Keyboard.dismiss()}
      onContentSizeChange={(width, height) =>
        scrollView && scrollView.scrollTo({ y: height })
      }
    >
      <View style={LocalStyles.container}>
        <View style={LocalStyles.stepWrapper}>
          <Text style={LocalStyles.stepText}>Question</Text>
          <View style={LocalStyles.latexWrapper}>
            {
              <MathJax
                html={parseLatex(question.question)}
                onMessage={onMessage}
              />
            }
          </View>
        </View>
      </View>
      <>
        {
          question.options.map((option, idx) => (
            <TouchableHighlight
              key={`${idx}-${option}`}
              style={Styles.latexWrapper}
              onPress={() => setSelectedAnswer(idx)}
            >
              <MathJax
                html={`<span style="${
                  idx === selectedAnswer
                    ? `color: green`
                    : ""
                }">(${idx}) ${parseLatex(option)}</span>`}
                style={{ width: "100%" }}
              />
            </TouchableHighlight>
          ))
        }
      </>
    </KeyboardAwareScrollView>
  );
};

export default TestingItem;