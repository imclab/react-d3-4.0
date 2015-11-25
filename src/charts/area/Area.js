import React, { PropTypes } from 'react';

export let Area = React.createClass({

  propTypes: {
    data: PropTypes.array,
    path: PropTypes.string,
    fill: PropTypes.string,
    opacity: PropTypes.number,
    activeID: PropTypes.number
  },

  getDefaultProps: function() {
    return {
      fill: 'tomato',
      opacity: 0.9,
      activeLabel: null
    };
  },

  render: function() {
    let props = this.props;

    let active = props.data.value === props.activeID;

    return (
      <path
        className="viz area"
        d={props.path}
        data={props.data}
        fill={active ? 'red': props.fill}
        opacity={props.opacity}
      />
    );
  }
});
