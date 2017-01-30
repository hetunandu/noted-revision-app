// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  mainContainer: ApplicationStyles.screen.mainContainer,
  container: {
    margin: 10,
    marginTop: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5
  },
  submitBtn: {
    padding: 15,
    backgroundColor: '#2E7F2E',
    alignItems: 'center',
    alignSelf: 'stretch'
  }
})
