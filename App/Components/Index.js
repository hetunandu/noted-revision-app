// @flow

import React from 'react'
import { View, Text, TouchableHighlight, ListView } from 'react-native'
import styles from './Styles/IndexStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Accordion from 'react-native-accordion'

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

  handleConceptRead(concept){
    this.props.onConceptSelected(concept.key)
  }

  handleConceptStar(concept){
    this.props.onConceptStar(concept.key)
  }


  renderSectionHeader(sectionData){
    return (
      <View style={styles.chapterContainer}>
        <Text style={styles.chapterName}>{sectionData.name}</Text>
      </View>
    )
  }


  renderRow(concept){

    const conceptListItem = (
      <View style={styles.conceptContainer}>
        <View style={styles.conceptDataContainer}>
          {concept.read ? (
              <View style={styles.readCount}>
                <Icon name="done" size={25} color="green" />
              </View>
            ):
            (<Icon name="lens" size={15} color="gray" />)
          }
        </View>
        <Text style={styles.conceptName}>{concept.name}</Text>
        {concept.important && (
          <View style={styles.conceptDataContainer}>
            <Icon name="star" size={25} color="gold" />
          </View>
        )}
      </View>
    );

    const conceptListActions = (
      <View style={styles.conceptActions}>
        {concept.read && (
          <View style={styles.conceptActionContainer}>
            <Icon name="done" size={25} color="green" />
            <Text style={styles.conceptActionText} >x {concept.read}</Text>
          </View>
        )}
        <TouchableHighlight
          underlayColor="#f1f1f1"
          onPress={() => this.handleConceptStar(concept)}
        >
          <View style={styles.conceptActionContainer}>
            {concept.important ? (
              <Icon name="star" size={25} color="gold" />
            ) : (
              <Icon name="star-border" size={25} color="#333" />
            )}
            <Text style={styles.conceptActionText}>Imp</Text>
          </View>
        
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#f1f1f1"
          onPress={() => this.handleConceptRead(concept)}
        >
          <View style={styles.conceptActionContainer}>
            <Icon name="visibility" size={25} color="#333"/>
            <Text style={styles.conceptActionText}>Read</Text>
          </View>
        </TouchableHighlight>

      </View>
    )


    return (
      <Accordion
        header={conceptListItem}
        content={conceptListActions}
        easing="easeOutCubic"
      />
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
          initialListSize={10}
          pageSize={10}
        />
      </View>
    )
  }
}

// Prop type warnings
Index.propTypes = {
  index: React.PropTypes.array.isRequired,
  onConceptSelected: React.PropTypes.func,
  onConceptStar: React.PropTypes.func
}

//
// // Defaults for props
// Index.defaultProps = {
//   someSetting: false
// }
