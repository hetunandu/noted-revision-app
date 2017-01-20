// @flow

import { Colors, Fonts } from '../../Themes';

export default {
  container: {
    flex: 1
  },
  profileContainer: {
    height: 150,
    backgroundColor: Colors.frost,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  userName: {
    fontSize: Fonts.size.h4
  },
  drawerHeader: {
    fontSize: Fonts.size.h5,
    color: Colors.charcoal
  },
  drawerSection: {
    paddingLeft: 15
  }
}
