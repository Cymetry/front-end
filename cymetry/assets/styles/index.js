import Variables from './variables';

import grid from './global/grid';
import card from './global/card';
import text from './global/text';
import button from './global/button';
import input from './global/input';
import list from './global/list';

import navigation from './navigation';

const Styles = {

  // Glogal

  grid,
  card,
  text,
  button,
  input,
  list,

  // Global end

  navigation,
  page: {
    backgroundColor: Variables.lightGray,
  },
};

export default Styles;