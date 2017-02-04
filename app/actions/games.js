import * as types from './types';
import Api from '../api/API';
import dateFormat from 'dateformat';
import Util from './../util/Util';

export function receiveRecentGames(games){
  return{
    type: types.RECEIVE_RECENT_GAMES,
    games: games
  };
}

export function clearRecentGames(games){
  return{
    type: types.CLEAR_RECENT_GAMES,
    games: games
  };
}

export function receiveGameImage(index,url) {
  return{
    type: types.RECEIVE_GAME_IMAGE,
    index: index,
    url: url
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

      response.games.forEach( (game, index) => {
        Api.championInfo(game.championId).then( (response) => { 
          dispatch(receiveGameImage(index,`http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/${response.key}.png`)); 
        },
      () => {} );
      });



    } , () => {} );
  };
}
