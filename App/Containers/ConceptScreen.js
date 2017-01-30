// @flow

import React from 'react'
import {  View, StatusBar, Text } from 'react-native'
import { connect } from 'react-redux'
import Loading from '../Components/Loading'
import ConceptCard from '../Components/ConceptCard';
import ConceptActions from '../Redux/ConceptRedux'
import ResultActions from '../Redux/ResultRedux'
import IndexActions from '../Redux/IndexRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from './Styles/ConceptScreenStyle'
import { tracker } from '../Lib/googleAnalytics';

class ConceptScreen extends React.Component {

  componentDidUpdate(){

    tracker.trackScreenView('Concept');

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
        <StatusBar
          hidden={true}
          animated={true}
        />
        {this.props.concepts.fetching && <Loading />}
        <View style={styles.cardContainer}>
          {activeConcept && (
            <ConceptCard
              key={activeConcept.key}
              concept={activeConcept}
              mode={concepts.mode}
              showRef={concepts.showRef}
              isSpeaking={concepts.isSpeaking}

              toggleRef={() => this.handleToggleRef()}
              markConcept={(concept, status) => this.handleMarkConcept(concept, status)}
              starConcept={(concept) => this.handleStarConcept(concept)}
              toggleSpeak={() => this.handleToggleSpeak()}
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

  handleStarConcept(concept){
    this.props.starConcept(this.props.concepts.subject, concept)
  }

  handleToggleSpeak() {
    this.props.toggleSpeak()
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
    starConcept: (subject_key, concept_key) => dispatch(IndexActions.starConcept(subject_key, concept_key)),
    toggleSpeak: () => dispatch(ConceptActions.toggleSpeakConcept())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConceptScreen)
