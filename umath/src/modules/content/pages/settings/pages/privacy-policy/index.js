import React, { PureComponent } from 'react';
import { Text  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import LocalStyles from './styles';
import { createNavigationOptions } from '../../../../../../platform/services/navigation';

class PrivacyPolicy extends PureComponent {

  static navigationOptions = createNavigationOptions('Privacy Policy');
 
  render() {

    return (
      <ScrollView style={LocalStyles.page}>
        <Text style={LocalStyles.headingText}>Privacy Policy</Text>
        <Text style={LocalStyles.text}>
          Umath Ltd. operates the Math mobile application and the umath.io website, which
          provides the SERVICE.
          This policy (together with our terms of use and any other documents referred to on it) sets
          out the basis on which any personal data we collect from you, or that you provide to us,
          will be processed by us, including our Fair Processing Notice in compliance with the
          General Data Protection Regulations (GDPR). Please read the following carefully to
          understand our views and practices regarding your personal data and how we will treat it.
          The Personal Information that we collect are used for providing and improving the
          Service. We will not use or share your information with anyone except as described in this
          Privacy Policy.
          For the purpose of the Data Protection Act 1998 (the Act) and the GDPR, the data
          controller is Umath Ltd, Flat 5, 30 Campden Grove, London, England W8 4JQ.
        </Text>
        <Text style={LocalStyles.headingText}>Information Collection and Use</Text>
        <Text style={LocalStyles.text}>
          For a better experience while using our Service, we may require you to provide us with
          certain personally identifiable information, including but not limited to your name, phone
          number, and postal address. This includes information is provided by you at the time of
          registering to our Service.
          If you contact us, we may keep the record of that correspondence
        </Text>
        <Text style={LocalStyles.headingText}>Log Data</Text>
        <Text style={LocalStyles.text}>
          We want to inform you that whenever you visit our Service, we collect information that
          your browser sends to us that is called Log Data. This Log Data may include information
          such as your computer’s or mobile phones Internet Protocol (“IP”) address, browser
          version, pages of our Service that you visit, the time and date of your visit, the time spent
          on those pages, and other statistics.
        </Text>
        <Text style={LocalStyles.headingText}>Cookies</Text>
        <Text style={LocalStyles.text}>
          Cookies are files with small amount of data that is commonly used an anonymous unique
          identifier. These are sent to your browser from the website that you visit and are stored on
          your computer’s hard drive.
          We use these “cookies” to collect information and to improve our Service. You have the
          option to either accept or refuse these cookies, and know when a cookie is being sent to
          your computer. If you choose to refuse our cookies, you may not be able to use some
          portions of our Service.
        </Text>
        <Text style={LocalStyles.headingText}>Service Providers</Text>
        <Text style={LocalStyles.text}>
          We may employ third-party companies and individuals due to the following reasons:{'\n'}
          • To facilitate our Service;{'\n'}
          • To provide the Service on our behalf;{'\n'}
          • To perform Service-related services; or{'\n'}
          • To assist us in analyzing how our Service is used.{'\n'}
          We want to inform our Service users that these third parties have access to your Personal
          Information. The reason is to perform the tasks assigned to them on our behalf. However,
          they are obligated not to disclose or use the information for any other purpose.
        </Text>
        <Text style={LocalStyles.headingText}>Personal Data</Text>
        <Text style={LocalStyles.text}>
          The data that we collect from you may be transferred to, and stored at, a destination
          outside the UK. It may also be processed by staff operating outside the UK who work for
          us or for one of our suppliers. Such staff maybe engaged in, among other things, the
          fulfilment of your order, the processing of your payment details and the provision of
          support services. By submitting your personal data, you agree to this transfer, storing or
          processing outside the UK.
          We will take all steps reasonably necessary to ensure that your data is treated securely
          and in accordance with this privacy policy.
          All information you provide to us is stored on secure servers. Any payment transactions
          will be encrypted using SSL technology. Where we have given you (or where you have
          chosen) a password which enables you to access certain parts of our site, you are
          responsible for keeping this password confidential. We ask you not to share a password
          with anyone.
          Unfortunately, the transmission of information via the internet is not completely secure.
          Although we will do our best to protect your personal data, we cannot guarantee the
          security of your data transmitted to our site; any transmission is at your own risk. Once
          we have received your information, we will use strict procedures and security features to
          try to prevent unauthorised access.
        </Text>
        <Text style={LocalStyles.headingText}>Links to Other Sites</Text>
        <Text style={LocalStyles.text}>
          Our Service may contain links to other sites. If you click on a third-party link, you will be
          directed to that site. Note that these external sites are not operated by us. Therefore, we
          strongly advise you to review the Privacy Policy of these websites. We have no control
          over, and assume no responsibility for the content, privacy policies, or practices of any
          third-party sites or services.
        </Text>
        <Text style={LocalStyles.headingText}>Children’s Privacy</Text>
        <Text style={LocalStyles.text}>
          Our Services do not address anyone under the age of 13. We do not knowingly collect
          personal identifiable information from children under 13. In the case we discover that a
          child under 13 has provided us with personal information, we immediately delete this from
          our servers. If you are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact us so that we will be able to do
          necessary actions.
        </Text>
        <Text style={LocalStyles.headingText}>Your Rights</Text>
        <Text style={LocalStyles.text}>
          You have the right to ask us not to process your personal data for marketing purposes.
          You can exercise your right to prevent such processing by clicking on the unsubscribe
          link, which is displayed at the end of e-mail correspondence. You can also exercise the
          right at any time by contacting us at team@umath.io.
        </Text>
        <Text style={LocalStyles.headingText}>Changes to This Privacy Policy</Text>
        <Text style={LocalStyles.text}>
          We may update our Privacy Policy from time to time. Thus, we advise you to review this
          page periodically for any changes. We will notify you of any changes by posting the new
          Privacy Policy on this page. These changes are effective immediately, after they are
          posted on this page.
        </Text>
        <Text style={LocalStyles.headingText}>Contact Us</Text>
        <Text style={LocalStyles.text}>
          If you have any questions or suggestions about our Privacy Policy, do not hesitate to
          contact us.
        </Text>
      </ScrollView>
    );
  }
}

export default PrivacyPolicy;
