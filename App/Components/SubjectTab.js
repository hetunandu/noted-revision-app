// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/SubjectTabStyle'
import SubjectActionButton from '../Components/SubjectActionButton'
import StatusCounter from '../Components/StatusCounter'
import {Actions as NavigationActions} from 'react-native-router-flux'
import Loading from '../Components/Loading'
import Index from '../Components/Index'
import { Colors } from '../Themes'


export default class SubjectTab extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <StatusCounter
            label="Total"
            value={this.props.subject.total_concepts}
          />
          <StatusCounter
            label="Read"
            value={this.props.subject.read_concepts}
          />
        </View>
        <View style={styles.actionsContainer}>
          <SubjectActionButton
            btnText="Revise"
            onBtnPress={() => this.handleRevision()}
          />
          {/*<SubjectActionButton*/}
            {/*btnText="Test"*/}
            {/*onBtnPress={() => this.handleTest()}*/}
          {/*/>*/}
          <SubjectActionButton
            btnText="Index"
            onBtnPress={() => this.handleIndex()}
          />

        </View>
      </View>
    )
  }

  calcPercentRead() {
    const total = this.props.subject.total_concepts
    const read = this.props.subject.read_concepts

    return Math.round(read / total * 100)
  }

  calcPercenLeft() {
    const total = this.props.subject.total_concepts
    const read = this.props.subject.read_concepts

    return Math.round(read / total * 100)
  }

  handleRevision(){
    this.props.onSubjectActionPress('revise')
  }

  handleTest(){
    this.props.onSubjectActionPress('test')
  }

  handleIndex(){
    this.props.onSubjectIndexPress()
  }

  handleConceptSelected(concept) {
    this.props.onSingleConceptPress(concept.key)
  }
}

// Prop type warnings
SubjectTab.propTypes = {
  subject: React.PropTypes.shape({
    name: React.PropTypes.string,
    key: React.PropTypes.string,
    total_concepts: React.PropTypes.number,
    read_concepts: React.PropTypes.number
  }),
  onSubjectActionPress: React.PropTypes.func,
  onSubjectIndexPress: React.PropTypes.func,
  onSingleConceptPress: React.PropTypes.func
}
//
// // Defaults for props
// SubjectTab.defaultProps = {
//   someSetting: false
// }
