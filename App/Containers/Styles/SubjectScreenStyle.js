// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
