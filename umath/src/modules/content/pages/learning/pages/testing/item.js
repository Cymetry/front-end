import React, {useState} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MathJax from '../../../../../../components/math_jax';
import { parseLatex } from '../../../../../../platform/services/latex';
import LocalStyles from './styles';

let scrollView = null;

const TestingItem = ({ question, selectedAnswer, setSelectedAnswer }) => {
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
              onPress={() => setSelectedAnswer(idx)}
            >
              <Text style={idx === selectedAnswer ? { color: 'red' } : {}}>{option}</Text>
            </TouchableHighlight>
          ))
        }
      </>
    </KeyboardAwareScrollView>
  );
};

export default TestingItem;