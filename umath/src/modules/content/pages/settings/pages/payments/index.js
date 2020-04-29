import React, { useState, useEffect } from "react";
import { Text, AsyncStorage } from "react-native";
import { ListItem } from "react-native-elements";
import { StackActions } from "@react-navigation/native";

import Styles from "../../../../../../../assets/styles/index";
import Section from "../../../../../../components/section";
import ChangeSubscriptioniconIcon from "../../../../../../../assets/images/change_subscription_icon.png";
import CancelSubscriptionIcon from "../../../../../../../assets/images/cancel_subscription_icon.png";

import LocalStyles from "./styles";
import ROUTES from "../../../../../../platform/constants/routes";

const PaymentPage = ({ navigation }) => {
  const [subscription, setSubscription] = useState(null);

  const _getSubscription = async () => {
    const _currentSubscription = AsyncStorage.getItem("subscriptionId");
    setSubscription(_currentSubscription);
    return null;
  };

  useEffect(() => {
    _getSubscription();
  }, []);
  const _itemData = [
    {
      id: 1,
      title: "Change Subscription Plan",
      iconUrl: ChangeSubscriptioniconIcon,
      onPress: () =>
        navigation.dispatch(
          StackActions.replace(ROUTES.CONTENT_SETTINGS_SUBSCRIPTION, {
            oldSubscription: subscription,
          })
        ),
    },
    {
      id: 2,
      title: "Cancel Subscription",
      iconUrl: CancelSubscriptionIcon,
    },
  ];

  return (
    <>
      <Section style={LocalStyles.headerWrapper}>
        <Text style={LocalStyles.planTitle}> Subscription plan: </Text>
        <Text style={LocalStyles.infoText}> Auto-Renewed on: </Text>
      </Section>
      <Section style={LocalStyles.itemsWrapper} title={"Settings"}>
        {_itemData.map((item) => (
          <ListItem
            key={item.id}
            leftAvatar={{ source: item.iconUrl, ...Styles.avatar }}
            containerStyle={LocalStyles.listItem}
            title={item.title}
            onPress={item.onPress}
            roundAvatar
          />
        ))}
      </Section>
    </>
  );
};
export default PaymentPage;
