// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/SubjectTabStyle'
import SubjectActionButton from '../Components/SubjectActionButton'
import StatusCounter from '../Components/StatusCounter'
import { Colors } from '../Themes'
import Index from '../Components/Index'


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
        {this.props.pro ? (
          <View style={styles.actionsContainer}>
            {this.props.index ? (
              <Index
                index={this.props.index}
                onConceptSelected={() => this.handleConceptSelected()}
              />
            ) : (
              <SubjectActionButton
                btnText="Download"
                bgColor={Colors.yellow}
                onBtnPress={() => this.handleDownloadPress()}
              />
            )}
          </View>
        ): (
          <View style={styles.actionsContainer}>
            <SubjectActionButton
              btnText="Quick Revise"
              infoText="Got 5 minutes? Revise top 5 unread concepts"
              cost="5"
              bgColor={Colors.yellow}
              onBtnPress={() => this.handleRevision()}
            />
            {/*<SubjectActionButton*/}
            {/*btnText="Test"*/}
            {/*onBtnPress={() => this.handleTest()}*/}
            {/*/>*/}
            <SubjectActionButton
              btnText="Index"
              infoText="Check out all the concepts and select what you want to study"
              cost="1"
              onBtnPress={() => this.handleIndex()}
            />
          </View>
        )}

      </View>
    )
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

  handleConceptSelected() {

  }

  handleDownloadPress() {
    this.props.onIndexDownload()
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
  pro: React.PropTypes.bool,
  onSubjectActionPress: React.PropTypes.func,
  onSubjectIndexPress: React.PropTypes.func,
  onIndexDownload: React.PropTypes.func,
  index: React.PropTypes.array,
}
//
// // Defaults for props
// SubjectTab.defaultProps = {
//   someSetting: false
// }
