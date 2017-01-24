// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    borderRadius: 4,
    elevation: 3,
    paddingBottom: 50
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    padding: 5,
    backgroundColor: Colors.frost,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
