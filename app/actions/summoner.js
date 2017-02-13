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

          () => {

            let summonerData = {};
            summoner.statistics = summonerData;

          }
        );
      },

      () => {
        
      } );
  };

}

