import { connect } from 'react-redux';

import GameDetail from '../components/GameDetail';
import * as gameDetailActions from '../actions/gameDetail';

const mapStateToProps = (state) => {
  return {
    game: state.games.games[state.games.selectedGameIndex],
    loading: state.gameDetail.loading,
    gameDetail: state.gameDetail.gameDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestGameDetail: (gameId) => {
      dispatch(gameDetailActions.requestGameDetail(gameId));
    },
    onExit: () => {
      dispatch(gameDetailActions.clearSelectedGame());
    },
  };
};

const GameDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameDetail);

export default GameDetailContainer;

