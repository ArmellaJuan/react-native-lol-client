import * as gamesActions from '../actions/games';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
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
    onGameSelected: (gameIndex) =>{
      dispatch(gamesActions.selectGame(gameIndex));
      Actions.gameDetail();
    }
  };
};

const GamesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);

export default GamesContainer;

