import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, Image, ListView, ActivityIndicator, View, Text} from 'react-native';

import RowInfo from './RowInfo';
import HorizontalPercentageRow from './HorizontalPercentageRow';
import Kda from './Kda';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';

import GlobalStyles from '../util/globalStyles';


export default class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }


  componentDidMount(){
    this.props.onRequestGameDetail(this.props.game);
  }

  componentWillUnmount(){
    this.props.onExit();
  }

  renderDetail(){

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2) });
    let dataSource = ds.cloneWithRows(this.props.gameDetail.participants);

    let champion = this.props.game.champion;

    return(
      <View>
        <View style={ [styles.container, GlobalStyles.shadow ]} >
            <View style = { styles.championSection} >
              <Image style={ styles.image } source={ champion? { uri: champion.imageUrl } : null }  />
              <Text style ={ styles.headerText } > {champion? champion.name : '' } </Text>
            </View> 
            <View>
              <RowInfo labelStyle={ [styles.label] } label='Type' value={this.props.game.type} /> 
              <RowInfo labelStyle={ [styles.label] } label='Duration' value={this.props.game.timePlayed} /> 
              <RowInfo labelStyle={ [styles.label] } label='Creation' value={this.props.game.date} />
              
              <View style={ styles.chartView } >
                <Text style={[ styles.label, { flex: 1 } ]} >Total Damage</Text>
                <HorizontalPercentageRow style={ { flex: 1 } }  maxValue={this.props.gameDetail.maxTotalDamage} value={this.props.game.totalDamageDealt} />
              </View>
              
              <View style={ styles.chartView } >
                <Text style={[ styles.label, { flex: 1 } ]} >Damage to Champions</Text>
                <HorizontalPercentageRow maxValue={this.props.gameDetail.maxTotalChampDamage} value={this.props.game.totalDamageDealtToChampions} />
              </View>

              <View style={ styles.chartView } >
                <Text style={[ styles.label, { flex: 1 } ]} >Physical Damage to Champions</Text>
                <HorizontalPercentageRow maxValue={this.props.gameDetail.maxTotalPhysicalChampDamage} value={this.props.game.physicalDamageDealtToChampions} />
              </View>

              <View style={ styles.chartView } >
                <Text style={[ styles.label, { flex: 1 } ]} >Magic Damage to Champions</Text>
                <HorizontalPercentageRow maxValue={this.props.gameDetail.maxTotalMagicChampDamage} value={this.props.game.magicDamageDealtToChampions} />
              </View>

            </View>
        </View>
        <ListView
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this) }
        />   
      </View>
    );
  }

  renderRow(rowData) {

    return (
      <View style={ [ styles.rowContainer, GlobalStyles.shadow, rowData.teamId == 100? styles.blueTeam : styles.redTeam ] }  >
        <View style={ [styles.row] } >
            <View style = { styles.playerImageColumn }>
              <Image style={ styles.playerChampImage } source={ rowData.champion? { uri: rowData.champion.imageUrl } : null } />
            </View>

            <View style= { [ styles.playerStatColumn, styles.playerStat1Column] } >
                
                <View>

                   <View style = { styles.statEntry }>
                    <Icon name="coins" style= { styles.icon } color="#CCAC00" />
                    <Text style= { styles.rowLabel }>{rowData.stats.goldEarned}</Text>
                  </View>

                  <View style = { styles.statEntry }>
                    <MIcon name="location-on" style= { styles.icon } color="#5f00d3" />
                    <Text style= { styles.rowLabel }>{rowData.stats.minionsKilled}</Text>
                  </View>
                  
                  <View style = { styles.statEntry }>
                    <Kda kills={rowData.stats.kills} deaths={rowData.stats.deaths} assists={rowData.stats.assists} />
                  </View>

                </View>

            </View>

            <View style= { styles.playerItems } >

              <View style= { styles.itemsRow } >
                <Image  style={ styles.itemImage } source={ {uri: rowData.stats.item0.imageUrl} } />
                <Image  style={ styles.itemImage } source={ {uri: rowData.stats.item1.imageUrl} } />
                <Image  style={ styles.itemImage } source={ {uri: rowData.stats.item2.imageUrl} } />
              </View>
              
              <View style = { styles.itemsRow }>
                <Image  style={ styles.itemImage } source={ {uri: rowData.stats.item3.imageUrl} } />
                <Image  style={ styles.itemImage } source={ {uri: rowData.stats.item4.imageUrl} } />
                <Image  style={ styles.itemImage } source={ {uri: rowData.stats.item5.imageUrl} } />
              </View>

            </View>

            <View style= { [ styles.playerStatColumn, styles.playerStat2Column] } >
              <View>

                <View style = { styles.statEntry }>
                    <EIcon name="eye" style= { styles.icon } color="#006400" />
                    <Text style= { styles.rowLabel }>{rowData.stats.wardsPlaced}</Text>
                </View>

                <View style = { styles.statEntry }>
                    <EIcon name="eye-with-line" style= { styles.icon } color="#c6443e" />
                    <Text style= { styles.rowLabel }>{rowData.stats.wardsKilled}</Text>
                </View>
                
                <View style = { styles.statEntry }>
                    <Text numberOfLines={1} style= { styles.tierLabel }>{rowData.highestAchievedSeasonTier}</Text>
                </View>

              </View>

            </View>
            
        </View>
      </View>
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
                    {this.renderDetail()}
                  </View>
                )}
            </ScrollView>
          </View>
    );
  }
}

GameDetail.propTypes = {
  game: PropTypes.object.isRequired,
  onRequestGameDetail: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  gameDetail: PropTypes.object,
  onExit: PropTypes.func.isRequired
};


const styles = StyleSheet.create({
  scrollViewContainer:{
    padding: 20,
  },
  headerText: {
    fontSize:  14,
    color: 'dodgerblue',
    textAlign: 'center',
    padding: 10
  },
  rowContainer:{
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: 'white',
    marginLeft: 1,
    marginRight: 1
  },
  championSection: {
    alignItems: 'center',
    height: 120
  },
  image: {
    width:70, 
    height: 70,
    borderRadius: 35
  },
  playerChampImage:{
    height: 50,
    width: 50,
    borderRadius: 25
  },
  itemImage: {
    height: 30,
    width: 30,
    margin:1,
    backgroundColor: '#696969',
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'aliceblue',
  },
  container: {
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    marginBottom: 5,
    marginLeft: 1,
    marginRight: 1,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: 80
  },
  row: {
    height: 80,
    flexDirection: 'row',
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    color: 'dodgerblue',
    fontWeight: 'bold',
  },
  rowLabel:{
    fontSize: 10,
    fontWeight: 'bold'
  },
  tierLabel: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  chartView: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon:{
    fontSize: 10,
    paddingTop: 3,
    paddingRight: 2
  },
  playerStatColumn:{
    paddingRight: 10, 
    paddingLeft: 10, 
    alignItems: 'center', 
    justifyContent : 'center',
  },
  playerStat1Column:{
    flex:2
  },
  playerStat2Column:{
    flex: 1.6
  },
  playerItems: {
    flexDirection: 'column',
    flex: 3
  },
  playerImageColumn: {
    flexDirection: 'row', 
    flex: 1.5, 
    alignItems: 'center', 
    justifyContent : 'center' 
  },
  statEntry: {
    flexDirection: 'row',
    flex: 1
  },
  blueTeam: {
    backgroundColor: '#d4e7f7',
  },
  redTeam:{
    backgroundColor: '#f1dcda',
  },
  itemsRow:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
