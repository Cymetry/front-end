import { StyleSheet } from 'react-native';

import Variables from '../../../../../assets/styles/variables';

const LocalStyles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    borderWidth: 12,
    borderRadius: 40,
    backgroundColor: 'gray',
    borderColor: '#F8F8F8',
  },

  fullName: {
    width: '100%',
    fontSize: Variables.smallFontSize,
    textAlign: 'center',
    marginVertical: 15,
  },

  progressItem: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },

  progressBar: {
    marginHorizontal: 10,
  },

  button: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },

  progress: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
  },

  divider: {
    height: 25,
    width: 400,
    backgroundColor: '#F8F8F8',
    marginVertical: '5%',
  },
});

export default LocalStyles;
