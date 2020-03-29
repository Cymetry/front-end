import { StyleSheet } from 'react-native';

import Variables from '../../../../../assets/styles/variables';

const LocalStyles = StyleSheet.create({
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'gray',
    borderWidth: 12,
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
    width: 250,
    height: 250,
    justifyContent: 'center',
  },

  divider: {
    height: 25,
    width: 400,
    backgroundColor: '#F8F8F8',
    marginVertical: 20,
  },
});

export default LocalStyles;
