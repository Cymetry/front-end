import React, { Component } from 'react';
import { View, WebView } from 'react-native';

const defaultOptions = {
	messageStyle: 'none',
	extensions: [ 'tex2jax.js' ],
	jax: [ 'input/TeX', 'output/HTML-CSS' ],
	tex2jax: {
		inlineMath: [ ['$','$'], ['\\(','\\)'] ],
		displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
		processEscapes: true,
	},
	TeX: {
		extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js']
	}
};

class MathJax extends Component {

	state = { height: 1 };

	handleMessage = message => {
		const { onMessage } = this.props;
		const { data } = message.nativeEvent;

		if (parseInt(data)) this.setState({ height: Number(data) });
		else onMessage && onMessage(data);
	}

	wrapMathjax(content) {
		const options = JSON.stringify(
			Object.assign({}, defaultOptions, this.props.mathJaxOptions)
		);

		return `
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
			<script type="text/x-mathjax-config">
				MathJax.Hub.Config(${options});

				MathJax.Hub.Queue(function() {
					var height = document.documentElement.scrollHeight;

					window.postMessage(String(height));
				});
			</script>

			<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>

			${content}
		`;
	}
	render() {
		const html = this.wrapMathjax(this.props.html);

		const props = Object.assign({}, this.props);
		delete props.html;
		delete props.onMessage;

		return (
      <View style={{ height: this.state.height, ...props.style }}>
        <WebView
          scrollEnabled={false}
          onMessage={this.handleMessage}
          source={{ html }}
          {...props}
        />
      </View>
		);
	}
}

export default MathJax;
