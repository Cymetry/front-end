import { AsyncStorage, Alert } from "react-native";

import * as InAppPurchases from "expo-in-app-purchases";
import { navigationWrapper } from "./navigation";
import { StackActions } from "@react-navigation/native";

const initializeInAppPurchases = async () => {
  const history = await InAppPurchases.connectAsync();
  return history;
};

const changeOrPurchase = async (newSubscription, oldSubscription) => {
  try {
    await InAppPurchases.purchaseItemAsync(newSubscription, oldSubscription);
  } catch (e) {
    console.warn(e)
  }
};

const getPurchaseHistory = async () => {
  const history = await InAppPurchases.getPurchaseHistoryAsync(false);
  if (history.responseCode === InAppPurchases.IAPResponseCode.OK) {
    return history;
  }
  return null;
};

const getLatestPurchase = async () => {
  const history = await getPurchaseHistory();
  if (history) {
    history.results.sort((a, b) => a.purchaseTime > b.purchaseTime)

    const purchase = history.results[history.results.length - 1]

    await AsyncStorage.setItem("subscriptionId", purchase.productId)
    await AsyncStorage.setItem("subscriptionDate", purchase.purchaseTime.toString())
    return purchase;
  }
  return null;
};

const checkAndTryToRestorePurchase = async () => {
  const _lastPurchase = await getLatestPurchase();
  if (_lastPurchase) {
    if (_lastPurchase.acknowledged) {
      await AsyncStorage.setItem("isPremium", "true");
      Alert.alert("Susbrciption has been restored")
      navigationWrapper.navigation.dispatch(
        StackActions.replace(ROUTES.CONTENT_SETTINGS_PAYMENT)
      );
    } else {
      try {
        await finishTransactionAsync(_lastPurchase);
        AsyncStorage.setItem("isPremium", "true");
        navigationWrapper.navigation.dispatch(
          StackActions.replace(ROUTES.CONTENT_SETTINGS_PAYMENT)
        );
        Alert.alert("Subscription has been restored and transaction has been finished")
      } catch (e) {
        AsyncStorage.setItem("isPremium", "false");
        Alert.alert("Something went wrong while restoring subscription")
      }
    }
  }
  return null;
};

export {
  initializeInAppPurchases,
  changeOrPurchase,
  getPurchaseHistory,
  getLatestPurchase,
  checkAndTryToRestorePurchase,
};
