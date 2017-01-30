// @flow

import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import ConceptActions from '../Redux/ConceptRedux'
import Index from '../Components/Index'
import Loading from '../Components/Loading'
import styles from './Styles/IndexScreenStyle'
import {tracker} from '../Lib/googleAnalytics'

class IndexScreen extends React.Component {

  componentDidMount(){
    tracker.trackScreenView('Index');
  }

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
