import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button, TextInput } from 'react-native';

import SummonerDetails from './SummonerDetails';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.onRecentGames = this.onRecentGames.bind(this);
  }

  onRecentGames(){
    this.props.onRecentGames(this.props.summoner.name);
  }

  summonerDetails() {
    
    if(this.props.loading){
      return (<ActivityIndicator
            style={[styles.loading]}
          />);
    } 

    if(!this.props.found){
      return (<View />);
    }

    return( 
      <SummonerDetails
       onRecentGames={this.onRecentGames}
       summoner={this.props.summoner}
       />
    );
  }


  render() {
    return (
          <View style={styles.profile}>
            <TextInput
                style={{height: 40, backgroundColor: 'white', elevation   : 3}}
                value={this.props.name}
                onChangeText={ this.props.onChangeSearchSummonerName }
                placeholder="Summoner Name"
              />
            <ScrollView>
              <View style={styles.container}>             
                  {this.summonerDetails()}
              </View>
            </ScrollView>
            <Button
                    onPress={ () => this.props.onFetchSummoner(this.props.name) }
                    title="Check Summoner"
                    color="dodgerblue"
                  />
          </View>
    );
  }
}


Profile.propTypes = {
  onChangeSearchSummonerName: PropTypes.func.isRequired,
  onFetchSummoner: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  found: PropTypes.bool.isRequired,
  summoner: PropTypes.object,
  name: PropTypes.string.isRequired,
  onRecentGames: PropTypes.func.isRequired
};


const styles = StyleSheet.create({
  rowInfoLabel: {
    flex: 1
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: 80
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  profile: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'aliceblue'
  },
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column'
  }
});

