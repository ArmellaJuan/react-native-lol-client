import React, { Component, PropTypes } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, TouchableHighlight, View, Text, Image, ListView } from 'react-native';

import RowInfo from './RowInfo';
import Kda from './Kda';

import Icon from 'react-native-vector-icons/Entypo';

import GlobalStyles from '../util/globalStyles';

export default class Games extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount(){
    this.props.onRequestRecentGames(this.props.summonerId);
  }

  componentWillUnmount(){
    this.props.onExit();
  }

  renderList(){

    if(!this.props.loading){
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2) });
      let dataSource = ds.cloneWithRows(this.props.games);
      return (<ListView
                style= { styles.matchs }
                dataSource={dataSource}
                renderRow={this.renderRow.bind(this) }
              />);
    }

  }

  renderRow(gameData) {    
    return (
      <TouchableHighlight style={ [ styles.rowContainer, GlobalStyles.shadow ] } onPress={ ()=>this.props.onGameSelected( gameData.index ) } underlayColor='dodgerblue' >
        
        <View style={ [styles.row, gameData.victory? styles.victory : styles.defeat] } >
        
            <Image style={ styles.image } source= { gameData.champion? { uri: gameData.champion.imageUrl } : null } />
            
            <View style= { styles.matchStatFirstColumn } >
              <Text style={ styles.matchType } >{gameData.type}</Text>
              <Text style={ styles.timeLabel } >{gameData.date}</Text>
              <Text style={ styles.timeLabel }>{gameData.timePlayed}</Text>
            </View>
            
            <View style= { styles.matchStatsSecondColumn }>
              <RowInfo valueStyle={ [gameData.victory? styles.victoryLabel : styles.defeatLabel] } fontSize={10} label='Result' value={gameData.victory? 'Victory' : 'Defeat'} /> 
              <View style={ styles.infoRow } >
                <Text style={[ styles.infoLabel, { flex: 1 } ]} >KDA</Text>
                <Kda kills={gameData.kills} deaths={gameData.deaths} assists={gameData.assists} />
              </View>
            </View>

            <View  style= { styles.toDetail }>
              <Icon name="chevron-thin-right" size={25} color="dodgerblue" />
            </View>

      </View>

    </TouchableHighlight>
    );
  } 

  render() {
    return (
        <View style={styles.background}>
           <ScrollView >
             {this.props.loading ? (
                  <View>
                    <ActivityIndicator
                    style={[styles.loading]}
                    />
                  </View>
                  ) : (
                     <View style= { styles.scrollViewContainer } >
                      { this.renderList() }     
                    </View>
                )}
          </ScrollView>
        </View>
    );
  }
}


Games.propTypes = {
  summonerId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  onRequestRecentGames: PropTypes.func.isRequired,
  games: PropTypes.array,
  onExit: PropTypes.func,
  onGameSelected: PropTypes.func.isRequired
};


const styles = StyleSheet.create({
  scrollViewContainer:{
    padding: 20,
  },
  scrollView:{
    padding: 10 
  },
  background: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  infoRow:{
    flexDirection: 'row',
    flex: 1
  },
  infoLabel: {
    flex:1,
    fontWeight: 'bold',
    fontSize: 10
  },
  rowContainer:{
    margin: 5,
    backgroundColor: 'white'
  },
  row: {
    height: 80,
    flexDirection: 'row',
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  victory: {
    backgroundColor: '#d4e7f7'
  },
  defeat: {
    backgroundColor: '#f1dcda'
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: 80
  },
  image: {
    width: 50, 
    height: 50,
    borderRadius: 25
  },
  matchType: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 2
  },
  timeLabel:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
  },
  victoryLabel: {
    color: '#1a78ae',
    fontWeight: 'bold',
  },
  defeatLabel:{
    color: '#c6443e',
    fontWeight: 'bold',
  },
  matchStatFirstColumn:{
    paddingRight: 10, 
    paddingLeft: 10, 
    flex: 1.5,  
    alignItems: 'center', 
    justifyContent : 'center',
  },
  matchStatsSecondColumn: {
    flex: 1.5, 
    alignItems: 'center',  
  },
  toDetail:{
    flex: 0.5 
  }
});
