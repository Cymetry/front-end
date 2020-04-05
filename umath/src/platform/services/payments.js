import React from "react-native";

import * as InAppPurchases from "expo-in-app-purchases";

const initializeInAppPurchases = () => {
  InAppPurchases.connectAsync();
};

export { initializeInAppPurchases };
