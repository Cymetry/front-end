import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions, AsyncStorage } from "react-native";

import { Button } from "react-native-elements";
import { StackActions } from "@react-navigation/native";

import PaymentCard from "../../../../../../components/payment_card";

import styles from "./styles";
import { navigationWrapper } from "../../../../../../platform/services/navigation";
import ROUTES from "../../../../../../platform/constants/routes";

const SubscriptionScreen = () => {
  const window = Dimensions.get("window");

  const [activeItem, setActiveItem] = useState(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  /**
   * This data should contain the subscription id's and details
   */
  const data = [
    {
      title: "69.420",
      description: "this is the description of the item",
      id: "payment.something",
    },
    {
      title: "69.420",
      description: "this is the description of the item",
      id: "payment.another",
    },
    {
      title: "69.420",
      description: "this is the description of the item",
      id: "payment.bololoa",
    },
    {
      title: "69.420",
      description: "this is the description of the item",
      id: "payment.something_else",
    },
  ];

  const renderPaymentCards = () =>
    data.map((cardItem) => (
      <PaymentCard
        key={cardItem.id}
        title={cardItem.title}
        onPress={() => setActiveItem(cardItem.id)}
        isSelected={cardItem.id === activeItem}
        description={cardItem.description}
      />
    ));

  const _onContentSizeChange = (_, contentHeight) => {
    /**
     * Check if the contentHeight + the height of navigation items
     * is bigger than the height of the visible window
     * to enable scrolling when needed
     */
    const _shouldScroll = contentHeight + 30 > window.height;

    setShouldScroll(_shouldScroll);
  };

  const _onSubmitPress = async () => {
    try {
      await AsyncStorage.setItem("isPremium", "true");
      navigationWrapper.navigation.dispatch(
        StackActions.replace(ROUTES.CONTENT_SETTINGS_PAYMENT)
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView
      scrollEnabled={shouldScroll}
      onContentSizeChange={_onContentSizeChange}
      contentContainerStyle={styles.scrollview_wrapper}
    >
      <View style={styles.content_wrapper}>
        <Text style={styles.text}>
          {" "}
          Please select the right subscription plan for you{" "}
        </Text>
        <View style={styles.card_wrapper}>{renderPaymentCards()}</View>
        <Button
          onPress={_onSubmitPress}
          style={styles.button}
          title="Continue"
        />
      </View>
    </ScrollView>
  );
};

export default SubscriptionScreen;
