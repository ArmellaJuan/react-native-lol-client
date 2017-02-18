import reducer from '../../app/reducers/gameDetail';
import * as types from '../../app/actions/types';


describe('gameDetail reducer', () => {
  
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        loading: true
      }
    );
  });

  it('should handle RECEIVE_GAME_DETAIL', () => {

    const gameDetail = {
      id: 123,
      participants: []
    };
    expect(
      reducer({loading: true}, {
        type: types.RECEIVE_GAME_DETAIL,
        gameDetail: gameDetail
      })
    ).toEqual(
      {
        loading: false,
        gameDetail: gameDetail
      }
    );

  });

  it('should handle CLEAR_GAME_DETAIL', () => {

    const gameDetail = {
      id: 123,
      participants: []
    };
    expect(
      reducer({
        loading: false, 
        gameDetail: gameDetail
      }, {
        type: types.CLEAR_GAME_DETAIL
      })
    ).toEqual(
      {
        loading: true
      }
    );

  });

  it('should handle RECEIVE_PARTICIPANT_CHAMPION', () =>{

    const gameDetail = {
      id: 123,
      participants: [ { id: 1, name: "Summoner 1"}, { id: 2, name:"Summoner 2"} ]
    };

    const champion = {
      id:1, name: "Pantheon"
    };

    const gameDetailWithChampionData = {
      ...gameDetail,
      participants: [ {
        id: 1,
        name: "Summoner 1",
        champion: champion
      }, 
      { id: 2,
        name:"Summoner 2"
      } ]
    };

    expect(
      reducer({
        loading: false, 
        gameDetail: gameDetail
      }, {
        type: types.RECEIVE_PARTICIPANT_CHAMPION,
        index: 0,
        champion: champion
      })
    ).toEqual(
      {
        loading: false, 
        gameDetail: gameDetailWithChampionData
      }
    );

  });

});

