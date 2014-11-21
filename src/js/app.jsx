var React = require('react');
var Calendar = require('./Calendar.jsx');
var CalendarControls = require('./CalendarControls.jsx');
var moment = require('moment');

var CalendarPicker = React.createClass({
  getInitialState: function() {
    return {
      date: moment()
    };
  },

  nextMonth: function() {
    return moment(this.state.date).add(1, 'months');
  },

  next: function() {
    this.setState({date: this.state.date.add(1, 'months')});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract(1, 'months')});
  },

  render: function() {
    return <div className="calendar-component">
      <div className="clndr">
        <CalendarControls date={this.state.date} onNext={this.next} onPrev={this.prev} />
        <Calendar date={this.state.date} />
      </div>
      <div className="clndr">
        <CalendarControls date={this.nextMonth()} onNext={this.next} onPrev={this.prev} />
        <Calendar date={this.nextMonth()} />
      </div>
    </div>;
  }
});

React.render(
  <CalendarPicker />,
  document.getElementById('calendar')
);
