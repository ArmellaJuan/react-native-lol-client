import * as actions from '../../app/actions/summoner';
import * as types from '../../app/actions/types';

describe('summoner actions', () => {

  it('should create an action to receive a summoner', () => {
    
    const summoner = {
      id: 55899,
      name: "Test"
    };

    const expectedAction = {
      type: types.RECEIVE_SUMMONER,
      summoner: summoner
    };

    expect(actions.receiveSummoner(summoner)).toEqual(expectedAction);

  });

  it('should create an action to request a summoner', () => {

    const expectedAction = {
      type: types.REQUEST_SUMMONER
    };

    expect(actions.requestSummoner()).toEqual(expectedAction);

  });

  it('should create an action to change the summoner name', () => {

    const expectedAction = {
      type: types.CHANGE_SEARCH_SUMMONER_NAME
    };

    expect(actions.changeSearchSummonerName()).toEqual(expectedAction);

  });

});


