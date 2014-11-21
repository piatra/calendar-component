'use strict';

var React = require('react');
var moment = require('moment');
var Day = require('./Day.jsx');

var WeekDays = React.createClass({
  renderWeekDay: function(day) {
    return <div className='week-day'>
      <span>{day}</span>
    </div>;
  },

  render: function() {
    return <div>{[
      "M",
      "T",
      "W",
      "T",
      "F",
      "S",
      "S"
    ].map(this.renderWeekDay)}
  </div>;
  }
});

var Calendar = React.createClass({

  getDefaultProps: function() {
    return {
      weekOffset: 0,
      lang: 'en',
      forceSixRows: false,
    };
  },

  getInitialState: function() {
    return {
      date: moment(),
      selectedDays: []
    };
  },

  selectDay: function(idx) {
    this.setState({selectedDays: this.state.selectedDays.concat(idx)});
  },

  createDay: function(day) {
    return {
      day: day.date(),
      date: day
    };
  },

  /**
   * Return an array of days for the current month
   */

  days: function() {
    var days = [];
    var date = this.props.date.startOf('month');
    var diff = date.weekday() - this.props.weekOffset;
    if (diff < 0) diff += 7;

    var i;
    for (var i = 0; i < diff; i++) {
      var day = moment([this.props.date.year(), this.props.date.month(), i-diff+1])
      days.push({day: day, classes: 'prev-month'});
    }

    var numberOfDays = date.daysInMonth();
    for (i = 1; i <= numberOfDays; i++) {
      var day = moment([this.props.date.year(), this.props.date.month(), i]);
      days.push({day: day});
    }

    i = 1;
    while (days.length % 7 !== 0) {
      var day = moment([this.props.date.year(), this.props.date.month(), numberOfDays+i]);
      days.push({day: day, classes: 'next-month'});
      i++;
    }

    if (this.props.forceSixRows && days.length !== 42) {
      var start = moment(days[days.length-1].date).add(1, 'days');
      while (days.length < 42) {
        days.push({day: moment(start), classes: 'next-month'});
        start.add(1, 'days');
      }
    }

    return days;
  },

  render: function() {
    var renderDay = function(day, i) {
      var selected = this.state.selectedDays.indexOf(day.day.dayOfYear());
      return <Day
              key={'day-' + i}
              day={day}
              select={this.selectDay.bind(this, day.day.dayOfYear())}
              selected={selected!==-1} />;
    };

    return (
      <div>
        <WeekDays />
        <div className='clndr-grid'>
          <div className='days'>
            {this.days().map(renderDay.bind(this))}
          </div>
          <div className='clearfix'></div>
        </div>
      </div>
    );
  }
});

module.exports = Calendar;
