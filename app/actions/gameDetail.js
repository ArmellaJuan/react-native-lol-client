import * as types from './types';
import Api from '../api/API';


function calculateMaxDmgType(participants, dmgAttribute){
  let dmgValues = participants.map(function(participant) {
    return participant.stats[dmgAttribute];
  });
  
  return Math.max(...dmgValues);

}

export function clearSelectedGame(){
  return {
    type: types.CLEAR_SELECTED_GAME
  };
}

export function receiveGameDetail(response){
  
  let gameDetail = {
    ...response,
    maxTotalDamage: calculateMaxDmgType(response.participants, 'totalDamageDealt'),
    maxTotalChampDamage: calculateMaxDmgType(response.participants, 'totalDamageDealtToChampions'),
    maxTotalPhysicalChampDamage: calculateMaxDmgType(response.participants, 'physicalDamageDealtToChampions'),
    maxTotalMagicChampDamage: calculateMaxDmgType(response.participants, 'magicDamageDealtToChampions')
  };
 
  return {
    type: types.RECEIVE_GAME_DETAIL,
    gameDetail: gameDetail
  };
}

export function receiveParticipantChampion(participanIndex, champion){
  return {
    type: types.RECEIVE_PARTICIPANT_CHAMPION,
    champion: champion,
    index: participanIndex
  };
}

export function requestGameDetail(id){

  return function(dispatch){
    Api.gameDetail(id).then(
      (response) => {

        dispatch(receiveGameDetail(response));

        response.participants.forEach( (participant, index) => {
          Api.championInfo(participant.championId).then( (response) => { 
            dispatch(receiveParticipantChampion(index, response)); 
          },
        () => {} );
        });

      });
  };

}