import React from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";

import Styles from "../../../../../../../assets/styles/index";
import Section from "../../../../../../components/section";
import ChangeSubscriptioniconIcon from "../../../../../../../assets/images/change_subscription_icon.png";
import CancelSubscriptionIcon from "../../../../../../../assets/images/cancel_subscription_icon.png";

import LocalStyles from "./styles";

const _itemData = [
  {
    id: 1,
    title: "Change Subscription Plan",
    iconUrl: ChangeSubscriptioniconIcon
  },
  {
    id: 2,
    title: "Cancel Subscription",
    iconUrl: CancelSubscriptionIcon
  }
];

const PaymentPage = () => (
  <>
    <Section style={LocalStyles.headerWrapper}>
      <Text style={LocalStyles.planTitle}> Subscription plan: </Text>
      <Text style={LocalStyles.infoText}> Auto-Renewed on: </Text>
    </Section>
    <Section style={LocalStyles.itemsWrapper} title={"Settings"}>
      {_itemData.map(item => (
        <ListItem
          key={item.id}
          leftAvatar={{ source: item.iconUrl, ...Styles.avatar }}
          containerStyle={LocalStyles.listItem}
          title={item.title}
          roundAvatar
        />
      ))}
    </Section>
  </>
);
export default PaymentPage;
