import React, { PureComponent } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {
  createStackNavigator,
  HeaderBackButton
} from "@react-navigation/stack";

import {
  createTabNavigationOptions,
  navigationWrapper
} from "../../../../platform/services/navigation";
import Topics from "./pages/topics";
import Skills from "./pages/skills";
import SkillItem from "./pages/skill-item";
import ROUTES from "../../../../platform/constants/routes";
import CurriculumController from "../../../../platform/api/curriculum";
import Styles from "../../../../../assets/styles";
import LocalStyles from "./styles";

// class Learning extends PureComponent {
//   static navigationOptions = ({ navigation }) => {
//     const { name } = navigationWrapper.navigation.state?.params || {};

//     return {
//       title: name,
//       headerLeft: () => (
//         <HeaderBackButton
//           onPress={() => navigationWrapper.navigation.navigate(ROUTES.HOME)}
//         />
//       )
//     };
//   };

//   state = {
//     curriculums: []
//   };

//   componentDidMount() {
//     const { id } = this.props;
//     this.fetchCurriculums(id);
//   }

//   fetchCurriculums = async id => {
//     const result = await CurriculumController.List(id);
//     result && result.length && this.setState({ curriculums: result });
//   };

//   render() {
//     const { curriculums } = this.state;

//     return (
//       <ScrollView style={Styles.page}>
//         <View style={LocalStyles.container}>
//           <View style={Styles.list.container}>
//             {curriculums.map(item => (
//               <ListItem
//                 key={item.id}
//                 title={item.name}
//                 containerStyle={LocalStyles.listItem}
//                 leftAvatar={{ source: { uri: item.logo }, ...Styles.avatar }}
//                 onPress={() =>
//                   navigationWrapper.navigation.navigate(
//                     ROUTES.CONTENT_LEARNING_TOPICS,
//                     item
//                   )
//                 }
//                 roundAvatar
//                 chevron
//               />
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     );
//   }
// }

const Stack = createStackNavigator();

const LearningScreens = () => (
  <Stack.Navigator
    headerLayoutPreset="center"
    screenOptions={() => Styles.navigation}
    initialRouteName={ROUTES.CONTENT_LEARNING_TOPICS}
  >
    {/* <Stack.Screen
      name={ROUTES.CONTENT_LEARNING}
      options={() => {
        const { name } = navigationWrapper.navigation.state?.params || {};
        return {
          title: name,
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigationWrapper.navigation.navigate(ROUTES.HOME)}
            />
          )
        };
      }}
    >
      {props => <Learning {...props} id={id} />}
    </Stack.Screen> */}

    <Stack.Screen
      name={ROUTES.CONTENT_LEARNING_TOPICS}
      component={Topics}
      options={() => {
        const { name } = navigationWrapper.navigation.state?.params || {};
        return { title: name };
      }}
    />

    <Stack.Screen
      name={ROUTES.CONTENT_LEARNING_SKILLS}
      component={Skills}
      options={() => {
        const { name } = navigationWrapper.navigation.state?.params || {};
        return { title: name };
      }}
    />

    <Stack.Screen
      name={ROUTES.CONTENT_LEARNING_SKILL_ITEM}
      component={SkillItem}
      options={() => {
        const { name } = navigationWrapper.navigation.state?.params || {};
        return { title: name };
      }}
    />
  </Stack.Navigator>
);

export default LearningScreens;
