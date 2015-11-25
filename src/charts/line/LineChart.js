import React from 'react';
import d3 from 'd3';
import { XAxis } from '../common/axes/XAxis';
import { YAxis } from '../common/axes/YAxis';
import { LineSeries } from './LineSeries';
import { view, colorSchemes } from '../core/vizConfig';
import { EventEmitter } from '../core/EventEmitter';

export let MultiLineChart = React.createClass({

  displayName: 'MultiLineChart',

  propTypes: {
    results: React.PropTypes.object,
    view: React.PropTypes.array,
    margin: React.PropTypes.array,
    scheme: React.PropTypes.string,
    title: React.PropTypes.string, 
    interpolation: React.PropTypes.string,
    clickHandler: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      results: {},
      view: view,
      margin: [20, 20, 50, 70],
      scheme: 'blueOcean',
      interpolation: 'linear',
      clickHandler: function(){}
    };
  },

  getInitialState: function() {
    return {
      activeLabel: ''
    };
  },

  setActiveLabel: function(str) {
    if (this.isMounted()) {
      this.setState({
        activeLabel: str
      });
    }
  },

  componentWillMount: function() {
    this.setState({
      eventBus: new EventEmitter()
    });
  },

  componentDidMount: function() {
    this.state.eventBus.addListener('highlight', (label) => {
      this.setActiveLabel(label);
    });
  },

  render: function() {
    let props = this.props;
    let state = this.state;

    let dims = [
      props.view[0] - props.margin[1] - props.margin[3],
      props.view[1] - props.margin[0] - props.margin[2]
    ];

    let yScale = d3.scale.linear()
      .range([dims[1], 0])
      .domain(props.results.m0Domain);

    let iso = d3.time.format.utc('%Y-%m-%dT%H:%M:%S.%LZ');

    let xScale = d3.time.scale.utc()
      .range([0, dims[0]])
      .domain([
        iso.parse(props.results.d1Domain[0]),
        iso.parse(props.results.d1Domain[1])
      ]);

    let colors = d3.scale.ordinal()
      .range(colorSchemes[props.scheme].simpleSet)
      .domain(props.results.d0Domain);

    let trans = `translate(${props.margin[3]},${props.margin[0]})`;

    let paths = props.results.series.map(series => {
      return (
        <g key={series.name}>
          <LineSeries
            xScale={xScale}
            yScale={yScale}
            color={colors(series.name)}
            activeLabel={state.activeLabel}
            eventBus={state.eventBus}
            interpolation={props.interpolation}
            data={series}
          />
        </g>
      );
    });

    return (
      <div className='row'>
        <div className="col-sm-12 col-md-12 col-lg-12">
          <h4 style={{marginLeft: '10px'}}>{props.title}</h4>
          <h6 style={{marginLeft: '10px'}}>
            <strong>Series:</strong> {state.activeLabel}
          </h6>
          <svg
            className='viz'
            viewBox={`0 0 ${props.view[0]} ${props.view[1]}`}
          >
            <g transform={trans}>
              {paths}
              <XAxis
                xScale={xScale}
                dims={dims}
              />
              <YAxis
                yScale={yScale}
                dims={dims}
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }
});
