import React from 'react';
import {
	Text,
	View,
	Image,
	StyleSheet
} from 'react-native';
import Markdown from 'react-native-simple-markdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Fonts } from '../../Themes';


export class TitleNode extends React.Component{
	render(){
		return <Text style={styles.title}>{this.props.data}</Text>
	}
}

export class TextNode extends React.Component{
	render(){
    const markdownStyles = {
      text: {
        fontSize: 18,
      },
      paragraph: {
        marginBottom: 10,
        marginTop: 0,
        flexWrap: 'wrap'
      },
      strong: {
        color: 'red',
      }
    }
		return (
			<Markdown styles={markdownStyles}>
				{this.props.data}
			</Markdown>
		)
	}
}


export class QuoteNode extends React.Component{
	render(){
		return <Text style={styles.quote} >{this.props.data}</Text>
	}
}

export class ImageNode extends React.Component{
	render(){
		return (
			<Image
				style={{minHeight: 200, marginBottom: 10}}
				resizeMode="contain"
				source={{uri: `${this.props.data}`}}
			/>
		);
	}
}

export class PointerNode extends React.Component{
	render(){
		return (
			<View>
			{
				this.props.data.map((point, j) => {
					return (
						<View key={`point_${j}`} style={styles.pointer}>
              <Text style={styles.pointerIndex}>{j + 1}</Text>
              <View style={styles.pointContent}>
								<Text style={styles.pointerTitle}>{point.title}</Text>
                <View style={styles.pointNodes}>
                  {point.nodes.map((node, k) => {
                    switch(node.type){
                      case 'text':
                        return <TextNode key={k} data={node.data} />
                      case 'image':
                        return <ImageNode key={k} data={node.data} />
                      case 'subPoint':
                        return <SubPointNode key={k} data={node.data} />
                      default:
                        return <TextNode key={k} data={node.type} />
                    }
                    })}
                </View>
              </View>
						</View>
					)
				})
			}
		</View>
		)
	}
}

export class SubPointNode extends React.Component{
	render(){
		return (
			<View style={{flex: 1}}>
				{this.props.data.map((subPoint, i) => {
          return(
            <View key={`${i}-subpoint-${subPoint}`} style={styles.subPoint}>
              <Icon
                name="label"
                size={15}
                color="#333"
                style={{padding: 3}}
              />
              <TextNode data={subPoint} />
            </View>
          )
					})}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	title: {
		marginTop: 5,
		marginBottom: 10,
		fontSize: Fonts.size.h3,
		color: '#000',
		fontWeight: "100"
	},
	quote: {
		padding: 5,
		paddingLeft: 25,
		fontSize: 20,
		borderLeftWidth: 7,
		borderLeftColor: Colors.notedRedDarker,
    color: Colors.charcoal,
		fontStyle: 'italic',
    fontWeight: 'bold',
		marginBottom: 10
	},
	pointer:{
		marginBottom: 5,
    flexDirection: 'row'
  },
  pointerIndex: {
    fontSize: 25,
    color: '#000',
    flex: 1,
    fontWeight: "900",
    textAlign: 'center'
  },
	pointContent:{
	  flex: 10
	},

	pointerTitle: {
		fontSize: 20,
		fontWeight: "500",
	},
	pointNodes: {
	},
	subPoint: {
	  padding: 5,
		flex: 1,
		flexDirection: 'row',
    justifyContent: 'flex-start'
	}
})
