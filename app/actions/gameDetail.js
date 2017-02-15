import * as types from './types';
import Api from '../api/API';


export function clearGameDetail(){
  return {
    type: types.CLEAR_GAME_DETAIL
  };
}

export function receiveGameDetail(gameDetail){

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

export function requestGameDetail(game){

  return function(dispatch){
    Api.gameDetail(game.id).then(
      (response) => {

        let gameDetail = {
          participants: response.participants,
          totalDamageDealt: response.totalDamageDealt,
          totalDamageDealtToChampions: response.totalDamageDealtToChampions,
          physicalDamageDealtToChampions: response.physicalDamageDealtToChampions,
          magicDamageDealtToChampions: response.magicDamageDealtToChampions
        };
          
        processTotalDmage(gameDetail);
        processParticipants(gameDetail);
 
        dispatch(receiveGameDetail(gameDetail));

        response.participants.forEach( (participant, index) => {
          Api.championInfo(participant.championId).then( (response) => { 
            dispatch(receiveParticipantChampion(index, response)); 
          },
        () => {} );
        });

      });
  };

}



function calculateMaxDmgType(participants, dmgAttribute){
  let dmgValues = participants.map(function(participant) {
    return participant.stats[dmgAttribute];
  });
  
  return Math.max(...dmgValues);

}

function processTotalDmage(gameDetail){

  gameDetail.maxTotalDamage = calculateMaxDmgType(gameDetail.participants, 'totalDamageDealt');
  gameDetail.maxTotalChampDamage = calculateMaxDmgType(gameDetail.participants, 'totalDamageDealtToChampions');
  gameDetail.maxTotalPhysicalChampDamage = calculateMaxDmgType(gameDetail.participants, 'physicalDamageDealtToChampions');
  gameDetail.maxTotalMagicChampDamage = calculateMaxDmgType(gameDetail.participants, 'magicDamageDealtToChampions');

}

function processParticipants(gameDetail){

  gameDetail.participants.forEach( (participant) => {

    participant.highestAchievedSeasonTier = participant.highestAchievedSeasonTier.titleize();
    for(let i=0; i<=6; i++){
      let itemAttributeName = `item${i}`;
      let itemId = participant.stats[itemAttributeName];
      participant.stats[itemAttributeName] = { id: itemId, imageUrl: Api.itemUrl(itemId)};
    }

  });
}


