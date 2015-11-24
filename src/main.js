/* eslint no-unused-vars:false */
import React from 'react';
import { render } from 'react-dom';

export let App = React.createClass({
  render() {
    return (
      <div>
          Hello!!!
      </div>
    );
  }
});

render(<App/>, document.getElementById('container'));
