import RWR from 'react-webpack-rails';
RWR.run();

import BikeMap from './components/bike-map';
import Map from './components/map';
import Demo from './components/demo';


RWR.registerComponent('BikeMap', BikeMap);
RWR.registerComponent('Map', Map);
RWR.registerComponent('Demo', Demo);

if (module.hot) {
  module.hot.accept();
  RWR.reloadNodes();
}
