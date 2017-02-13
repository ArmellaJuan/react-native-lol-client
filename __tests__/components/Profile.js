import 'react-native';
import React from 'react';
import Profile from '../../app/components/Profile';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('../../app/components/SummonerDetails', () => 'SummonerDetails');


test('renders correctly', () => {

  let summoner = {
    id: 55899,
    name: "Test"
  };

  const tree = renderer.create(
    <Profile summoner = { summoner } found = { true } loading = { false } name = 'Test' onFetchSummoner = { () => {} }
      onChangeSearchSummonerName = { () => {} }  navigator =  { new Object() } />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});