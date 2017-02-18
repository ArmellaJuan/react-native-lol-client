import * as types from './types';
import Api from '../api/API';

export function requestSummoner(){
  return{
    type: types.REQUEST_SUMMONER
  };
}

export function receiveSummoner(summoner){
  return{
    type: types.RECEIVE_SUMMONER,
    summoner: summoner
  };
}

export function receiveSummonerNotFound(){
  return{
    type: types.RECEIVE_SUMMONER_NOT_FOUND
  };
}

export function changeSearchSummonerName(newName){
  return{
    type: types.CHANGE_SEARCH_SUMMONER_NAME,
    name: newName
  };
}


export function fetchSummoner(name){

  return function (dispatch) {
    
    dispatch(requestSummoner());

    return Api.obtainSummonerData(name).then( 
      (response) => {
        //Summoner found
        let lowerCaseName = name.trim().toLowerCase();
        let id =  response[lowerCaseName].id;
        let profileIconUrl = Api.profileIconUrl(response[lowerCaseName].profileIconId);

        let summoner =  {
          profileIconUrl: profileIconUrl ,
          name: name,
          id: id
        };

        Api.obtainSummonerLeagueData(id).then(
          (response) => {
            //Summoner with league data
            let summonerData =  response[id][0];
            let leagueData = summonerData.entries[0];

            let statistics ={
              divisionName: summonerData.name,
              tier: summonerData.tier,
              wins: leagueData.wins,
              losses: leagueData.losses,
              leaguePoints: leagueData.leaguePoints
            };

            summoner.statistics = statistics;

            dispatch(receiveSummoner(summoner));

          },

          //Summoner without league data
          () => {

            summoner.statistics = generateEmptyStats();
            dispatch(receiveSummoner(summoner));

          }
        );
      },

      (response) => {
        if(response.status.status_code == 404)
          //Summoner not found
          dispatch(receiveSummonerNotFound());
      } );
  };

}

function generateEmptyStats(){

  return {
    divisionName: 'Unknown',
    tier: 'UNRANKED',
    wins: 0,
    losses: 0,
    leaguePoints: 0
  };

}
