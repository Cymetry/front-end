import React from "react";
import { Text, View, Keyboard } from "react-native";
import { Button } from "react-native-elements";

import LocalStyles from "./styles";
import Styles from "../../../../../../../assets/styles";
import DismissKeyboard from "../../../../../../components/dismiss-keyboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MathJax from "../../../../../../components/math_jax";
import { parseLatex } from "../../../../../../platform/services/latex";

import FeedBackPage from "./components/feedback/index";

const exampleLatex =
  "$\\text{Find} \\text{one} \\text{solution} \\text{using} \\text{trial} \\text{and} \\text{error}$:$\\text{A} \\text{solution} \\text{is} x=\\FormInput[2]{box-1}.                                                       $";
let scrollView = null;

const Testing = () => {
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

            <View style={{ ...LocalStyles.button, ...LocalStyles.lastButtons }}>
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
