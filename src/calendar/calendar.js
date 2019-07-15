import React, { Component } from "react";
// import PropTypes from "prop-types";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment);
let testEvents = [
  {
    title: "Coding very long name",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    allDay: true,
    titleAccessor: "we doing this",
    tooltipAccessor: "tipsAccessor"
  },
  {
    title: "ya done know coding very long name",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    allDay: false
  }
];
class AppCalendar extends Component {
  state = {};

  render() {
    return (
      <div style={{ height: "80vh" }}>
        <h1>Calendar goes here</h1>
        <Calendar
          localizer={localizer}
          events={testEvents}
          toolbar={true}
          popup={true}
          popupOffset={100}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    );
  }
}

// Calendar.prototype = {
//   calendar: PropTypes.object.isRequired
// };

export default AppCalendar;
