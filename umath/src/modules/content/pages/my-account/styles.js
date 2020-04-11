import { StyleSheet } from 'react-native';

import Variables from '../../../../../assets/styles/variables';

const LocalStyles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderWidth: 12,
    borderRadius: 40,
    marginBottom: 10,
    borderColor: '#F8F8F8',
    backgroundColor: 'gray',
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
    width: 250,
    borderRadius: 8,
    marginVertical: 5,
  },

  progress: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: {
    height: '5%',
    width: 400,
    backgroundColor: '#F8F8F8',
    marginVertical: '5%',
  },

  achievements: {
    width: '100%',
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  achievementItem: {
    alignItems: 'center',
    marginHorizontal: 15,
    justifyContent: 'center',
  },

  icon: {
    marginVertical: 10,
  },

  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    marginBottom: 5,
  },
});

export default LocalStyles;
