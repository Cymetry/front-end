import React from "react";
import { View, Text, Image } from "react-native";

const NoConnection = () => (
    <View style={LocalStyles.container}>
      <Image 
          source={require('assets/images/404-error.png')}
        //   style={LocalStyles.image}
      />
      <View>
          <Text>
              Oops, no internet connection
          </Text>
      </View>
      <View>
          <Text>
              Please, check your internet connection and try again.
          </Text>
      </View>
    </View>
);
  
export default NoConnection;