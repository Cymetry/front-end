import React, { AsyncStorage } from "react-native";

import * as InAppPurchases from "expo-in-app-purchases";

const initializeInAppPurchases = async () => {
  console.log("initialazing ");
  await InAppPurchases.connectAsync();
  return null;
};

const changeOrPurchase = async (newSubscription, oldSubscription) => {
  await InAppPurchases.purchaseItemAsync(newSubscription, oldSubscription);
  console.log("getting called");
};

export { initializeInAppPurchases, changeOrPurchase };
