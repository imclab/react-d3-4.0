import React from 'react';
import d3 from 'd3';
import { XAxisTicks } from './XAxisTicks';
import { AxisLine } from './AxisLine';
import { Label } from './Label';

export let XAxis = React.createClass({

  displayName: 'XAxis',

  propTypes: {
    xScale: React.PropTypes.func.isRequired,
    dims: React.PropTypes.array.isRequired,
    tickFormatting: React.PropTypes.func,
    noLine: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      xAxisClassName: 'x axis',
      xAxisLabelOffset: 40,
      xOrient: 'bottom',
      tickStroke: '#777',
      tickFontSize: 10,
      strokeWidth: 'none',
      xAxisOffset: 5,
      label: ''
    };
  },

  render() {
    let props = this.props;

    let t = `translate(0,${props.xAxisOffset + props.dims[1]})`;

    let tickArguments;
    if (typeof props.xAxisTickCount !== 'undefined') {
      tickArguments = [props.xAxisTickCount];
    }

    if (typeof props.xAxisTickInterval !== 'undefined') {
      tickArguments = [d3.time[props.xAxisTickInterval.unit], props.xAxisTickInterval.interval];
    }

    let line;

    if (props.noLine === true) {
      line = (<g></g>);
    } else {
      line = (
        <AxisLine
          scale={props.xScale}
          orient={props.xOrient}
          outerTickSize={props.tickSize}
        />
      );
    }

    return (
      <g
        className={props.xAxisClassName}
        transform={t}
      >
        <Label
          label={props.xAxisLabel}
          offset={props.xAxisLabelOffset}
          orient={'bottom'}
          margins={props.margins}
          width={props.dims[0]}
        />
        <XAxisTicks
          tickFormatting={props.tickFormatting}
          tickArguments={tickArguments}
          tickFontSize={props.tickFontSize}
          tickStroke={props.tickStroke}
          tickTextStroke={props.tickTextStroke}
          innerTickSize={props.tickSize}
          scale={props.xScale}
          orient={props.xOrient}
        />
        {line}
      </g>
    );
  }

});
