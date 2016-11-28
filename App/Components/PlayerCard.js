import React, { PropTypes } from 'react'
import { View, Text, TextInput, ListView, Image, Button } from 'react-native'
import { getTheme, setTheme, MKButton } from 'react-native-material-kit'
import styles from './Styles/PlayerCardStyle'

class PlayerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    console.log('Components/PlayerCard.constructor props: ' + JSON.stringify(props));
    console.log('Components/PlayerCard.constructor state: ' + JSON.stringify(this.state));
//    this.handlePressWon = this.handlePressWon.bind(this);
    this.handleUpdateName = this.handleUpdateName.bind(this);
  }

//  componentWillReceiveProps (newProps) {
    //console.log('PlayerCard.componentWillReceiveProps: ' + JSON.stringify(newProps));
/*
    if (newProps) {
      console.log('newProps.name: ' + newProps.name);
      this.setState({name: newProps.name});
    }
*/
    /*
     if (newProps.someData) {
     this.setState({
     dataSource: this.state.dataSource.cloneWithRows(newProps.someData)
     })
     }
     */
//  }

  handleUpdateName = (id, name) => {
    console.log('handleUpdateName, name: ' + name + ', id: ' + id);
    //console.log('handleUpdateName, state: ' + JSON.stringify(state));
    //console.log('handleUpdateName, this.state: ' + JSON.stringify(this.state));
    //console.log('handleUpdateName, this.props: ' + JSON.stringify(this.props));
    this.setState((name) => {
      return {
        curText: name,
        prevText: this.state.curText,
        prev2Text: this.state.prevText,
        prev3Text: this.state.prev2Text,
      };
    });
//    console.log('handleUpdateName, stringify(name.target): ' + JSON.stringify(name.target) + ', id: ' + id);
    this.props.updateNameRequest(id, name)
  }

  handlePressWon = (id, multiplier) => {
    console.log('Won pressed, id: ' + id + ', multiplier: ' + multiplier);
    this.props.wonRequest(id, multiplier)
  }

  updateText = (text) => {
    console.log('text: ' + text)
  }
  // <Text style={styles.cardTitle}>/{this.state.name}</Text>

  render () {
    const i = this.props.id;
    console.log('Components/PlayerCard, render(), this.props: ' + JSON.stringify(this.props))
    console.log('Components/PlayerCard, render(), this.props.player: ' + JSON.stringify(this.props.player))
    console.log('this.props.balance: ' + JSON.stringify(this.props.balance))
    console.log('this.props.balance.toFixed(2): ' + this.props.balance.toFixed())
    return (
      <View style={styles.cardStyle}>
        <View resizeMode="cover"
              style={[styles.cardTitleContainer, i == 0 ? styles.cardTitleBackgroundColor1 : i == 1 ? styles.cardTitleBackgroundColor2 : i == 2 ? styles.cardTitleBackgroundColor3 : i == 3 ? styles.cardTitleBackgroundColor4 : styles.cardTitleBackgroundColor5]}>
          <TextInput style={styles.cardTitleEdit} selectTextOnFocus={true} onFocus={() => this.updateText('--onFocus--')} autoCorrect={false}
                     value={this.state.name}
            //                     onEndEditing={(event) => this.handleUpdateName(event.nativeEvent.text, this.state.id)}
//                     onSubmitEditing={(event) => this.handleUpdateName(event.nativeEvent.text, this.state.id)}
//                     onEndEditing={(event) => this.handleUpdateName(this.state.id, this.state.name)}
//                     onEndEditing={(name) => this.handleUpdateName(this.state.id, this.state.name)}
//                     onEndEditing={(name) => this.handleUpdateName(this.state.id, name)}
//                     onChangeText={(name) => this.setState({name})}
//                     onSubmitEditing={(event) => this.handleUpdateName(this.state.id, event.nativeEvent.text)}
                     onEndEditing={(event) => this.handleUpdateName(this.state.id, event.nativeEvent.text)}
                     onChangeText={(name) => this.setState({name})}
          />
          <MKButton
            style={[styles.cardTitleButton, this.props.balance > 0 ? styles.colorPlus : this.props.balance < 0 ? styles.colorMinus : null]}>
            <Text
              style={styles.balanceText}>{this.props.balance < 0 ? this.props.balance.toFixed(2) : '+' + this.props.balance.toFixed(2)}</Text>
          </MKButton>
        </View>
        <View style={styles.buttonRowStyle}>
          <MKButton style={styles.buttonStyle} onPress={(id) => this.handlePressWon(this.state.id, 1)}>
            <Text>Won</Text>
          </MKButton>
          <MKButton style={styles.buttonStyle} onPress={(id) => this.handlePressWon(this.state.id, 2)}>
            <Text>Double</Text>
          </MKButton>
          <MKButton style={styles.buttonStyle} onPress={() => {
            console.log('onPress');
          }}>
            <Text>Undercut</Text>
          </MKButton>
          <MKButton style={styles.buttonStyle} onPress={() => {
            console.log('onPress');
          }}>
            <Text>Out</Text>
          </MKButton>
          {/*
           <MKButton style={[{padding:5}]}>
           <Text>Lost Undercut</Text>
           </MKButton>
           <MKButton style={[{padding:5}]}>
           <Text>Cancel</Text>
           </MKButton>
           */}
          {/*
           <Button style={[theme.cardContentStyle, {padding:0}]}>
           <Text>Won</Text>
           </Button>
           <Button>Won</Button>
           */}
        </View>
      </View>
    )
  }
}

PlayerCard.propTypes = {
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  active: PropTypes.bool,
  updateNameRequest: PropTypes.func,
  wonRequest: PropTypes.func
}

export default PlayerCard
