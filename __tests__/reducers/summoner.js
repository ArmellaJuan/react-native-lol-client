import reducer from '../../app/reducers/summoner';
import * as types from '../../app/actions/types';


describe('summoner reducer', () => {
  
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        loading: false,
        name: 'Rhazkael',
        found: false,
        searched: false
      }
    );
  });

  it('should handle CHANGE_SEARCH_SUMMONER_NAME', () => {
    expect(
      reducer({}, {
        type: types.CHANGE_SEARCH_SUMMONER_NAME,
        name: 'Rhazkael'
      })
    ).toEqual(
      {
        name: 'Rhazkael'
      }
    );

    expect(
      reducer(
        { 
          name: 'AnotherSummoner' 
        }, {
          type: types.CHANGE_SEARCH_SUMMONER_NAME,
          name: 'Rhazkael'
        })
    ).toEqual(
      {
        name: 'Rhazkael'
      }
    );

  });

  it('should handle RECEIVE_SUMMONER_NOT_FOUND', () => {

    expect(
    reducer({ loading: true, searched: true, found: true }, 
      {
        type: types.RECEIVE_SUMMONER_NOT_FOUND
      })
    ).toEqual({loading: false, searched: true, found: false});

  });

  it('should handle REQUEST_SUMMONER', () => {

    expect(
    reducer({ loading: false, searched: false }, 
      {
        type: types.REQUEST_SUMMONER
      })
    ).toEqual({loading: true, searched: true});

  });

  it('should handle RECEIVE_SUMMONER', () => {

    const summoner = {
      id: 1, 
      name: 'Rhazkael'
    };

    expect(
      reducer(
        { 
          loading: true, found: false
        }, 
        {
          type: types.RECEIVE_SUMMONER,
          summoner: summoner
        })
    ).toEqual(
      {
        summoner: summoner,
        loading: false,
        found: true
      }
    );

  });




});

  