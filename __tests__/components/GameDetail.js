import 'react-native';
import React from 'react';
import GameDetail from '../../app/components/GameDetail';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';



test('renders correctly', () => {

  let game = {  
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
    "magicDamageDealtToChampions":1302
  };

  const gameDetail = {
    "participants": [
      {
        "teamId": 100,
        "spell1Id": 4,
        "spell2Id": 14,
        "championId": 238,
        "highestAchievedSeasonTier": "SILVER",
        "stats": {
          "item0": {
            "id": 3142,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3142.png"
          },
          "item1": {
            "id": 3153,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3153.png"
          },
          "item2": {
            "id": 3074,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3074.png"
          },
          "item3": {
            "id": 3147,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3147.png"
          },
          "item4": {
            "id": 3111,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3111.png"
          },
          "item5": {
            "id": 3044,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3044.png"
          },
          "item6": {
            "id": 3340,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3340.png"
          },
          "kills": 11,
          "deaths": 6,
          "assists": 6,
          "minionsKilled": 11,
          "goldEarned": 18692,
          "wardsPlaced": 6,
          "wardsKilled": 1,
          "champion": {
            "id": 238,
            "key": "Zed",
            "name": "Zed",
            "title": "the Master of Shadows",
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Zed.png"
          }
        }
      },
      {
        "teamId": 200,
        "spell1Id": 14,
        "spell2Id": 4,
        "championId": 85,
        "highestAchievedSeasonTier": "SILVER",
        "stats": {
          "winner": true,
          "champLevel": 16,
          "item0": {
            "id": 3157,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3157.png"
          },
          "item1": {
            "id": 3152,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3152.png"
          },
          "item2": {
            "id": 3020,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3020.png"
          },
          "item3": {
            "id": 3001,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3001.png"
          },
          "item4": {
            "id": 3089,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3089.png"
          },
          "item5": {
            "id": 3135,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3135.png"
          },
          "item6": {
            "id": 3340,
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.3.1/img/item/3340.png"
          },
          "kills": 1,
          "deaths": 2,
          "assists": 4,
          "minionsKilled": 324,
          "goldEarned": 2347,
          "wardsPlaced": 6,
          "wardsKilled": 0,
          "champion": {
            "id": 107,
            "key": "Rengar",
            "name": "Rengar",
            "title": "the Pridestalker",
            "imageUrl": "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Rengar.png"
          }
        }
      }
    ],
    "maxTotalDamage": 44316,
    "maxTotalChampDamage": 32659,
    "maxTotalPhysicalChampDamage": 24322,
    "maxTotalMagicChampDamage": 30640
  };

  const tree = renderer.create(
    <GameDetail game = { game } gameDetail = { gameDetail } loading = { false } name = 'Test' onRequestGameDetail = { () => {} }
      onExit = { () => {} } />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});