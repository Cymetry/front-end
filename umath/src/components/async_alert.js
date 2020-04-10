import { Alert } from "react-native";
import { navigationWrapper } from "../platform/services/navigation";

const AsyncAlert = (title = "", message = "", actionItem) => {
  return new Promise((resolve, _) => {
    Alert.alert(
      title,
      message,
      actionItem
        ? [
            {
              text: actionItem.cancelText,
              onPress: () => resolve(false),
            },
            { text: actionItem.confirmText, onPress: () => resolve(true) },
          ]
        : { text: "Continue" },
      { cancelable: false }
    );
  });
};

export default AsyncAlert;
