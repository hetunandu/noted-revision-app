// @flow

import React from 'react'
import { View, Text, TouchableHighlight, Linking } from 'react-native'
import styles from './Styles/ReferenceStyle'

export default class Reference extends React.Component {

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.refTitle}>{this.props.conceptName}</Text>
        {
          this.props.references.length > 0 ? (
            this.props.references.map( (ref, i) => {
              if (ref.source.substring(0, 4) == 'http'){
                return (
                  <TouchableHighlight
                    key={`ref_${i}`}
                    underlayColor="#444"
                    style={styles.reference}
                    onPress={() => this.visitRef(ref.source)}
                  >
                    <View>
                      <Text style={styles.refText}>{ref.title}</Text>
                      <Text style={styles.refLink}>{ref.source}</Text>
                    </View>
                  </TouchableHighlight>
                )
              }else{
                return (
                  <View key={`ref_${i}`} style={styles.reference}>
                    <Text style={styles.refText}>{ref.title}</Text>
                    <Text style={styles.refText}>{ref.source}</Text>
                  </View>
                )
              }
            })
          ) : (<Text style={styles.refText}>No References for this concept</Text>)
        }
      </View>
    )
  }

  visitRef(source) {
    Linking.openURL(source).catch(err => console.error('An error occurred', err));
  }
}

// Prop type warnings
Reference.propTypes = {
  references: React.PropTypes.array,
  conceptName: React.PropTypes.string
}
//
// // Defaults for props
// Reference.defaultProps = {
//   someSetting: false
// }
