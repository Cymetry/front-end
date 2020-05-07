import React, { useState, useEffect, useCallback } from "react";
import { Text, AsyncStorage, Linking } from "react-native";
import { ListItem } from "react-native-elements";
import { StackActions } from "@react-navigation/native";

import Styles from "../../../../../../../assets/styles/index";
import Section from "../../../../../../components/section";
import ChangeSubscriptioniconIcon from "../../../../../../../assets/images/change_subscription_icon.png";
import CancelSubscriptionIcon from "../../../../../../../assets/images/cancel_subscription_icon.png";

import LocalStyles from "./styles";
import ROUTES from "../../../../../../platform/constants/routes";
import { getLatestPurchase } from "../../../../../../platform/services/payments";

getDescription = (subscriptionId) => {
  switch (subscriptionId) {
    case 'umathapp01':
      return "Basic"
    case 'umathapp02':
      return "Regular"
    case 'umathapp03':
      return "Gold"
    case 'umathapp04':
      return "Premium"
  }
}

getRenewTime = (subscriptionId, date) => {
  switch (subscriptionId) {
    case 'umathapp01':
      return new Date(date.setMonth(date.getMonth() + 3))
    case 'umathapp02':
      return new Date(date.setMonth(date.getMonth() + 3))
    case 'umathapp03':
      return new Date(date.setMonth(date.getMonth() + 6))
    case 'umathapp04':
      return new Date(date.setMonthq(date.getMonth() + 12))
  }
}

const PaymentPage = ({ navigation }) => {
  const [subscription, setSubscription] = useState(null);
  const [description, setDescription] = useState("");
  const [renewDate, setRenewDate] = useState(new Date());

  const _getSubscription = async () => {
    const latestPurchase = await AsyncStorage.getItem("subscriptionId");
    const subscriptionDate = await AsyncStorage.getItem("subscriptionDate")

    const description = getDescription(latestPurchase)
    const convertSubDate = getRenewTime(latestPurchase, new Date(parseInt(subscriptionDate)))

    // Couldn't get description and renewtime from app store
    // had to implement this hack

    setDescription(description)
    setRenewDate(convertSubDate)
    setSubscription(latestPurchase)

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
            oldSubscription: subscription ?? "",
          })
        ),
    },
    {
      id: 2,
      title: "Cancel Subscription",
      iconUrl: CancelSubscriptionIcon,
      onPress: () => Linking.openURL("https://apps.apple.com/account/subscriptions")
    },
  ];

  return (
    <>
      <Section style={LocalStyles.headerWrapper}>
        <Text style={LocalStyles.planTitle}> Subscription plan: {description} </Text>
        <Text style={LocalStyles.infoText}> Auto-Renewed on: {renewDate?.toDateString()} </Text>
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
