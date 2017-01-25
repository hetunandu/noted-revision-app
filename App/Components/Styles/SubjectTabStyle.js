// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  statusContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: Colors.frost,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  actionsContainer: {
    padding: 10,
    flex: 5
  },
  readStatus: {
    fontSize: 30
  }


})
