import React, { Component } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const wrapKeyboard = ({content}) => (
    `
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.9.1/mathquill.min.js"></script>
    <script>
    $(function() {

        var MQ = MathQuill.getInterface(2);
        var mathquill = MQ.MathField(document.getElementById('mathquill'));
      
        var specialKeys = {
            right: "Right",
            left: "Left",
            Down: "Down",
            Up: "Up",
            bksp: "Backspace",
            tab: "Tab"
        }
      
        // add special keys, but don't override previous keyaction definitions
        Object.keys(specialKeys).forEach(function(key){
            if (!$.keyboard.keyaction[key]) {
              $.keyboard.keyaction[key] = specialKeys[key];
          }
        });
      
          $('#mathquill').click(function(){
            $('#keyboard').getkeyboard().reveal();
        })
      
        $('#keyboard')
          .on('keyboardChange', function(e, keyboard, el) {
            console.log(e.action);
            if (specialKeys[e.action]) {
                mathquill.keystroke(specialKeys[e.action]);
            } else {
                mathquill.cmd(e.action);      
            }
            // $('#mathquill').focus();      
          })
          .keyboard({
            usePreview: false,
            lockInput: true,
            noFocus: true,
            layout: 'custom',
            display: {
                "Down": "&darr;",
              "Up": "&uarr;"
            },
            customLayout: {
              'default': [
                'sin cos tan \u03c0 {b}',
                '7 8 9 + -',
                '4 5 6 * frac',
                '1 2 3 ^ {Up} sqrt',
                '0 . , {left} {Down} {right}',
                '< > = {clear} {a}'
              ]
            },
            useCombos: false
          })
          // activate the typing extension
          .addTyping({
            showTyping: true,
            delay: 250
          });
      
      });
    </script>
    ${content}
    `
)  

const content = `
    <div className="wrap">
        <textarea className="keyboard"></textarea>
        <br></br>
        <div className="mathquill"></div>
    </div>
`

const Keyboard = () => {
    const html = wrapKeyboard(content);
    
    return (
        <View style={{ height: this.state.height, ...props.style }}>
            <WebView
                originWhitelist={["*"]}
                scrollEnabled={true}
                // onMessage={this.handleMessage}
                useWebKit={true}
                javaScriptEnabled={true}
                source={{ html, baseUrl: "" }}
                // ref={this.props.webViewRef}
                // {...props}
            />
        </View>
    )
};

export default Keyboard
