import React from 'react';

export let AxisLine = React.createClass({

  displayName: 'AxisLine',

  propTypes: {
    scale: React.PropTypes.func.isRequired,
    innerTickSize: React.PropTypes.number,
    outerTickSize: React.PropTypes.number,
    tickPadding: React.PropTypes.number,
    tickArguments: React.PropTypes.array,
    fill: React.PropTypes.string,
    stroke: React.PropTypes.string,
    strokeWidth: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      innerTickSize: 6,
      outerTickSize: 6,
      tickPadding: 3,
      fill: 'none',
      tickArguments: [10],
      tickValues: null,
      tickFormat: null,
      stroke: '#777',
      strokeWidth: 2
    };
  },

  _scaleExtent(domain) {
    let start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [start, stop] : [stop, start];
  },

  _scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : this._scaleExtent(scale.range());
  },

  render() {

    let props = this.props;
    let sign = props.orient === 'top' || props.orient === 'left' ? -1 : 1;

    let range = this._scaleRange(props.scale);

    let d;

    if (props.orient === 'bottom' || props.orient === 'top') {
      d = 'M' + range[0] + ',' + sign * props.outerTickSize + 'V0H' + range[1] + 'V' + sign * props.outerTickSize;
    } else {
      d = 'M' + sign * props.outerTickSize + ',' + range[0] + 'H0V' + range[1] + 'H' + sign * props.outerTickSize;
    }

    return (
      <path
        className='axis-line'
        d={d}
        style={{'shapeRendering': 'crispEdges'}}
        fill={props.fill}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
      >
      </path>
    );
  }
});
