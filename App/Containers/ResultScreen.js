// @flow

import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import ResultActions from '../Redux/ResultRedux'
import Loading from '../Components/Loading'

import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/ResultScreenStyle'


class ResultScreen extends React.Component {

  componentDidMount(){
    this.props.submitResult()
  }

  render () {
    return (
      <View style={[styles.container, {paddingTop: 0}]}>
        <View style={styles.summary}>
          <Text>Result</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.rowHead}>Read</Text>
              <Text style={styles.rowValue}>3</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowHead}>Skip</Text>
              <Text style={styles.rowValue}>2</Text>
            </View>
          </View>
        </View>
        {this.props.result.fetching ? <Loading /> : (
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsDisplay}>
              {this.props.result.points} coins earned
            </Text>
            <TouchableHighlight
              style={styles.moreBtn}
              underlayColor="#333"
              onPress={() => NavigationActions.pop()}
            >
              <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>Study more!</Text>
            </TouchableHighlight>
          </View>
        )}
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
