import React, {createRef, useEffect} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MathJax from '../../../../../../components/math_jax';
import { parseLatex } from '../../../../../../platform/services/latex';
import Styles from '../../../../../../../assets/styles';
import LocalStyles from './styles';

let scrollView = null;

const TestingItem = ({ question, selectedAnswer, setSelectedAnswer, onMessage, showAnswer }) => {
  if (!question) return null;

  const webView = createRef();

  const showSolution = (solution) => {
    webView.current.injectJavaScript(`
      (() => {
        const activeElement = document.getElementById('box-1');
        alert(activeElement);
        activeElement.value = ${solution}
      })();
    `);
  };

  useEffect(() => {
    showSolution(question.answers[0]);
  }, [showAnswer]);

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
                webViewRef={webView}
                onMessage={onMessage}
              />
            }
          </View>
        </View>
      </View>
      {
        question.fillIn && showAnswer ? <Text>{question.answers[0]}</Text> : null
      }
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