import 'react-native';
import React from 'react';
import SummonerDetails from '../../app/components/SummonerDetails';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';



test('renders correctly', () => {

  let summoner = {
    id: 55899,
    name: "Test",
    profileIconUrl: "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/profileicon/553.png",
    statistics: {
      divisionName: "Trundle's Dervish",
      leaguePoints: 26,
      losses: 13,
      tier: "SILVER",
      wins: 21
    }
  };


  const tree = renderer.create(
    <SummonerDetails summoner = { summoner } onMatchHistory = { () => {} } />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});