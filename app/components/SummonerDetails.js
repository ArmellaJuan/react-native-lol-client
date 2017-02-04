import React, { Component, PropTypes } from 'react';
import { StyleSheet,  Image, View, Text, Button } from 'react-native';

import RowInfo from './RowInfo';

export default class SummonerDetails extends Component{

  constructor(props) {
    super(props);
  
  }

  render() {
    return (
        <View  style = { styles.details }>
          <View style = { styles.headerProfile} >
            <Image style={ styles.image } source={{uri: this.props.summoner.profileIconUrl}}  />
            <Text style ={ styles.headerText } > {this.props.summoner.name} </Text>
          </View>
          <RowInfo label='Division Name' value={this.props.summoner.statistics.divisionName} /> 
          <RowInfo label='Tier' value={this.props.summoner.statistics.tier} /> 
          <RowInfo label='Wins' value={this.props.summoner.statistics.wins} /> 
          <RowInfo label='Losses' value={this.props.summoner.statistics.losses} />
          <RowInfo label='LP' value={this.props.summoner.statistics.leaguePoints} />
          <Button
            onPress={ this.props.onMatchHistory } 
            title="Recent Games"
            color="dodgerblue"
          />
        </View >
      
    );
  }

}

SummonerDetails.propTypes ={
  summoner: PropTypes.object.isRequired,
  onMatchHistory: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 17,
    color: 'dodgerblue',
    textAlign: 'center'
  },
  image: {
    width: 70, 
    height: 70,
    borderRadius: 35, 
  },
  headerProfile: {
    flex: 3.8,
    alignItems: 'center',
  },
  details:{
    flexDirection: 'column',
    height: 330,
    backgroundColor: 'white',
    padding: 20,
    elevation   : 3
  }
});

