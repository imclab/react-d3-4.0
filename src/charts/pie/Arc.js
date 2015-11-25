import React, { PropTypes } from 'react';
import d3 from 'd3';

export let PieArc = React.createClass({

  displayName: 'PieArc',

  propTypes: {
    data: PropTypes.array,
    fill: PropTypes.string,
    angles: PropTypes.array,
    radius: PropTypes.array,
    showInnerLabels: PropTypes.bool,
    showOuterLabels: PropTypes.bool,
    activeValue: PropTypes.node
  },

  render() {
    let { data, fill, angles, radius, showOuterLabels, showInnerLabels, activeValue } = this.props;

    let arc = d3.svg.arc()
      .innerRadius(radius[0])
      .outerRadius(radius[1])
      .startAngle(angles[0])
      .endAngle(angles[1]);

    let shouldShow = Math.abs(angles[0] - angles[1]) > Math.PI / 6;

    return (
      <g className='piechart-arc' >
        <path
          d={arc()}
          fill={data[0][0].value === activeValue ? 'red': fill}
          stroke={Math.abs(angles[0] - angles[1]) > Math.PI / 20 ? 'rgba(0,0,0,0.3)': 'none'}
        />
        <title>{data[0][0].label}</title>
        {showOuterLabels && shouldShow ? this.renderOuterLabel() : null}
        {showInnerLabels && shouldShow ? this.renderInnerLabel(arc) : null}
      </g>
    );
  },

  renderInnerLabel(arc) {
    let { data } = this.props;

    return (
        <text
          className='piechart-value'
          transform={`translate(${arc.centroid()})`}
          dy='.35em'
          style={{
            shapeRendering: 'crispEdges',
            textAnchor: 'middle',
            fill: 'black',
            fontSize: '9px',
            pointerEvents: 'none'
          }}>
          {data[1][0].value.toLocaleString()}
        </text>
      );
  },

  renderOuterLabel() {
    let { angles, radius, data } = this.props;

    let rotate = `rotate(${(angles[0] + angles[1]) / 2 * (180 / Math.PI)})`;
    let dist = radius[1] + 25;
    let angle = (angles[0] + angles[1]) / 2;
    let x = dist * (1.2 * Math.sin(angle));
    let y = -dist * Math.cos(angle);
    let t = `translate(${x},${y})`;

    return (
      <g>
        <line
          x1='0'
          x2='0'
          y1={-radius[1] - 2}
          y2={-radius[1] - 20}
          stroke={'black'}
          transform={rotate}
          style={{
            fill: 'none',
            strokeWidth: 1
          }}
          >
        </line>
        <text
          className='piechart-label'
          transform={t}
          dy='.35em'
          style={{
            'textAnchor': 'middle',
            'fill': 'black',
            'shapeRendering': 'crispEdges',
            'fontSize': '9px'
          }}>
          {data[0][0].label}
        </text>
      </g>
    );
  }
});
