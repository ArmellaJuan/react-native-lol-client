import * as actions from '../../app/actions/gameDetail';
import * as types from '../../app/actions/types';

describe('game detail actions', () => {

  it('should create an action to clear the game detail', () => {
    

    const expectedAction = {
      type: types.CLEAR_GAME_DETAIL
    };

    expect(actions.clearGameDetail()).toEqual(expectedAction);
  
  });

  it('should create an action to receive a game detail', () => {

    const gameDetail ={
      id: 1,
      participants: [ {id: 1}, {id: 2}],
    };

    const expectedAction ={
      type: types.RECEIVE_GAME_DETAIL,
      gameDetail: gameDetail
    };

    expect(actions.receiveGameDetail(gameDetail)).toEqual(expectedAction);
    
  });

  it('should create an action to receive a participant champion', () => {

    const champion ={
      imageUrl: 'http://test.com/image.jpg'
    };

    const expectedAction ={
      type: types.RECEIVE_PARTICIPANT_CHAMPION,
      champion: champion,
      index: 1
    };

    expect(actions.receiveParticipantChampion(1,champion)).toEqual(expectedAction);
    

  

  });

});


