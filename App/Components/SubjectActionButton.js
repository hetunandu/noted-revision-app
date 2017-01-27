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
        style={[
          styles.container,
          {backgroundColor: this.props.bgColor ? this.props.bgColor : Colors.notedRed}
        ]}
        underlayColor={Colors.notedRedDarker}
        onPress={() => this.props.onBtnPress()}
      >
        <View style={styles.btnContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.btnText}>{this.props.btnText}</Text>
            <Text style={styles.infoText}>{this.props.infoText}</Text>
            <View style={styles.costContainer}>
              <Text style={styles.costText}>Uses: </Text>
              <Icon name="visibility" color="#fff" size={20} style={{padding: 5}}/>
              <Text style={styles.costText}>
                {this.props.cost}
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" color="#fff" size={30}/>
        </View>
      </TouchableHighlight>
    )
  }
}

// Prop type warnings
SubjectActionButton.propTypes = {
  btnText: React.PropTypes.string.isRequired,
  cost: React.PropTypes.string.isRequired,
  onBtnPress: React.PropTypes.func.isRequired,
  infoText: React.PropTypes.string,
  bgColor: React.PropTypes.string,
}
//
// // Defaults for props
// SubjectActionButton.defaultProps = {
//   someSetting: false
// }
