import * as types from '../actions/types';

const initialState = {
  loading: true
};

function updateGameChampionData(games, action) {
  return games.map( (game, index) => {
    if(index !== action.index) {
      return game;
    }

    return {
      ...game,
      champion: action.champion
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
      loading: true
    };  

  case types.RECEIVE_CHAMPION:

    if(state.games == null){
      return state;
    }

    return {
      ...state,
      games: updateGameChampionData(state.games,action)

    };

  case types.SELECT_GAME:
    
    return {
      ...state,
      selectedGameIndex: action.index
    }; 

  default:
    return state;
  }

}