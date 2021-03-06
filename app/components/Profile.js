import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button, TextInput, Text } from 'react-native';

import SummonerDetails from './SummonerDetails';
import Icon from 'react-native-vector-icons/Entypo';
import GlobalStyles from '../util/globalStyles';

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

    if(!this.props.searched){
      return this.searchSummonerLabel();
    }

    if(this.props.searched && !this.props.found){
      return this.notFound();
    }

    return( 
      <SummonerDetails
       onRecentGames={this.onRecentGames}
       summoner={this.props.summoner}
       />
    );
  }

  searchSummonerLabel(){
    return(
      <View style={ [styles.informationContainer, GlobalStyles.shadow ] } >
        <Icon name="arrow-bold-up" size={60} color="dodgerblue" />
        <Text style={ styles.instructionsLabel } >Search your summoner to gather information about your games!</Text>
      </View>);
  }

  notFound(){
    return(
      <View style={ [styles.informationContainer, GlobalStyles.shadow ] } >
        <Icon name="circle-with-minus" size={60} color="red" />
        <Text style={ styles.instructionsLabel } > Summoner not found, try again with another name.</Text>
      </View>);
  }

  render() {
    return (
          <View style={styles.profile}>
            <TextInput
                style={ [ styles.checkSummoner, GlobalStyles.shadow ]}
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
  onRecentGames: PropTypes.func.isRequired,
  searched: PropTypes.bool.isRequired
};


const styles = StyleSheet.create({
  rowInfoLabel: {
    flex: 1
  },
  checkSummoner:{ 
    fontSize: 12, 
    height: 40, 
    padding: 10, 
    backgroundColor: 'white'
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
  },
  informationContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  instructionsLabel:{
    fontSize: 13,
    textAlign: 'center'
  }
});
