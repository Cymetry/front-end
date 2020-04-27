import React from 'react';
import { View, Text } from 'react-native';
import { Video } from "expo-av";
import LocalStyles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const Videos = ({ videos }) => {
  return (
    <ScrollView>
      {
        videos.map(
          ((url, idx) => (
            <View key={idx}>
              <Text>HELLO</Text>
              <Video
                source={{ uri: url }}
                style={LocalStyles.video}
                resizeMode="contain"
                useNativeControls
              />
            </View>
          ))
        )
      }
    </ScrollView>
  );
};

export default Videos;