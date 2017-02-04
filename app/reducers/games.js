import * as types from '../actions/types';

const initialState = {
  loading: true
};

function updateGameUrl(games, action) {
  
  return games.map( (game, index) => {
    if(index !== action.index) {
      return game;
    }

    return {
      ...game,
      championImg: action.url
    };    

  });

}

export default function matchs(state = initialState, action = {}) {
  
  switch (action.type) {

  case types.RECEIVE_RECENT_GAMES:

    return {
      ...state,
      games: action.games,
      loading: false
    };  

  case types.CLEAR_RECENT_GAMES:

    return {
      ...state,
      games: null,
      loading: true
    };  

  case types.RECEIVE_GAME_IMAGE:

    return {
      ...state,
      games: updateGameUrl(state.games,action)

    };

  default:
    return state;
  }

}