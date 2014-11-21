'use strict';

var React = require('react/addons');

var Day = React.createClass({

  getDefaultProps: function() {
    return {
      classes: ''
    };
  },

  render: function() {
    var classes = React.addons.classSet({
      'selected-day': this.props.selected
    });
    return (
      <div onClick={this.props.select} className={classes}>
        <span className='day-number'>{this.props.day.day.date()}</span>
      </div>
    );
  }
});

module.exports = Day;
