import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, Image, ListView, TouchableHighlight, ActivityIndicator, View, Text} from 'react-native';

import Util from '../util/Util.js';
import RowInfo from './RowInfo';
import HorizontalPercentageRow from './HorizontalPercentageRow';

export default class GameDetail extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount(){
    this.props.onRequestGameDetail(this.props.game.id);
  }

  componentWillUnmount(){
    this.props.onExit();
  }

  renderDetail(){

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2) });
    let dataSource = ds.cloneWithRows(this.props.gameDetail.participants);

    return(
      <ScrollView>
        <View style={styles.container} >
            <View style = { styles.championSection} >
              <Image style={ styles.image } source={{uri: this.props.game.champion.imageUrl}}  />
              <Text style ={ styles.headerText } > {this.props.game.champion.name} </Text>
            </View> 
            <View>
              <RowInfo labelStyle={ styles.label } label='Type' value={this.props.game.type} /> 
              <RowInfo labelStyle={ styles.label } label='Duration' value={this.props.game.timePlayed} /> 
              <RowInfo labelStyle={ styles.label } label='Creation' value={this.props.game.date} />
              
              <View style={ styles.chartView } >
                <Text style={[ styles.label, { flex: 1 } ]} >Total Damage</Text>
                <HorizontalPercentageRow style={ { flex: 1 } }  maxValue={this.props.gameDetail.maxTotalDamage} value={this.props.game.stats.totalDamageDealt} />
              </View>
              
              <View style={ styles.chartView } >
                <Text style={[ styles.label, { flex: 1 } ]} >Damage to Champions</Text>
                <HorizontalPercentageRow maxValue={this.props.gameDetail.maxTotalChampDamage} value={this.props.game.stats.totalDamageDealtToChampions} />
              </View>

              <View style={ styles.chartView } >
                <Text style={[ styles.label, { flex: 1 } ]} >Physical Damage to Champions</Text>
                <HorizontalPercentageRow maxValue={this.props.gameDetail.maxTotalPhysicalChampDamage} value={this.props.game.stats.physicalDamageDealtToChampions} />
              </View>

              <View style={ styles.chartView } >
                <Text style={[ styles.label, { flex: 1 } ]} >Magic Damage to Champions</Text>
                <HorizontalPercentageRow maxValue={this.props.gameDetail.maxTotalMagicChampDamage} value={this.props.game.stats.magicDamageDealtToChampions} />
              </View>
              
            </View>
        </View>
        <View  >
             <ListView
                style= { styles.matchs }
                dataSource={dataSource}
                renderRow={this.renderRow.bind(this) }
              />   
        </View>
      </ScrollView>
    );
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight style={ styles.rowContainer } underlayColor='dodgerblue' >
        <View style={ [styles.row] } >
            <View style = { {flexDirection: 'row', flex: 2.5, alignItems: 'center', justifyContent : 'center' }}>
              <Image resizeMode='contain' style={ styles.image } source={{uri: rowData.champion? rowData.champion.imageUrl : null } } />
            </View>
            <View style={ { flex: 5} }>

            </View>
      </View>
      </TouchableHighlight>
    );
  } 


  render() {
    return (
      <View style={styles.background}>

           {this.props.loading ? (
            <View>
              <ActivityIndicator
              style={[styles.loading]}
              />
            </View>
            ) : (
              <View>
                {this.renderDetail()}
              </View>
            )}
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
  headerText: {
    fontSize:  Util.pixelSizeFor(14),
    color: 'dodgerblue',
    textAlign: 'center',
    padding: 10
  },
  rowContainer:{
    marginBottom: 5,
    marginTop: 5,
    elevation: 3,
    backgroundColor: 'white'
  },
  championSection: {
    alignItems: 'center',
    height: 120
  },
  image: {
    width: 70, 
    height: 70,
    borderRadius: 35, 
  },
  background: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'aliceblue',
    padding: 20,
  },
  container: {
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'white',
    elevation: 3,
    justifyContent: 'flex-start',
    marginBottom: 5
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
  },
  label: {
    color: 'dodgerblue',
    fontWeight: 'bold'
  },
  chartView: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
