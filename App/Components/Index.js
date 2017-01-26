// @flow

import React from 'react'
import { View, Text, TouchableHighlight, ListView } from 'react-native'
import styles from './Styles/IndexStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Index extends React.Component {



  formatData(index){

    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    // Each section is going to represent a chapter so we loop over it
    for (let sectionId = 0; sectionId < index.length; sectionId++) {
      // Get the character we're currently looking for
      const currentChapter = index[sectionId];

      // Get concepts in this chapter
      const concepts = currentChapter.concepts

      // Add a section id to our array so the listview knows that we've got a new section
      sectionIds.push(sectionId);

      // Store any data we would want to display in the section header. In our case we want to show
      // the current character
      dataBlob[sectionId] = { name: currentChapter.name };

      // Setup a new array that we can store the row ids for this section
      rowIds.push([]);

      // Loop over the concepts for this section
      for (let i = 0; i < concepts.length; i++) {
        // Create a unique row id for the data blob that the listview can use for reference
        const rowId = `${sectionId}:${i}`;

        // Push the row id to the row ids array. This is what listview will reference to pull
        // data from our data blob
        rowIds[rowIds.length - 1].push(rowId);

        // Store the data we care about for this row
        dataBlob[rowId] = concepts[i];
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }

  handleConceptPressed(concept){
    this.props.onConceptSelected(concept)
  }


  renderSectionHeader(sectionData){
    return (
      <View style={styles.chapterContainer}>
        <Text style={styles.chapterName}>{sectionData.name}</Text>
      </View>
    )
  }


  renderRow(concept){
    return (
      <TouchableHighlight
        underlayColor="grey"
        onPress={() => this.handleConceptPressed(concept)}
      >
        <View style={styles.conceptContainer}>
          <View style={styles.conceptDataContainer}>
            {concept.read ? (
                <View style={styles.readCount}>
                  <Icon name="done" size={25} color="green" />
                  {concept.read > 1 && <Text> x {concept.read}</Text>}
                </View>
              ):
              (<Icon name="lens" size={20} color="gray" />)
            }
          </View>
          <Text style={styles.conceptName}>{concept.name}</Text>
          <View style={styles.conceptDataContainer}>
            {concept.important && (<Icon name="star" size={25} color="gold" />)}
          </View>
        </View>
      </TouchableHighlight>
    )
  }



  render () {

    // Dividing the index into chapters and concepts
    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    // Creating the datasource object for the listview
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData
    });

    // Formatting the index data for the listview
    const { dataBlob, sectionIds, rowIds } = this.formatData(this.props.index);

    // finally cloning the data with all the formatted data
    const index = ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds);

    return (
      <View style={styles.container}>
        <ListView
          dataSource={index}
          renderRow={(rowData) => this.renderRow(rowData)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderSectionHeader={(sectionData) => this.renderSectionHeader(sectionData)}
        />
      </View>
    )
  }
}

// Prop type warnings
Index.propTypes = {
  index: React.PropTypes.array.isRequired,
  onConceptSelected: React.PropTypes.func
}

//
// // Defaults for props
// Index.defaultProps = {
//   someSetting: false
// }
