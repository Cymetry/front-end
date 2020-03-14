import React, { PureComponent } from 'react';
import { Text  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import LocalStyles from './styles';
import { createNavigationOptions } from '../../../../../../platform/services/navigation';

class TermsAndConditions extends PureComponent {

  static navigationOptions = createNavigationOptions('Terms & Conditions');

  render() {

    return (
      <ScrollView style={LocalStyles.page}>
        <Text style={LocalStyles.headingText}>Terms & Conditions</Text>
        <Text style={LocalStyles.text}>
          This application & website (umath.io | umath.app) is operated by Umath LTD, operated
          under the name “Umath” ( "we", "us", "our"). We offer you the service of Umath on the
          condition that you agree to the following terms:
        </Text>
        <Text style={LocalStyles.headingText}>Intellectual Property Rights</Text>
        <Text style={LocalStyles.text}>
          The material contained on the web site is protected by copyright. You may use the
          application & website for personal and noncommercial purposes only. You acknowledge
          that the Umath application & website, special technology used in connection with the
          website & application, Umath’s services, all software, material, information,
          communications, text, graphics, links, electronic art, animations, audio, video, photos,
          and other data available within the application & website (“Umath content") are provided
          by Umath or third party providers and are the copyrighted works of Umath and/or such
          third parties. You may not copy, reproduce, publish, distribute, modify, create derivative
          works of, rent, lease, sell, transfer, display, transmit, compile or collect in a database, or in
          any manner commercially exploit any part of the Umath content or our services in whole
          or in part unless expressly authorised by Umath or the relevant third party owner.
          You may not store any significant portion of any Umath content or Umath services or
          materials in any form. You acknowledge that Umath and/or third party providers remain
          the owners of the Umath content and that you do not acquire any intellectual property
          rights in the Umath content. All material on the Umath application & website has been
          developed by Umath. Umath has been developed independently from the International
          Baccalaureate and A-level Organisation, and these Organisations do not endorse the
          website. Information Does Not Represent Professional Advice The material provided on
          the website is provided as general information only. It is not intended as professional
          advice and must not be relied upon as such. Prior to entering into a transaction or taking
          any particular course of action in connection with the application & website, you should
          make your own enquiries and seek independent advice tailored to your specific
          circumstances and Umath Ltd (“Umath”) Terms & Conditions objectives.
        </Text>
        <Text style={LocalStyles.headingText}>Accuracy and Usefulness of Information</Text>
        <Text style={LocalStyles.text}>
          All material and information on the application & website is provided in good faith and is
          believed to be accurate and current as at the date of publication. However, Umath
          provides no warranty or guarantee that any material or information on the application &
          website or linked applications & websites will be accurate or complete. Umath will not be
          liable for any damages whatsoever whether in an action in contract, negligence or other
          tort, arising out of or in connection with access to the website or the information and
          material contained in it. All warranties of any kind are excluded to the maximum extent
          permitted by law. Umath makes no guarantee as to the usefulness of the material and
          information on the application & website, nor any of the products and services promoted
          on it or via linked websites. In particular, Umath makes no guarantee as to the
          appropriateness of the courses selected by you and no guarantee as to the likelihood of
          results which may be gained by virtue of any training undertaken.
        </Text>
        <Text style={LocalStyles.headingText}>Accounts</Text>
        <Text style={LocalStyles.text}>
          When you create an account with us, you must provide us information that is accurate,
          complete, and current at all times. Failure to do so constitutes a breach of the Terms,
          which may result in immediate termination of your account on our Service.
          You are responsible for safeguarding the password that you use to access the Service
          and for any activities or actions under your password, whether your password is with our
          Service or a third-party service.
          You agree not to disclose your password to any third party. You must notify us
          immediately upon becoming aware of any breach of security or unauthorized use of your
          account.
        </Text>
        <Text style={LocalStyles.headingText}>Access</Text>
        <Text style={LocalStyles.text}>
          You agree and understand that Umath may prevent or restrict your access to the
          application & website for any technical, security and or any other reasons at its absolute
          discretion. Umath will advise you as soon as practicable of any restrictions imposed on
          your access to the application & website.
        </Text>
        <Text style={LocalStyles.headingText}>Limitation Of Liability</Text>
        <Text style={LocalStyles.text}>
          In no event shall Umath Ltd., nor its directors, employees, partners, agents, suppliers, or
          affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
          resulting from (i) your access to or use of or inability to access or use the Service; (ii) any
          conduct or content of any third party on the Service; (iii) any content obtained from the
          Service; and (iv) unauthorized access, use or alteration of your transmissions or content,
          whether based on warranty, contract, tort (including negligence) or any other legal theory,
          whether or not we have been informed of the possibility of such damage, and even if a
          remedy set forth herein is found to have failed of its essential purpose.
        </Text>
        <Text style={LocalStyles.headingText}>Variation of These Terms</Text>
        <Text style={LocalStyles.text}>
          Umath may vary these Terms at any time. In the event that Umath varies these Terms, it
          will provide notice by publishing the varied Terms on the application & website. You
          accept that by doing this, Umath has provided you with sufficient notice of the variation.
        </Text>
        <Text style={LocalStyles.headingText}>No Guarantees as to the Service</Text>
        <Text style={LocalStyles.text}>
          The website & application may contain downloadable materials and links to external
          websites. Umath is not responsible for, and has no control over, the content of
          downloadable materials or external sites. You understand that Umath cannot and does
          not guarantee, warrant or represent that files or software of any kind, or from any source,
          available for downloading through the application & website, will be free of infection or
          viruses, worms, Trojan horses or other code or defects that manifest contaminating or
          destructive properties.
        </Text>
        <Text style={LocalStyles.headingText}>Purchases</Text>
        <Text style={LocalStyles.text}>
          If you wish to purchase any product or service made available through the Service
          ("Purchase"), you may be asked to supply certain information relevant to your Purchase
          including, without limitation, your credit card number, the expiration date of your credit
          card, your billing address, and your shipping information.
          You represent and warrant that: (i) you have the legal right to use any credit card(s) or
          other payment method(s) in connection with any Purchase; and that (ii) the information
          you supply to us is true, correct and complete.
          By submitting such information, you grant us the right to provide the information to third
          parties for purposes of facilitating the completion of Purchases.
          Service Provider will send an electronic invoice to the e-mail address provided by the
          Client after processing the order and completing the payment. Upon acceptance of the
          General Terms and Conditions, Customer agrees to the Service Provider providing an
          electronic invoice to the Customer. The withdrawal of this consent is possible by means
          of a clear legal statement addressed to the Service Provider - in the form of an email.
          In case of Services to be provided on a monthly basis, the Service Provider charges the
          Customer's credit card on the first workday every month started and sends the
          corresponding invoice to the Customer's email address.
          The Service Provider considers the Service fee to be paid the day on which the service
          fee is received by the Service Provider's account.
        </Text>
        <Text style={LocalStyles.headingText}>Links to Third Party Websites</Text>
        <Text style={LocalStyles.text}>
          The application & website may contain links and pointers to other websites operated by
          third parties. Third party links and pointers are included solely for your convenience. Links
          to third party websites do not constitute endorsement, sponsorship or approval by Umath
          of the content, policies or practices of those third party websites. You agree that by
          accessing any third party linked website you do so at entirely at your own risk. Umath will
          not be responsible or liable, directly or indirectly, for any damage or loss caused or
          alleged to be caused by or in connection with, use or reliance on any goods or services
          available on or through any third party website.
        </Text>
        <Text style={LocalStyles.headingText}>Security</Text>
        <Text style={LocalStyles.text}>
          When using the World Wide Web, the Internet or third party networks or facilities, you are
          using networks, facilities and services that are beyond the control of Umath. You assume
          all risk and liability of your use of the World Wide Web, the Internet or any such third party
          networks, including any access to the application & website via such media.
        </Text>
        <Text style={LocalStyles.headingText}>Severability</Text>
        <Text style={LocalStyles.text}>
          If any part of these Terms is held invalid, illegal or unenforceable, that part shall be
          severed and the remainder will continue to be valid and enforceable.
        </Text>
        <Text style={LocalStyles.headingText}>General</Text>
        <Text style={LocalStyles.text}>
          The use of the application & website is governed by, construed and enforced in
          accordance with the laws of United Kingdom (UK) and you irrevocably submit to the
          nonexclusive jurisdiction of the courts of United Kingdom and their respective courts of
          appeal in that regard.
        </Text>
        <Text style={LocalStyles.headingText}>Reservation of Rights</Text>
        <Text style={LocalStyles.text}>
          Any rights not expressly granted to you herein are reserved by Umath. For the purposes
          of this agreement the words "Umath", "We", "Our" and "Us" refer to Umath Ltd and ,
          “application” and "website" to materials delivered Umath application available on Apple
          and Android application stores, and on www.umath.io and other co branded versions of
          the site.
        </Text>
        <Text style={LocalStyles.headingText}>Contact Us</Text>
        <Text style={LocalStyles.text}>
          If you have any questions about these Terms, please contact us.
        </Text>
      </ScrollView>
    );
  }
}

export default TermsAndConditions;
