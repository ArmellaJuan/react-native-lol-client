import * as gamesActions from '../actions/games';
import { connect } from 'react-redux';

import Games from '../components/Games';


const mapStateToProps = (state) => {
  return {
    name: state.summoner.name,
    summonerId: state.summoner.summoner.id,
    loading: state.games.loading,
    games: state.games.games
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestRecentGames: (summonerId) => {
      dispatch(gamesActions.requestRecentGames(summonerId));
    },
    onExit: () => {
      dispatch(gamesActions.clearRecentGames());
    },
    onGameSelected: (navigator, gameIndex) =>{
      
      navigator.push({
        title: 'Game Detail',
        id: 'gameDetail'
      });

      dispatch(gamesActions.selectGame(gameIndex));
    }
  };
};

const GamesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);

export default GamesContainer;

