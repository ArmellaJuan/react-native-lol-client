import * as types from '../actions/types';

const initialState = {
  loading: false,
  name: 'Rhazkael',
  found: false,
  searched: false
};

export default function summoner(state = initialState, action = {}) {
  
  switch (action.type) {

  case types.CHANGE_SEARCH_SUMMONER_NAME:
  
    return {
      ...state,
      name: action.name
    };  
  
  case types.RECEIVE_SUMMONER:
    
    return {
      ...state,
      summoner: action.summoner,
      loading: false,
      found: true
    };  

  case types.RECEIVE_SUMMONER_NOT_FOUND:

    return {
      ...state,
      loading: false,
      found: false
    };

  case types.REQUEST_SUMMONER:

    return {
      ...state,
      loading: true,
      searched: true
    };

  default:
    return state;
  }

}