import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Image, View, Text, Button, TextInput } from 'react-native';
import Api from '../api/API';
import RowInfo from './RowInfo';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = { name: 'Rhazkael', summonerFound: false, loading: false, hasLeagueData: false };

    this.showSummonerData = this.showSummonerData.bind(this);
    this.changeSummonerName = this.changeSummonerName.bind(this);
    this.onMatchHistory = this.onMatchHistory.bind(this);

  }

  changeSummonerName(name) {
    this.setState({name});
  }

  showSummonerData() {
    this.setState({ loading: true });
    Api.obtainSummonerData(this.state.name)
    .then( 
      (response) => {
        this.setState({ summonerFound:true , summonerId: response[this.state.name.trim().toLowerCase()].id, profileIconId: response[this.state.name.toLowerCase()].profileIconId });
        Api.obtainSummonerLeagueData(this.state.summonerId).then(
          (response) => {
            var summonerData =  response[this.state.summonerId][0];
            this.setState( { labelName: this.state.name, hasLeagueData: true , summonerData:  summonerData, leagueData: summonerData.entries[0]  , loading: false  } ); 
          },
          () => {
            this.setState( { labelName: this.state.name, hasLeagueData: false , loading: false });
          }
        );
      },
        () => {
          this.setState( {summonerFound: false , loading: false });
        } );
  }

  onMatchHistory() {
    this.props.navigator.push({
      title:this.state.name + "'s matches",
      id: 'matchHistory',
      summonerData: { id: this.state.summonerId, name: this.state.name }
    }); 
  }

  summonerDetails() {
    
    if(this.state.loading){
      return (<ActivityIndicator
            style={[styles.loading]}
          />);
    } 

    if(!this.state.summonerFound){
      return (<View />);
    }

    if(this.state.hasLeagueData) {
      return( 
        <SummonerDetails
         onMatchHistory={this.onMatchHistory}
         profileIconId={this.state.profileIconId} name={this.state.labelName} 
         divisionName={this.state.summonerData.name} tier={this.state.summonerData.tier} 
         wins={this.state.leagueData.wins} losses={this.state.leagueData.losses} 
         leaguePoints={this.state.leagueData.leaguePoints} />

      );
    } else {
      return (<SummonerDetails
         onMatchHistory={this.onMatchHistory}
         profileIconId={this.state.profileIconId} name={this.state.labelName} 
         divisionName='N/A' tier='Unranked'
         wins='N/A' losses='N/A'
         leaguePoints='N/A' />
      );
    }
  }


  render() {
    return (
          <View style={styles.profile}>
            <TextInput
                style={{height: 40, backgroundColor: 'white', elevation   : 3}}
                value={this.state.name}
                onChangeText={ this.changeSummonerName }
                placeholder="Summoner Name"
              />
            <ScrollView>
              <View style={styles.container}>             
                  {this.summonerDetails()}
              </View>
            </ScrollView>
            <Button
                    onPress={this.showSummonerData}
                    title="Fetch Data"
                    color="dodgerblue"
                  />
          </View>
    );
  }
}



class SummonerDetails extends Component{

  constructor(props) {
    super(props);
  
  }

  render() {
    return (
        <View  style = { styles.details }>
          <View style = { styles.headerProfile} >
            <Image style={ styles.image } source={{uri: 'http://ddragon.leagueoflegends.com/cdn/7.2.1/img/profileicon/' + this.props.profileIconId + '.png' }}  />
            <Text style ={ styles.headerText } > {this.props.name} </Text>
          </View>
          <RowInfo label='Division Name' value={this.props.divisionName} /> 
          <RowInfo label='Tier' value={this.props.tier} /> 
          <RowInfo label='Wins' value={this.props.wins} /> 
          <RowInfo label='Losses' value={this.props.losses} />
          <RowInfo label='LP' value={this.props.leaguePoints} />
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
  divisionName: PropTypes.string,
  name: PropTypes.string,
  tier: PropTypes.string,
  wins: PropTypes.number,
  losses: PropTypes.number,
  leaguePoints: PropTypes.number,
  onMatchHistory: PropTypes.func,
  profileIconId: PropTypes.number
};

Profile.propTypes = {
  navigator: PropTypes.object.isRequired
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
  details:{
    flexDirection: 'column',
    height: 330,
    backgroundColor: 'white',
    padding: 20,
    elevation   : 3
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

