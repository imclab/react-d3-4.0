import React, { PropTypes } from 'react';
import d3 from 'd3';
import { XAxis } from '../common/axes/XAxis';
import { YAxis } from '../common/axes/YAxis';
import { AreaSeries } from './AreaSeries2';
import { view, colorSchemes } from '../core/vizConfig';
import { Voronoi } from '../common/Voronoi';

export let AreaChart = React.createClass({

  displayName: 'AreaChart',

  propTypes: {
    results: PropTypes.object,
    view: PropTypes.array,
    margin: PropTypes.array,
    scheme: PropTypes.string,
    offset: PropTypes.string,
    interp: PropTypes.string,
    activeSeries: PropTypes.number,
    activeXValue: PropTypes.string,
    dateFormat: PropTypes.func,
    onMouseover: PropTypes.func,
    onMouseout: PropTypes.func
  },

  getDefaultProps() {
    return {
      results: {},
      view: view,
      margin: [25, 20, 30, 70],
      scheme: 'vintage',
      offset: 'silhouette',
      interp: 'monotone',
      activeSeries: null,
      dateFormat: d3.time.format.utc('%Y-%m-%dT%H:%M:%S.%LZ')
    };
  },

  render: function() {
    let { view, margin, dateFormat, results, offset, interp, scheme, activeSeries, activeXValue } = this.props; 
    let { d1Domain, series } = results;

    let dims = [
      view[0] - margin[1] - margin[3],
      view[1] - margin[0] - margin[2]
    ];

    let xScale = d3.time.scale()
      .range([0, dims[0]])
      .domain([
        dateFormat.parse(d1Domain[0]),
        dateFormat.parse(d1Domain[1])
      ]);

    let yScale = d3.scale.linear()
      .rangeRound([dims[1], 0]);

    let stack = d3.layout.stack()
      .offset(offset)
      .values(d => d)
      .x(d => xScale(dateFormat.parse(d[0][1].value)))
      .y(d => d[1][0].value || 0);

    stack(series);

    let yMax = d3.max(series, function (c) {
      return d3.max(c, d => d.y0 + d.y);
    });

    yScale.domain([0, yMax]);

    let colors;

    if (this.props.colorScale) {
      colors = this.props.colorScale;
    } else {
      colors = d3.scale.ordinal()
        .range(colorSchemes[scheme].simpleSet)
        .domain(results.d0Domain);
    }

    let paths = series.map(d => {
      return (
        <g key={d.value}>
          <AreaSeries
            activeID={activeSeries}
            stacked={false}
            interpolation={interp}
            dateFormat={dateFormat}
            xScale={xScale}
            yScale={yScale}
            color={colors(d.value || d.label)}
            data={d}
          />
        </g>
      );
    });

    let xVal = dateFormat.parse(activeXValue);
    let xPos = xScale(xVal);
    let line = (
      <line
        x1={xPos}
        y1={0 - margin[0]}
        x2={xPos}
        y2={dims[1]}
        stroke='rgba(0,0,0,0.8)'
      ></line>
    );

    let date = (
      <text
        transform={`translate(${xPos},-10)`}
        textAnchor={xPos > (dims[0] / 2) ? 'end': 'begin'}
        dx={xPos > (dims[0] / 2) ? -5: 5}
        fontSize='14px'
      >{xVal === null ? '': xVal.toDateString() + ' ' + xVal.toTimeString()}</text>
    );

    let trans = `translate(${margin[3]} ,${margin[0]})`;

    return (
      <div className='row'>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <svg
            className='viz'
            viewBox={`0 0 ${view[0]} ${view[1]}`}
          >
            <g transform={trans}>
              {paths}{line}{date}
              <XAxis
                xScale={xScale}
                dims={dims}
              />
              <YAxis
                yScale={yScale}
                dims={dims}
              />
              <Voronoi
                xAccessor={d => xScale(dateFormat.parse(d[0][1].value))}
                yAccessor={d => yScale(d.y0 + (d.y / 2))}
                uniqueKey={d => `${d[0][1].value}_${yScale(d.y0 + (d.y / 2))}`}
                extent={[[0, 0], [dims[0], dims[1]]]}
                values={results.export().filter(d => d[1][0].value !== 0)}
                onMouseover={this.props.onMouseover}
                onMouseout={this.props.onMouseout}
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }
});
