import * as types from './types';
import Api from '../api/API';
import Util from './../util/Util';
import timeago from 'timeago.js';

export function receiveRecentGames(games){
  return {
    type: types.RECEIVE_RECENT_GAMES,
    games: games
  };
}

export function selectGame(index){
  return {
    type: types.SELECT_GAME,
    index: index
  };
}

export function clearRecentGames(games){
  return {
    type: types.CLEAR_RECENT_GAMES,
    games: games
  };
}

export function receiveGameChampionData(index,champion) {

  return {
    type: types.RECEIVE_CHAMPION,
    index: index,
    champion: champion
  };
}

export function requestRecentGames(summonerId){
  return function (dispatch){
    Api.recentGames(summonerId).then( (response) => {

      let games = response.games.map( (value, index) => {
        return { 
          id: value.gameId,
          type: Util.parseSubType(value.subType) , 
          victory: value.stats.win, 
          kills: Util.parseNumber(value.stats.championsKilled) ,
          assists: Util.parseNumber(value.stats.assists), 
          deaths: Util.parseNumber(value.stats.numDeaths) , 
          date: new timeago().format(new Date(value.createDate)), 
          timePlayed: Util.formatSeconds(value.stats.timePlayed),
          index: index,
          totalDamageDealt: value.stats.totalDamageDealt,
          totalDamageDealtToChampions: value.stats.totalDamageDealtToChampions,
          physicalDamageDealtToChampions: value.stats.physicalDamageDealtToChampions,
          magicDamageDealtToChampions: value.stats.magicDamageDealtToChampions
        };
      }); 

      dispatch(receiveRecentGames(games));

      response.games.forEach( (game, index) => {
        Api.championInfo(game.championId).then( (response) => { 
          dispatch(receiveGameChampionData(index, response)); 
        },
      () => {} );
      });



    } , () => {} );
  };
}