import React from 'react';
import 'react-native';
import MapScreen from '../screens/Map';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Map />).toJSON();
  expect(rendered).toMatchSnapshot();
});
