import React, { Component, PropTypes } from 'react';
import { StyleSheet,  Image, View, Text, Button } from 'react-native';

import RowInfo from './RowInfo';
import Util from '../util/Util.js';

export default class SummonerDetails extends Component{

  constructor(props) {
    super(props);
  
  }

  render() {

    
    let summoner = this.props.summoner;
    let statistics = summoner.statistics;

    return (
        <View  style = { styles.details }>
          <View style = { styles.headerProfile} >
            <Image style={ styles.image } source={{uri: summoner.profileIconUrl}}  />
            <Text style ={ styles.headerText } > {summoner.name} </Text>
          </View>
          <RowInfo labelStyle={ [styles.label] } label='Division Name' value={statistics.divisionName} /> 
          <RowInfo labelStyle={ [styles.label] } label='Tier' value={statistics.tier} /> 
          <RowInfo labelStyle={ [styles.label] } label='Wins' value={statistics.wins} /> 
          <RowInfo labelStyle={ [styles.label] } label='Losses' value={statistics.losses} />
          <RowInfo labelStyle={ [styles.label] } label='LP' value={statistics.leaguePoints} />
          <Button
            onPress={ this.props.onRecentGames } 
            title="Recent Games"
            color="dodgerblue"
            style={ styles.summonerDetailButton }
          />
        </View >
      
    );
  }

}

SummonerDetails.propTypes ={
  summoner: PropTypes.object.isRequired,
  onRecentGames: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  summonerDetailButton: {
    margin: 20
  },
  headerText: {
    fontSize:  14,
    color: 'dodgerblue',
    textAlign: 'center',
    padding: 10
  },
  image: {
    width: 70, 
    height: 70,
    borderRadius: 35
  },
  headerProfile: {
    alignItems: 'center',
  },
  details:{
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
    elevation   : 3
  },
  label: {
    color: 'dodgerblue'
  }
});

