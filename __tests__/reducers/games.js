import reducer from '../../app/reducers/games';
import * as types from '../../app/actions/types';


describe('game reducer', () => {
  
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        loading: true
      }
    );
  });

  it('should handle RECEIVE_RECENT_GAMES', () => {

    const games = [
      { 
        id: 1, 
        type:"Normal",
      },
      { 
        id: 2, 
        type:"Ranked",
      },
      { 
        id: 3, 
        type:"Normal",
      }
    ];

    expect(
      reducer({loading: true}, {
        type: types.RECEIVE_RECENT_GAMES,
        games: games
      })
    ).toEqual(
      {
        loading: false,
        games: games
      }
    );
    
  });

  it('should handle CLEAR_RECENT_GAMES', () => {


    const games = [
      { 
        id: 1, 
        type:"Normal",
      },
      { 
        id: 2, 
        type:"Ranked",
      },
      { 
        id: 3, 
        type:"Normal",
      }
    ];

    expect(
      reducer({loading: false, games: games}, {
        type: types.CLEAR_RECENT_GAMES,
        gameDetail: games
      })
    ).toEqual(
      {
        loading: true
      }
    );
    
    
  });

  it('should handle RECEIVE_CHAMPION', () => {

    const games = [
      { 
        id: 1, 
        type:"Normal",
      },
      { 
        id: 2, 
        type:"Ranked",
      },
      { 
        id: 3, 
        type:"Normal",
      }
    ];

    const champion = {
      id: 1,
      name: "Pantheon"
    };

    const gamesWithChampionAdded = [
      { 
        id: 1, 
        type:"Normal",
        champion: champion
      },
      { 
        id: 2, 
        type:"Ranked",
      },
      { 
        id: 3, 
        type:"Normal",
      }
    ];

    expect(
      reducer({loading: false, games: games}, {
        type: types.RECEIVE_CHAMPION,
        champion: champion,
        index: 0 
      })
    ).toEqual(
      {
        loading: false,
        games: gamesWithChampionAdded
      }
    );
    
  });

  it('should handle SELECT_GAME', () => {

    const games = [
      { 
        id: 1, 
        type:"Normal",
      },
      { 
        id: 2, 
        type:"Ranked",
      },
      { 
        id: 3, 
        type:"Normal",
      }
    ];

    expect(
      reducer({loading: false, games: games}, {
        type: types.SELECT_GAME,
        index: 1
      })
    ).toEqual(
      {
        loading: false,
        games: games,
        selectedGameIndex: 1
      }
    );

    
  });


});

