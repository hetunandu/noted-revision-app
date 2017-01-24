// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  statusContainer: {
    flex: 1,
    backgroundColor: Colors.frost,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionsContainer: {
    padding: 10,
    flex: 3
  },
  readStatus: {
    fontSize: 30
  }


})
