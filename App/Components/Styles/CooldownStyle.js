// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.notedRedDarker,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cooldownText:{
    ...Fonts.style.h2,
    color: 'white',
    borderBottomWidth: 1
  },
  moreViewsText: {
    ...Fonts.style.h5,
    color: 'white'
  },
  timeLeftText: {
    ...Fonts.style.h1,
    color: 'white'
  },
  skipButton: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkGrey,
    elevation: 2
  },
  skipBtnText: {
    ...Fonts.style.h5,
    color: 'white'
  }
})
