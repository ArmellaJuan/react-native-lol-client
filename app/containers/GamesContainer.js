import * as gamesActions from '../actions/games';
import { connect } from 'react-redux';

import Games from '../components/Games';


const mapStateToProps = (state) => {
  return {
    name: state.summoner.name,
    summoner: state.summoner.summoner,
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
    }
  };
};

const GamesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);

export default GamesContainer;

