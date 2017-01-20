// @flow

import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'
import SubjectActions from '../Redux/SubjectRedux';

// Styles
import styles from './Styles/WelcomeScreenStyle'

// I18n
import I18n from 'react-native-i18n'

class WelcomeScreen extends React.Component {

  componentDidMount(){
    this.props.fetchSubjectList()
  }

  render () {
    return (
      <ScrollView style={styles.mainContainer}>
        <KeyboardAvoidingView behavior='position'>
          <Text>Welcome </Text>

        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    subjects: state.subjects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSubjectList: () => dispatch(SubjectActions.subjectRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
