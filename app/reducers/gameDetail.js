import * as types from '../actions/types';

const initialState = {
  loading: true
};


function updateParticipantChampion(participants, action) {
  
  return participants.map( (participant, index) => {
    if(index !== action.index) {
      return participant;
    }

    return {
      ...participant,
      champion: action.champion
    };    

  });

}

export default function matchs(state = initialState, action = {}) {
  
  switch (action.type) {

  case types.RECEIVE_GAME_DETAIL:
        
    return {
      ...state,
      gameDetail: action.gameDetail,
      loading: false
    }; 

  case types.CLEAR_GAME_DETAIL:
  
    return {
      loading: true
    }; 

  case types.RECEIVE_PARTICIPANT_CHAMPION:
    
    if(state.gameDetail == null){
      return state;
    }

    return {
      ...state,
      gameDetail: {
        ...state.gameDetail,
        participants: updateParticipantChampion(state.gameDetail.participants,action)
      }
    }; 


  default:
    return state;
  }

}