import * as types from '../actions/types';

const initialState = {
  loading: true
};

export default function matchs(state = initialState, action = {}) {
  
  switch (action.type) {

  case types.RECEIVE_RECENT_GAMES:

    return {
      ...state,
      games: action.games,
      loading: false
    };  

  default:
    return state;
  }

}