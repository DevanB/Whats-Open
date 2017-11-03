jest.mock('react-native-maps', () => {
  const React = require.requireActual('react');
  const MapView = require.requireActual('react-native-maps');
  const propTypes = require.requireActual('prop-types');

  class MockCallout extends React.Component {
    render() {
      return React.createElement('Callout', this.props, this.props.children);
    }
  }

  class MockMarker extends React.Component {
    render() {
      return React.createElement('Marker', this.props, this.props.children);
    }
  }

  class MockMapView extends React.Component {
    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  }

  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  return MockMapView;
});
