// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cooldownCounter:{
    backgroundColor: Colors.notedRedDarker,
    flex: 2,
    alignItems: 'center',
    justifyContent:'center'
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
    width: Metrics.screenWidth - 20,
    padding: 15,
    backgroundColor: Colors.darkGrey,
    elevation: 2,
    marginBottom: 20
  },
  skipBtnText: {
    ...Fonts.style.h5,
    color: 'white'
  },
  notifyContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  notifyText: {
    fontSize: Fonts.size.h6,
  }
})
