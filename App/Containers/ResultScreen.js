// @flow

import React from 'react'
import { View, Text, TouchableHighlight, AsyncStorage, Alert, Linking } from 'react-native'
import { connect } from 'react-redux'
import ResultActions from '../Redux/ResultRedux'
import Loading from '../Components/Loading'
import Coins from '../Components/Coins';
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable';
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/ResultScreenStyle'


class ResultScreen extends React.Component {

  componentDidMount(){
    this.props.submitResult()

    AsyncStorage.getItem('reviewed')
      .then((reviewed) => {
        if(!reviewed){
          Alert.alert("Liked Noted?", "Rate us on the Playstore", [
            {text: "Sure!", onPress: () => {
              AsyncStorage.setItem('reviewed', "true")
                .then(() => Linking.openURL("market://details?id=study.noted.app"))
            }},
            {text: "Ask me Later", onPress: () => console.tron.log('Later')},
            {text: "No, Don't as again", onPress: () => AsyncStorage.setItem('reviewed', "never")}
          ])
        }
      })

  }

  renderSummary(){
    if(this.props.mode == 'revise'){
      return(
        <View style={styles.summary}>
          <Text style={styles.header}>Result</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.rowHead}>Read</Text>
              <Text style={styles.rowValue}>{this.getMarkedCount('read')}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowHead}>Skip</Text>
              <Text style={styles.rowValue}>{this.getMarkedCount('skip')}</Text>
            </View>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={[styles.container, {paddingTop: 0}]}>
        { this.renderSummary() }
        {this.props.result.fetching ? <Loading /> : (
          <View style={styles.pointsContainer}>
            <Animatable.View
              style={styles.pointsDisplay}
              animation="pulse"
              easing="ease-out"
              iterationCount="infinite"
            >
              <Text style={styles.pointsDisplayHeader}>
                You got
              </Text>
              <Coins value={this.props.result.points} dark/>
            </Animatable.View>
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

  getMarkedCount(marked) {
    let counter = 0
    this.props.result.data.map( concept => {
      if (concept.marked == marked){
        counter ++
      }
    })

    return counter
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.result,
    mode: state.concepts.mode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitResult: () => dispatch(ResultActions.resultRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen)
