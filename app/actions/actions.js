import * as types from './types';
import Api from '../api/API';
import dateFormat from 'dateformat';
import Util from './../util/Util';

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

export function changeSummonerName(newName){
  return{
    type: types.CHANGE_SUMMONER_NAME,
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

export function receiveRecentGames(games){
  return{
    type: types.RECEIVE_RECENT_GAMES,
    games: games
  };
}

export function requestRecentGames(summonerId){
  return function (dispatch){
    Api.recentGames(summonerId).then( (response) => {

      console.debug(response);

      let games =  response.games.map( (value) => {
        return { type: Util.parseSubType(value.subType) , victory: value.stats.win, 
          kills: Util.parseNumber(value.stats.championsKilled) ,assists: Util.parseNumber(value.stats.assists), deaths: Util.parseNumber(value.stats.numDeaths) , 
          date: dateFormat(new Date(value.createDate), 'dd/mm/yyyy'), timePlayed: Util.formatSeconds(value.stats.timePlayed  )  };
      }); 

      dispatch(receiveRecentGames(games));


    } , () => {} );
  };
}
