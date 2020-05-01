import { useState, useEffect } from "react";

import { AsyncStorage } from "react-native";
import * as InAppPurchases from "expo-in-app-purchases";

export const useToken = () => {
  const [token, setToken] = useState(null);

  const getToken = async () => {
    const _token = await AsyncStorage.getItem("token");
    setToken(!!_token);
  };

  useEffect(() => {
    getToken();
  });

  return token;
};

export const usePremium = () => {
  const [isPremium, setPremium] = useState(false);

  const getIsPremium = async () => {
    const _isPremium = await AsyncStorage.getItem("isPremium");
    setPremium(_isPremium === "true");
  };

  useEffect(() => {
    getIsPremium();
  }, [isPremium]);

  return isPremium;
};

export const useNavigationFocus = (navigation, callback) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      callback();
    });

    return unsubscribe;
  }, [navigation]);
};

export const useSubscriptionChangeListener = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    InAppPurchases.setPurchaseListener(
      ({ responseCode, results, errorCode }) => {
        // Purchase was successful
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
          results.forEach((purchase) => {
            if (!purchase.acknowledged) {
              console.log(`Successfully purchased ${purchase.productId}`);
              InAppPurchases.finishTransactionAsync(purchase, true);
              setStatus(InAppPurchases.IAPResponseCode.OK);
              AsyncStorage.setItem("isPremium", "true");
            }
          });
        }

        // Else find out what went wrong
        if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
          console.log("User canceled the transaction");
          setStatus(InAppPurchases.IAPResponseCode.USER_CANCELED);
        } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
          console.log(
            "User does not have permissions to buy but requested parental approval (iOS only)"
          );
          setStatus(InAppPurchases.IAPResponseCode.DEFERRED);
        }
      }
    );
  }, [status]);

  return status;
};
