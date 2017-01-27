// @flow

import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import ConceptActions from '../Redux/ConceptRedux'

import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

import Index from '../Components/Index'
import Loading from '../Components/Loading'

// Styles
import styles from './Styles/IndexScreenStyle'

class IndexScreen extends React.Component {


  render () {
    return (
      <View style={styles.mainContainer}>
        {this.props.index.fetching ? <Loading /> : (
          <Index
            style={{flex: 1}}
            index={this.props.index.data[this.props.subject_key]}
            onConceptSelected={(concept) => this.handleConceptPress(concept)}
          />
        )}
      </View>
    )
  }

  handleConceptPress(concept) {
    this.props.fetchSingleConcept(this.props.subject_key, concept.key)
  }

}


IndexScreen.propTypes = {
  subject_key: React.PropTypes.string.isRequired
}

const mapStateToProps = (state) => {

  return {
    index: state.index,
    session: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleConcept: (subject_key, concept_key) => dispatch(ConceptActions.singleRequest(subject_key, concept_key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexScreen)
