import React from 'react';
import { trimLabel } from '../trimLabel';

export let XAxisTicks = React.createClass({

  displayName: 'XAxisTicks',

  propTypes: {
    scale: React.PropTypes.func.isRequired,
    orient: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
    tickArguments: React.PropTypes.array,
    tickValues: React.PropTypes.array,
    innerTickSize: React.PropTypes.number,
    outerTickSize: React.PropTypes.number,
    tickPadding: React.PropTypes.number,
    tickFormat: React.PropTypes.func,
    tickStroke: React.PropTypes.string,
    xyz: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      innerTickSize: 6,
      outerTickSize: 6,
      tickStroke: '#777',
      tickPadding: 3,
      tickFontSize: 10,
      tickArguments: [5],
      tickValues: null
    };
  },

  render() {
    let props = this.props;

    let tr, ticks, scale, adjustedScale;
    let textAnchor, tickFormat;
    let y1, y2, dy, x1, x2;

    let sign = props.orient === 'top' || props.orient === 'right' ? -1 : 1;
    let tickSpacing = Math.max(props.innerTickSize, 0) + props.tickPadding;

    scale = props.scale;

    if (props.tickValues) {
      ticks = props.tickValues;
    } else if (scale.ticks) {
      ticks = scale.ticks.apply(scale, props.tickArguments);
    } else {
      ticks = scale.domain();
    }

    if (props.tickFormatting) {
      tickFormat = props.tickFormatting;
    } else if (scale.tickFormat) {
      tickFormat = scale.tickFormat.apply(scale, props.tickArguments);
    } else {
      tickFormat = function (d) { return d; };
    }

    let maxTicksLength = 0;

    for (var i = 0; i < ticks.length; i++) {
      if (typeof ticks[i] === 'string' && ticks[i].length > maxTicksLength) {
        maxTicksLength = ticks[i].length;
      }
    }

    adjustedScale = scale.rangeBand ? function (d) { return scale(d) + scale.rangeBand() / 2; } : scale;

    switch (props.orient) {
    case 'top':
      tr = function (tick) {
        return 'translate(' + adjustedScale(tick) + ',0)';
      };
      textAnchor = 'middle';
      y2 = props.innerTickSize * sign;
      y1 = tickSpacing * sign;
      dy = sign < 0 ? '0em' : '.71em';
      break;
    case 'bottom':
      tr = function (tick) {
        return 'translate(' + adjustedScale(tick) + ',0)';
      };
      textAnchor = 'middle';
      y2 = props.innerTickSize * sign;
      y1 = tickSpacing * sign;
      dy = sign < 0 ? '0em' : '.71em';
      break;
    case 'left':
      tr = function (tick) {
        return 'translate(0,' + adjustedScale(tick) + ')';
      };
      textAnchor = 'end';
      x2 = props.innerTickSize * -sign;
      x1 = tickSpacing * -sign;
      dy = '.32em';
      break;
    case 'right':
      tr = function (tick) {
        return 'translate(0,' + adjustedScale(tick) + ')';
      };
      textAnchor = 'start';
      x2 = props.innerTickSize * -sign;
      x1 = tickSpacing * -sign;
      dy = '.32em';
      break;
    }

    return (
      <g>
        {ticks.map(function (tick, idx) {
          return (
            <g key={idx} className='tick' transform={tr(tick)} >
              <line
                style={{
                  shapeRendering: 'crispEdges',
                  strokeWidth: 2,
                  stroke: props.tickStroke
                }}
                x2={x2}
                y2={y2}
              >
              </line>
              <g>
                <title>{tickFormat(tick)}</title>
                <text
                  strokeWidth='0.01'
                  dy={dy} x={x1} y={y1}
                  textAnchor={maxTicksLength > 10 ? 'end': textAnchor}
                  transform={maxTicksLength > 10 ? 'rotate(-30)': ''}
                  style={{
                    fontSize: `${props.tickFontSize}px`,
                    stroke: props.tickTextStroke,
                    fill: props.tickTextStroke
                  }}
                >
                {trimLabel(tickFormat(tick))}
                </text>
              </g>
            </g>
          );
        })
        }
      </g>
    );
  }
});
