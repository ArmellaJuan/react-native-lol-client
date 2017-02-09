import React, { Component, PropTypes } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, TouchableHighlight, View, Text, Image, ListView } from 'react-native';

import RowInfo from './RowInfo';
import Kda from './Kda';

import Icon from 'react-native-vector-icons/Entypo';
import Util from '../util/Util.js';

export default class Games extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount(){
    this.props.onRequestRecentGames(this.props.summoner.id);
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

  renderRow(rowData) {
    return (
      <TouchableHighlight style={ styles.rowContainer } onPress={ ()=>this.props.onGameSelected(this.props.navigator, rowData.index ) } underlayColor='dodgerblue' >
        
        <View style={ [styles.row, rowData.victory? styles.victory : styles.defeat] } >
        
            <View style = { {flexDirection: 'row', flex: 2.5, alignItems: 'center', justifyContent : 'center' }}>
              <Image resizeMode='contain' style={ styles.image } source={{uri: rowData.champion? rowData.champion.imageUrl : null } } />
              <View style= { styles.matchStatFirstColumn } >
                <Text style={ styles.matchType } >{rowData.type}</Text>
                <Text style={ styles.timeLabel } >{rowData.date}</Text>
                <Text style={ styles.timeLabel }>{rowData.timePlayed}</Text>
              </View>
            </View>
            
            <View style= { styles.matchStatsSecondColumn }>
              <RowInfo valueStyle={rowData.victory? styles.victoryLabel : styles.defeatLabel} fontSize={Util.pixelSizeFor(10)} label='Result' value={rowData.victory? 'Victory' : 'Defeat'} /> 
              <View style={ styles.infoRow } >
                <Text style={[ styles.infoLabel, { flex: 1 } ]} >KDA</Text>
                <Kda kills={rowData.kills} deaths={rowData.deaths} assists={rowData.assists} />
              </View>

            </View>

            <View  style= {{ flex: 0.5 }}>
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
  summoner: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onRequestRecentGames: PropTypes.func.isRequired,
  games: PropTypes.array,
  onExit: PropTypes.func,
  navigator: PropTypes.object.isRequired,
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
    fontSize: Util.pixelSizeFor(10)
  },
  rowContainer:{
    margin: 5,
    elevation: 3,
    backgroundColor: 'white'
  },
  row: {
    height: 80,
    flexDirection: 'row',
    padding: 10,
    flex: 1,
    alignItems: 'center',
  },
  rowData:{
    padding: 20,
    elevation   : 3,
    textAlign: 'center'
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
    flex: 1.2,
    borderRadius: 25, 
  },
  matchType: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Util.pixelSizeFor(10),
    marginBottom: 2
  },
  timeLabel:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Util.pixelSizeFor(9),
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
    flex: 2,  
    alignItems: 'center', 
    justifyContent : 'center',
  },
  matchStatsSecondColumn: {
    flex: 1.5, 
    alignItems: 'center',  
  },
});