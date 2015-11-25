import React, { PropTypes } from 'react';
import d3 from 'd3';
import { ArcSeries } from './ArcSeries';
import { colorSchemes } from '../core/vizConfig';

export let PieChart = React.createClass({

  displayName: 'PieChart',

  propTypes: {
    data: PropTypes.object,
    view: PropTypes.array,
    margin: PropTypes.array,
    scheme: PropTypes.string,
    radius: PropTypes.array,
    labels: PropTypes.bool,
    activeValue: PropTypes.node
  },

  getDefaultProps: function() {
    return {
      data: {},
      view: [250, 250],
      margin: [10, 10, 10, 10],
      scheme: 'vintage',
      radius: [20, 100],
      labels: true,
      activeValue: ''
    };
  },

  render: function() {
    let { data, view, margin, labels, scheme, radius, activeValue } = this.props;

    let dims = [
      view[0] - margin[1] - margin[3],
      view[1] - margin[0] - margin[2]
    ];

    let colors;

    if (this.props.colorScale) {
      colors = this.props.colorScale;
    } else {
      colors = d3.scale.ordinal()
        .range(colorSchemes[scheme].simpleSet)
        .domain(data.d0Domain);
    }

    return (
      <svg
        className='viz'
        viewBox={`0 0 ${view[0]} ${view[1]}`}
      >
        <g transform={`translate(${margin[3] + dims[0] / 2},${margin[0] + dims[1] / 2})`}>
          <ArcSeries
            data={data.series[0]}
            colors={colors}
            labels={labels}
            radius={radius}
            activeValue={activeValue}
          />
        </g>
      </svg>
    );
  }
});
