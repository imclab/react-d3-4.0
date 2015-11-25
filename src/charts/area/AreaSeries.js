import React from 'react';
import d3 from 'd3';
import { Area } from './Area2';

export let AreaSeries = React.createClass({

  displayName: 'AreaSeries',

  propTypes: {
    data: React.PropTypes.array,
    xScale: React.PropTypes.func,
    yScale: React.PropTypes.func,
    colors: React.PropTypes.func,
    stacked: React.PropTypes.bool,
    activeID: React.PropTypes.number,
    interpolation: React.PropTypes.string,
    dateFormat: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      data: [],
      stacked: false,
      dateFormat: d3.time.format.utc('%Y-%m-%dT%H:%M:%S.%LZ')
    };
  },

  render() {
    let props = this.props;

    let area;

    if (props.stacked === true) {
      area = d3.svg.area();
    } else {
      area = d3.svg.area()
        .interpolate(props.interpolation)
        .x(d => props.xScale(props.dateFormat.parse(d[0][1].value)))
        .y0(d => props.yScale(d.y0))
        .y1(d => props.yScale(d.y0 + d.y));
    }

    let path = area(props.data);

    if (path !== null && path.indexOf('NaN') > -1) {
      path = '';
    }

    return (
      <g>
        <Area
          activeID={props.activeID}
          fill={props.color}
          path={path}
          data={props.data}
          opacity={props.opacity} />
      </g>
    );
  }

});
