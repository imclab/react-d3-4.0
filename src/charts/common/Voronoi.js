import React, { PropTypes } from 'react';
import d3 from 'd3';

export let Voronoi = React.createClass({

  displayName: 'Voronoi',

  propTypes: {
    values: PropTypes.array.isRequired,
    extent: PropTypes.array.isRequired,
    xAccessor: PropTypes.func.isRequired,
    yAccessor: PropTypes.func.isRequired,
    uniqueKey: PropTypes.func.isRequired,
    onMouseover: PropTypes.func,
    onMouseout: PropTypes.func
  },

  render() {
    let props = this.props;

    let voronoi = d3.geom.voronoi()
      .x(props.xAccessor)
      .y(props.yAccessor)
      .clipExtent(props.extent);

    let points = d3.nest()
      .key(props.uniqueKey)
      .rollup(v => v[0])
      .entries(props.values)
      .map(d => d.values);

    let cells = voronoi(points).map((d, i) => {

      let onMouseOver = () => {
        props.onMouseover(d.point);
      };

      let onMouseOut = () => {
        props.onMouseout(d.point);
      };

      return (
        <path
          style={{cursor: 'pointer'}}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          key={i}
          d={`M ${d.join('L')} Z`}
          fill='rgba(0,0,0,0)'
          stroke='none'
        ></path>
      );
    });

    return (
      <g className='voronoi-paths'>
        {cells}
      </g>
    );
  }

});
