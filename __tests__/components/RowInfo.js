import 'react-native';
import React from 'react';
import RowInfo from '../../app/components/RowInfo';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', () => {

  const tree = renderer.create(
    <RowInfo value="TestValue" label="TestLabel" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});