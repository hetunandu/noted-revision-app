// @flow

import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from './Styles/SubjectActionButtonStyle'
import {Colors} from '../Themes';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class SubjectActionButton extends React.Component {

  render () {
    return (
      <TouchableHighlight
        style={styles.container}
        underlayColor={Colors.notedRedDarker}
        onPress={() => this.props.onBtnPress()}
      >
        <View style={styles.btnContainer}>
          <Text style={styles.btnText}>{this.props.btnText}</Text>
          <Icon name="chevron-right" color="#fff" size={30}/>
        </View>
      </TouchableHighlight>
    )
  }
}

// Prop type warnings
SubjectActionButton.propTypes = {
  btnText: React.PropTypes.string.isRequired,
  onBtnPress: React.PropTypes.func
}
//
// // Defaults for props
// SubjectActionButton.defaultProps = {
//   someSetting: false
// }
