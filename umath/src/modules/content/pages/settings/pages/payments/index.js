import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";

import PaymentCard from "../../../../../../components/payment_card";

import styles from "./styles";

const PaymentScreen = () => {
  const [activeItem, setActiveItem] = useState(null);
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

  return (
    <View style={styles.content_wrapper}>
      <Text style={styles.text}>
        {" "}
        Please select the right subscription plan for you{" "}
      </Text>
      <View style={styles.card_wrapper}>{renderPaymentCards()}</View>
      <Button style={styles.button} title="Continue" />
    </View>
  );
};

export default PaymentScreen;
