// @flow

import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import ResultActions from '../Redux/ResultRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/ResultScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class ResultScreen extends React.Component {

  componentDidMount(){
    this.props.submitResult()
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>ResultScreen Container</Text>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    result: state.result
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitResult: () => dispatch(ResultActions.resultRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)
