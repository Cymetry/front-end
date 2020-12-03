import { useState, useEffect } from "react";

import { AsyncStorage } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";

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
