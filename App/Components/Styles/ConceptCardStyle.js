// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    borderRadius: 4,
    elevation: 3,
  },
  actions: {
    height: 50,
    padding: 5,
    backgroundColor: Colors.darkGrey,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})
