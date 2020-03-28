import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from "react-native-elements";
import Accordion from 'react-native-collapsible/Accordion';

import { createNavigationOptions } from '../../../../../../platform/services/navigation';
import AccountController from '../../../../../../platform/api/account';
import LocalStyles from './styles';
import Styles from 'assets/styles';
import Variables from 'assets/styles/variables';

class FAQ extends PureComponent {

  static navigationOptions = createNavigationOptions('FAQ');

  state = {
    activeSections: [],
    data: [],
  };

  async componentDidMount() {
    const result = await AccountController.FAQ();
    result && result.length && this.setState({ data: result });
  }
 
  renderHeader = (section, _, isActive) => {
    return (
      <ListItem
        key={section.title}
        title={section.title}
        containerStyle={LocalStyles.accordionHeader}
        chevron={{
          color: Variables.darkGray,
          iconStyle: {
            transform: [{ rotate: isActive ? '90deg' : '0deg'}]
          }
        }}
      />
    );
    // <Text style={LocalStyles.accordionHeaderText}>{}</Text>
  };
 
  renderContent = section => {
    return (
      <View style={{...LocalStyles.accordionHeader, ...LocalStyles.accordionContentHeader}}>
        <Text style={LocalStyles.accordionHeaderText}>{section.content}</Text>
      </View>
    );
  };

  updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    const { data, activeSections } = this.state;

    return (
      <ScrollView style={Styles.page}>
        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
          <Accordion
            activeSections={activeSections}
            sections={data}
            underlayColor="transparent"
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
