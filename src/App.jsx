import React from 'react';

import Grid from './Grid';
import Controls from './Controls';

import './main.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Grid />
        <Controls />
      </div>
    );
  }
}
