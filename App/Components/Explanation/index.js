import React from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableHighlight,
	StyleSheet,
  Linking
} from 'react-native';
import {
	TitleNode,
	TextNode,
	QuoteNode,
	ImageNode,
	PointerNode
} from './nodes';


class Explanation extends React.Component {


	_renderNodes(node, i){
		switch(node.type){
			case 'title':
				return <TitleNode key={i} data={node.data} />
			case 'text':
				return <TextNode key={i} data={node.data} />
			case 'image':
				return <ImageNode key={i} data={node.data} />
			case 'quote':
				return <QuoteNode key={i} data={node.data} />
			case 'pointers':
				return <PointerNode key={i} data={node.data} />
			default:
				return <Text key={i}>{node.type}</Text>
		}
	}


	_renderExplanation(){
		return (
			<ScrollView style={{flex: 1}}>
				<View style={{flex: 1, padding: 10}}>
					{this.props.explanation.map((node, i) => this._renderNodes(node, i))}
				</View>
			</ScrollView>
		)
	}

	render() {
		return(
			<View style={styles.explanation}>
				{ this._renderExplanation() }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	explanation: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 5,
	}
})

export default Explanation;
