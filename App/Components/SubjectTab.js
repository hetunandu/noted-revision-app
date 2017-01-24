// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/SubjectTabStyle'
import SubjectActionButton from '../Components/SubjectActionButton'

export default class SubjectTab extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          {/*<Text style={styles.readStatus}>*/}
            {/*{this.calcPercentRead()} %*/}
          {/*</Text>*/}
        </View>
        <View style={styles.actionsContainer}>
          <SubjectActionButton
            btnText="Revise"
            onBtnPress={() => this.handleRevision()}
          />
          <SubjectActionButton
            btnText="Test"
            onBtnPress={() => this.handleTest()}
          />
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

  handleRevision(){
    this.props.onSubjectActionPress('revise')
  }

  handleTest(){
    this.props.onSubjectActionPress('test')
  }

  handleIndex(){

  }



}

// Prop type warnings
SubjectTab.propTypes = {
  subject: React.PropTypes.shape({
    "name": React.PropTypes.string,
    "key": React.PropTypes.string
  }),
  onSubjectActionPress: React.PropTypes.func
}
//
// // Defaults for props
// SubjectTab.defaultProps = {
//   someSetting: false
// }
