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
  btnInfoText:{
    fontSize: Fonts.size.medium,
    color: 'grey'
  },
  notifyContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  notifyText: {
    fontSize: Fonts.size.h6,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.snow,
    padding: 10,
    elevation: 3,
  },
  closeBtn:{
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 50
  },
  modalHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    fontWeight: 'bold',
    color: Colors.charcoal
  },
  point: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center'
  },
  pointText: {
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    color: Colors.coal,
    marginLeft: 5
  },
  modalBtn: {
    padding: 10
  }
})
