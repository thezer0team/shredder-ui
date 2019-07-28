import React, { Component } from "react";
// import PropTypes from "prop-types";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CalendarService from "./calendar-service";
const localizer = momentLocalizer(moment);
class AppCalendar extends Component {

  constructor(props) {
    super(props);
       this.state = {calendars : null};
  }

  componentDidMount(){
    console.log("what is state", this.state.calendars);
    return CalendarService.GetCalendarList().then( calendars =>  this.setState({calendars: calendars }));
  }
  
  render() {
    if(this.state.calendars){
      return (
        <div style={{ height: "80vh" }}>
          <h1>Calendar goes here</h1>
          <Calendar
            localizer={localizer}
            events={ this.state.calendars[0].Events}
            toolbar={true}
            popup={true}
            popupOffset={100}
            startAccessor="start"
            endAccessor="end"
          />
        </div>
      );
    }
    else{
      return (<div><h1>loading</h1></div>)
    }
  }
}

// Calendar.prototype = {
//   calendar: PropTypes.object.isRequired
// };

export default AppCalendar;
