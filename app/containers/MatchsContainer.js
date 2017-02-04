import * as actions from '../actions/actions';
import { connect } from 'react-redux';

import Matchs from '../components/Matchs';


const mapStateToProps = (state) => {
  return {
    name: state.summoner.name,
    summoner: state.summoner.summoner,
    loading: state.matchs.loading,
    games: state.matchs.games
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestRecentGames: (summonerId) => {
      dispatch(actions.requestRecentGames(summonerId));
    }
  };
};

const MatchsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Matchs);

export default MatchsContainer;

