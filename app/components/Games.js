import React, { Component, PropTypes } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Image, ListView } from 'react-native';
import RowInfo from './RowInfo';

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
                renderRow={this.renderRow }
              />);
    }

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
    if (this.props.loading ){
      return (
        <View style= { styles.matchs }> 
          <ActivityIndicator
            style={[styles.loading]}
            />
        </View>
      );
    } else {
      return (
        <View style= { styles.matchs }> 
         { this.renderList() }     
        </View>
      );
    }
  }

}


Games.propTypes = {
  summoner: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onRequestRecentGames: PropTypes.func.isRequired,
  dataSource: PropTypes.object,
  games: PropTypes.array,
  onExit: PropTypes.func
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
