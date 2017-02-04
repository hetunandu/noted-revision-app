// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  FAB: {
    elevation: 3,
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 56,
    height: 56,
    backgroundColor: Colors.notedRed,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }


})
