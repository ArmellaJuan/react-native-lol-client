import 'react-native';
import React from 'react';
import Games from '../../app/components/Games';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';



test('renders correctly', () => {

  let games = [
    {  
      "id":423574538,
      "type":"Normal",
      "victory":false,
      "kills":5,
      "assists":2,
      "deaths":13,
      "date":"8 hours ago",
      "timePlayed":"32m 41s",
      "index":0,
      "totalDamageDealt":133607,
      "totalDamageDealtToChampions":13888,
      "physicalDamageDealtToChampions":12585,
      "magicDamageDealtToChampions":1302,
      "fellowPlayers":[  
        {  
          "summonerId":375902,
          "teamId":100,
          "championId":120
        },
        {  
          "summonerId":391041,
          "teamId":100,
          "championId":16
        }
      ]
    },
    {  
      "id":423538758,
      "type":"Assassinate",
      "victory":true,
      "kills":4,
      "assists":7,
      "deaths":6,
      "date":"9 hours ago",
      "timePlayed":"13m 32s",
      "index":1,
      "totalDamageDealt":28777,
      "totalDamageDealtToChampions":11710,
      "physicalDamageDealtToChampions":1329,
      "magicDamageDealtToChampions":9839,
      "fellowPlayers":[  
        {  
          "summonerId":1813407,
          "teamId":200,
          "championId":121
        },
        {  
          "summonerId":111665,
          "teamId":100,
          "championId":121
        }
      ]
    }];


  const tree = renderer.create(
    <Games games={games} summonerId={1} loading={false} onRequestRecentGames={ () => {} } 
      onExit= {() => {} } onGameSelected={ () => {} }
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});