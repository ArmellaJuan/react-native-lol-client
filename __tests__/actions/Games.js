import * as actions from '../../app/actions/games';
import * as types from '../../app/actions/types';

describe('games actions', () => {

  it('should create an action to receive a list of recent games', () => {
    
    const games = [ {id :1 }, {id : 2}];

    const expectedAction = {
      type: types.RECEIVE_RECENT_GAMES,
      games: games
    };

    expect(actions.receiveRecentGames(games)).toEqual(expectedAction);

  });

  it('should create an action to select a game', () => {

    const expectedAction = {
      type: types.SELECT_GAME,
      index: 1
    };

    expect(actions.selectGame()).toEqual(expectedAction);

  });

  it('should create an action to clear the list of recent games', () => {

    const expectedAction = {
      type: types.CLEAR_RECENT_GAMES
    };

    expect(actions.clearRecentGames()).toEqual(expectedAction);

  });

  it('should create an action to receive a champion data for a game', () => {

    const champion = {
      imageUrl: 'http://test.com/image.jpg'
    };

    const expectedAction = {
      type: types.RECEIVE_CHAMPION,
      index: 1,
      champion: champion
    };

    expect(actions.receiveGameChampionData(champion)).toEqual(expectedAction);

  });

  

});


