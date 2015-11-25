import React, { PropTypes } from 'react';
import d3 from 'd3';
import { PieArc } from './PieArc';

export let ArcSeries = React.createClass({

  displayName: 'ArcSeries',

  propTypes: {
    data: PropTypes.array,
    size: PropTypes.array,
    radius: PropTypes.array,
    colors: PropTypes.func,
    labels: PropTypes.bool,
    activeValue: PropTypes.node
  },

  render() {
    let { data, colors, radius, labels, activeValue } = this.props;

    let pie = d3.layout.pie()
      .value(d => d[1][0].value);

    let arcs = pie(data).map((d, i) => {
      return (
        <PieArc
          key={`pie-arc-${i}`}
          data={d.data}
          fill={colors(d.data[0][0].value)}
          angles={[d.startAngle, d.endAngle]}
          radius={radius}
          showInnerLabels={true}
          showOuterLabels={labels}
          activeValue={activeValue}
        />
      );
    });
    return (
      <g className='piechart-arcs'>
        {arcs}
      </g>
    );
  }
});
