import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Accordion from 'react-native-collapsible/Accordion';

import LocalStyles from './styles';
import Styles from '../../../../../../../assets/styles';

const SECTIONS = [
  {
    title: 'Something',
    content: 'Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum...',
  },
  {
    title: 'Something',
    content: 'Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum...',
  },
  {
    title: 'Something',
    content: 'Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum...',
  },
  {
    title: 'Something',
    content: 'Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum...',
  },
  {
    title: 'Something',
    content: 'Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum...',
  },
  {
    title: 'Something',
    content: 'Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum...',
  },
  {
    title: 'Something',
    content: 'Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum...',
  },
  {
    title: 'Something',
    content: 'Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum...',
  },
  {
    title: 'Something',
    content: 'Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum...',
  },
  {
    title: 'Something',
    content: 'Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum... Lorem ipsum...',
  },
];

class FAQ extends React.PureComponent {

  state = {
    activeSections: [],
  };
 
  renderHeader = section => {
    return (
      <View style={LocalStyles.accordionHeader}>
        <Text style={LocalStyles.accordionHeaderText}>{section.title}</Text>
      </View>
    );
  };
 
  renderContent = section => {
    return (
      <View style={LocalStyles.accordionHeader}>
        <Text style={LocalStyles.accordionHeaderText}>{section.content}</Text>
      </View>
    );
  };

  updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    const { activeSections } = this.state;

    return (
      <ScrollView style={Styles.page}>
        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
          <Accordion
            activeSections={activeSections}
            sections={SECTIONS}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            onChange={this.updateSections}
          />
        </View>
      </ScrollView>
    );
  }
}

export default FAQ;
