import React from 'react';
import d3 from 'd3';
import { YAxisTicks } from './YAxisTicks';
import { AxisLine } from './AxisLine';
import { Label } from './Label';

export let YAxis = React.createClass({

  displayName: 'YAxis',

  propTypes: {
    yScale: React.PropTypes.func.isRequired,
    dims: React.PropTypes.array.isRequired,
    tickFormatting: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      yAxisClassName: 'y axis',
      yAxisLabelOffset: 50,
      yOrient: 'left',
      fill: 'none',
      stroke: '#777',
      tickStroke: '#777',
      strokeWidth: '1',
      yAxisOffset: 0,
      label: ''
    };
  },

  render() {

    let props = this.props;

    let t;
    if (props.yOrient === 'right') {
      t = `translate(${props.yAxisOffset + props.dims[0]} , 0)`;
    } else {
      t = `translate(${props.yAxisOffset} , 0)`;
    }

    let tickArguments;
    if (props.yAxisTickCount) {
      tickArguments = [props.yAxisTickCount];
    }

    if (props.yAxisTickInterval) {
      tickArguments = [d3.time[props.yAxisTickInterval.unit], props.yAxisTickInterval.interval];
    }

    return (
      <g
        className={props.yAxisClassName}
        transform={t}
      >
        <YAxisTicks
          tickFormatting={props.tickFormatting}
          tickArguments={tickArguments}
          tickStroke={props.tickStroke}
          tickTextStroke={props.tickTextStroke}
          innerTickSize={props.tickSize}
          scale={props.yScale}
          orient={props.yOrient}
        />
        <AxisLine
          scale={props.yScale}
          orient={props.yOrient}
          outerTickSize={props.tickSize}
        />
        <Label
          label={props.yAxisLabel}
          offset={props.yAxisLabelOffset}
          orient={'left'}
          margins={props.margins}
          height={props.dims[1]}
        />
      </g>
    );
  }

});
