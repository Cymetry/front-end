import React, { AsyncStorage } from "react-native";

import * as InAppPurchases from "expo-in-app-purchases";
import UserController from "../api/user";
import { navigationWrapper } from "./navigation";

const initializeInAppPurchases = async () => {
  const history = await InAppPurchases.connectAsync();
  return history;
};

const changeOrPurchase = async (newSubscription, oldSubscription) => {
  try {
    await InAppPurchases.purchaseItemAsync(newSubscription, oldSubscription);
    await UserController.Edit({ "isPremium": true })
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
      await AsyncStorage.setItem("subscriptionDate", `${_lastPurchase.purchaseTime}`);
    } else {
      try {
        await finishTransactionAsync(_lastPurchase);
        AsyncStorage.setItem("isPremium", "true");
      } catch (e) {
        AsyncStorage.setItem("isPremium", "false");
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
