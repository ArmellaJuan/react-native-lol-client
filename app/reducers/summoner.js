import * as types from '../actions/types';

const initialState = {
  loading: false,
  name: 'Rhazkael',
  found: false
};

export default function summoner(state = initialState, action = {}) {
  
  switch (action.type) {

  case types.CHANGE_SUMMONER_NAME:
  
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

  case types.REQUEST_SUMMONER:

    return {
      ...state,
      loading: true
    };

  default:
    return state;
  }

}