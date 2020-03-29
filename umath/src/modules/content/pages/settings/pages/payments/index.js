import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-elements";

import PaymentCard from "../../../../../../components/payment_card";

import styles from "./styles";

const PaymentScreen = () => {
  const window = Dimensions.get("window");

  const [activeItem, setActiveItem] = useState(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  /**
   * This data should contain to the subscription id's and details
   */
  const data = [
    {
      title: "69.420",
      description: "this is the description of the item",
      id: "payment.something"
    },
    {
      title: "69.420",
      description: "this is the description of the item",
      id: "payment.another"
    },
    {
      title: "69.420",
      description: "this is the description of the item",
      id: "payment.bololoa"
    },
    {
      title: "69.420",
      description: "this is the description of the item",
      id: "payment.something_else"
    }
  ];

  const renderPaymentCards = () =>
    data.map(cardItem => (
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
     *  is bigger than the height of the visible window
     * to enable scrolling when needed
     */
    const _shouldScroll = contentHeight + 30 > window.height;

    setShouldScroll(_shouldScroll);
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
        <Button style={styles.button} title="Continue" />
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;
