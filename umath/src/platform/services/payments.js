import React from "react-native";

import * as InAppPurchases from "expo-in-app-purchases";

const initializeInAppPurchases = () => {
  console.log("initialiazing");
  InAppPurchases.connectAsync();
};

export { initializeInAppPurchases };
