import React, { Component, PropTypes } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Image, ListView } from 'react-native';
import RowInfo from './RowInfo';
import Api from '../api/API';
import dateFormat from 'dateformat';
import Util from './../util/Util';

export default class Matchs extends Component {
  constructor(props) {
    super(props);
    this.state = { rendered: false};
    this.updateMatches = this.updateMatches.bind(this);
    this.updateMatchImage = this.updateMatchImage.bind(this);
  }

  updateMatchImage(index, championImg){
    var newMatches = [];
    newMatches = this.state.matches.slice();
    newMatches[index] = {
      ...newMatches[index],
      championImg: championImg,
    };

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newMatches),
      matches: newMatches
    });
  } 

  parseSubType(value){
    return  value.split('_').join(' ').titleize();
  }

  updateMatches(response){

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2) });
    let matches =  response.games.map( (value) => {
      return { type: this.parseSubType(value.subType) , victory: value.stats.win, 
        kills: Util.parseNumber(value.stats.championsKilled), assists: Util.parseNumber(value.stats.assists), deaths: Util.parseNumber(value.stats.numDeaths) , 
        date: dateFormat(new Date(value.createDate), 'dd/mm/yyyy'), timePlayed: this.formatSeconds(value.stats.timePlayed  )  };
    } 
		);

    this.setState( {
      dataSource: ds.cloneWithRows(matches),
      matches: matches,
      rendered: true
    });

    response.games.forEach( (game, index) => {
      Api.championInfo(game.championId).then( (response) => { this.updateMatchImage(index,`http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/${response.key}.png`); },
      () => {} );
    });

  }

  componentDidMount(){

    Api.recentGames(this.props.summonerData.id).then(  this.updateMatches , () => {} );

  }

  formatSeconds(seconds)
	{
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes > 0 ? minutes + 'm' : ''} ${seconds}s`;
  }


  renderRow(rowData) {
    return (
		<View  style={ [styles.row, rowData.victory? styles.victory : styles.defeat] } >
			<View style = { { flexDirection: 'row', flex: 2, alignItems: 'center', justifyContent : 'center' }}>
				<View style= { {flex: 1 } } >
					<Text style={ [styles.matchType,  rowData.victory? styles.victoryLabel : styles.defeatLabel  ] } >{rowData.type}</Text>
					<Text style={ [styles.timeLabel] }>{rowData.timePlayed}</Text>
				</View>
				<Image resizeMode='contain' style={ styles.image } source={{uri: rowData.championImg } } />
			</View>
			<View style= {{ flex: 3 }}>
				<RowInfo fontSize={12} label='Result' value={rowData.victory? 'Victory' : 'Defeat'} /> 
				<RowInfo fontSize={12} label='Date' value={rowData.date}  /> 
				<View style={ styles.infoRow } >
					<Text style={[ styles.infoLabel, { flex: 1 } ]} >KDA</Text>
					<View style={ { flex: 1, flexDirection: 'row' } }>
						<Text style={[ styles.kdaLabel, styles.victoryLabel ]}>{rowData.kills}</Text><Text style={ styles.kdaLabel }>/</Text>
						<Text style={[ styles.kdaLabel, styles.defeatLabel ]}>{rowData.deaths}</Text><Text style={ styles.kdaLabel }>/</Text>
						<Text style={[ styles.kdaLabel, styles.victoryLabel ]}>{rowData.assists}</Text>
					</View>
				</View>
			</View>
		</View >);
  } 

  render() {
    if (this.state.rendered ){
      return (
              <ListView
                style= { styles.matchs }
                dataSource={this.state.dataSource}
                renderRow={this.renderRow }
              />
      );
    } else {
      return (<View style= { styles.matchs }> 
						<ActivityIndicator
              style={[styles.loading]}
              />
            </View>
      );
    }
  }

}


Matchs.propTypes = {
  summonerData: PropTypes.object
};


const styles = StyleSheet.create({
  matchs: {
    flex: 1,
    backgroundColor: 'aliceblue',
    padding: 10,
  },
  infoRow:{
    flexDirection: 'row',
    flex: 1
  },
  infoLabel: {
    color: 'dodgerblue',
    flex:1,
    fontWeight: 'bold',
    fontSize: 12
  },
  kdaLabel:{
    fontSize: 12,
    fontWeight: 'bold'
  },
  row: {
    height: 80,
    flexDirection: 'row',
    padding: 10,
    flex: 1,
    elevation: 3,
    alignItems: 'center',
    margin: 7,
    backgroundColor: 'white'
  },
  rowData:{
    padding: 20,
    elevation   : 3,
    textAlign: 'center'
  },
  victory: {
    backgroundColor: '#e1ffdf'
  },
  defeat: {
    backgroundColor: '#ffdfdf'
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
    flex: 2
  },
  matchType: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12
  },
  timeLabel:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    color: 'dodgerblue',
  },
  victoryLabel: {
    color: 'green'
  },
  defeatLabel:{
    color: '#c6443e'
  }
});
