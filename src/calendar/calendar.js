import React, { Component } from "react";
// import PropTypes from "prop-types";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CalendarService from "./calendar-service";
const localizer = momentLocalizer(moment);
class AppCalendar extends Component {

  constructor(props) {
    super(props);
       this.state = {calendar : null};
  }

  handleSelect = (event) => {
    debugger;
    console.log(event);
    // map to the event that we have-  
   
    const title = window.prompt('New Event name')
    event.title = title;
    CalendarService.CreateEvent(event).then( createdEvent =>{ 
      this.setState({
        Events: [
          ...this.state.Events,
          createdEvent,
        ],
      })
    })

  }

  componentDidMount(){
    console.log("what is state", this.state.calendar);
    return CalendarService.GetCalendarList().then( calendar =>  this.setState({Events: calendar.Events, CalendarSources: calendar.Calendars, CalendarInfo: { ID: calendar.ID, UserID: calendar.UserID, Name: calendar.Name}  }));
  }
  
  render() {
    if(this.state.Events){
      return (
        <div style={{ height: "80vh" }}>
          <h1>Calendar goes here</h1>
          <Calendar
            selectable
            localizer={localizer}
            events={ this.state.Events}
            toolbar={true}
            popup={true}
            popupOffset={100}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={ event => alert(event.title)}
            onSelectSlot={this.handleSelect}
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
