import React from 'react';
import { debounce } from '../common/debounce';

export let Line = React.createClass({

  displayName: 'Line',

  propTypes: {
    path: React.PropTypes.string,
    stroke: React.PropTypes.string,
    eventBus: React.PropTypes.object,
    clickHandler: React.PropTypes.func,
    activeLabel: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      stroke: 'tomato',
      eventBus: {emit: function () {}},
      clickHandler: function () {},
      activeLabel: null
    };
  },

  componentWillMount: function () {
    this.lineMouseOver = debounce((label) => {
      this.props.eventBus.emit('highlight', label);
    }, 20);

    this.lineMouseOut = debounce(() => {
      this.props.eventBus.emit('highlight', '');
    }, 20);
  },

  render: function() {
    let props = this.props;

    let label = props.data.name;

    let active = label === props.activeLabel;

    let onClick = function () {
      // props.clickHandler(props.data);
    };

    let onMouseOver = function () {
      this.lineMouseOver(label, props.data);
    }.bind(this);

    let onMouseOut = function () {
      this.lineMouseOut();
    }.bind(this);

    return (
      <path
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
        d={props.path}
        strokeWidth={active ? '2px':'1.5px'}
        stroke={active ? 'rgba(255,0,0,1)': props.stroke}
        fill='none'
      />
    );
  }

});

