// @flow

import React from 'react'
import {  View, StatusBar, Text } from 'react-native'
import { connect } from 'react-redux'
import Loading from '../Components/Loading'
import ConceptCard from '../Components/ConceptCard';

// Add Actions - replace 'Your' with whatever your reducer is called :)
import ConceptActions from '../Redux/ConceptRedux'
import ResultActions from '../Redux/ResultRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/ConceptScreenStyle'

class ConceptScreen extends React.Component {

  componentDidUpdate(){
    const {concepts, result} = this.props

    if(concepts.list.length === 0 && result.data.length > 0 ){
      NavigationActions.result()
    }
  }

  render () {

    const {concepts} = this.props

    const activeConcept = concepts.list.length > 0 ? concepts.list[0] : null

    return (
      <View style={styles.container}>
        {this.props.concepts.fetching && <Loading />}
        <View style={styles.cardContainer}>
          {activeConcept && (
            <ConceptCard
              key={activeConcept.key}
              concept={activeConcept}
              mode={concepts.mode}
              showRef={concepts.showRef}

              toggleRef={() => this.handleToggleRef()}
              markConcept={(concept, status) => this.handleMarkConcept(concept, status)}

            />
          )}
        </View>
      </View>
    )
  }

  handleToggleRef() {
    this.props.toggleRef()
  }

  handleMarkConcept(concept, status){
    this.props.markConcept(this.props.concepts.subject, concept, status)
  }
}

const mapStateToProps = (state) => {
  return {
    concepts: state.concepts,
    result: state.result
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleRef: () => dispatch(ConceptActions.toggleReference()),
    markConcept: (subject_key, concept_key, status) => dispatch(ResultActions.markConcept(subject_key, concept_key, status)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConceptScreen)
