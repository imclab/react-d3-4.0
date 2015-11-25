import React from 'react';
import d3 from 'd3';
import { Line } from './Line';

export let LineSeries = React.createClass({

  displayName: 'LineSeries',

  propTypes: {
    data: React.PropTypes.array,
    xScale: React.PropTypes.func,
    yScale: React.PropTypes.func,
    color: React.PropTypes.string,
    eventBus: React.PropTypes.object,
    activeLabel: React.PropTypes.string,
    clickHandler: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      data: [],
      color: 'tomato'
    };
  },

  render: function() {
    let props = this.props;
    let iso = d3.time.format.utc('%Y-%m-%dT%H:%M:%S.%LZ');

    let line = d3.svg.line()
      .interpolate(props.interpolation)
      .x(d => props.xScale(iso.parse(d[0][d[0].length - 1].value)))
      .y(d => props.yScale(d[1][0].value));

    let path = line(props.data);

    if (path.indexOf('NaN') > -1) {
      path = '';
    }

    return (
      <g>
        <Line
          eventBus={props.eventBus}
          activeLabel={props.activeLabel}
          clickHandler={props.clickHandler}
          data={props.data}
          path={path}
          stroke={props.color}
        />
      </g>
    );
  }

});
