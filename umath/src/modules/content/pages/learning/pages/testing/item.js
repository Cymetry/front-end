import React, {createRef, useEffect} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MathJax from '../../../../../../components/math_jax';
import { parseLatex } from '../../../../../../platform/services/latex';
import Styles from '../../../../../../../assets/styles';
import LocalStyles from './styles';

let scrollView = null;
const numToLetter = ['a', 'b', 'c', 'd'];

const TestingItem = ({ question, selectedAnswer, setSelectedAnswer, onMessage, showAnswer }) => {
  if (!question) return null;

  const webView = createRef();

  const prepareGraphs = (latex) => {
    const splitted = latex.split("[()]");

    if (splitted.length > 1) {
      splitted.map((item, index) => {
        if (index === splitted.length - 1) {
          if (splitted[index]) splitted[index] = parseLatex(splitted[index]);
          return;
        }
        splitted[index] = `${parseLatex(splitted[index])} <img src="${
          question.graphs[index]
        }" style="width: 100%; height: 400px" alt="graph" />`;
      });
    } else return parseLatex(splitted[0]);

    return splitted.join("");
  };

  const showSolution = (solution) => {
    if (!showAnswer || !question.fillIn)
      return;
    webView.current.injectJavaScript(`
      (() => {
        const activeElement = document.getElementById('box-1');
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
                html={question.graphs.length
                  ? parseLatex(question.question)
                  : parseLatex(question.question)}
                webViewRef={webView}
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
                }">(${numToLetter[idx]}) ${parseLatex(option)}</span>`}
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