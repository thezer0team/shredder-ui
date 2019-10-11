import React, { Component } from "react";
// import PropTypes from "prop-types";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CalendarService from "./calendar-service";
import {Modal, Popover, Input} from 'antd';
const localizer = momentLocalizer(moment);

const PopOverContent = (
  <div style={{width: '250px'}}>
      <p> Edit</p>
      
  </div>
)



function  Event({event}) {
  return (
    <Popover content={PopOverContent} title={event.title} placement="left" trigger="click"> 
      <div style={{height:'100%'}}>
        <span>{event.title} </span> 
      </div>
    </Popover>
  )
}

class AppCalendar extends Component {

  constructor(props) {
    super(props);
       this.state = {calendar : null , modalCreateState:false, modalEditState: false, confirmLoading:false, SelectedSlotEvent:{title:null}, SelectedEditEvent:{title:null}};
  }

  componentDidMount(){
    console.log("what is state", this.state.calendar);
    return CalendarService.GetCalendarList().then( calendar =>  this.setState({Events: calendar.Events, CalendarSources: calendar.Calendars, CalendarInfo: { ID: calendar.ID, UserID: calendar.UserID, Name: calendar.Name}  }));
  }

  handleSelectSlot = (event) => {
    event.title = null;
    this.setState({
      SelectedSlotEvent: event,
    }) 
    this.showCreateModal(event)
  }
  ////** Create Modal *////////////////////////////////////

  showCreateModal = () =>{
    this.setState({
      modalCreateState: true,
    })
  }

  handleNameChange = (e) => {
    let eventCopy = this.state.SelectedSlotEvent;
    eventCopy.title = e.target.value;
    this.setState({
      SelectedSlotEvent: eventCopy,
    })
  }

  handleOk = (e) => {
    this.setState({
      confirmLoading: true,
    });
    // mimic a async call to server by setting time out to see the loading indicator
    setTimeout(()=>{
      CalendarService.CreateEvent(this.state.SelectedSlotEvent).then( createdEvent =>{ 
        this.setState({
          Events: [
            ...this.state.Events,
            createdEvent,
          ],
          modalCreateState:false,
          confirmLoading:false,
  
        });
      });
    }, 2000)
  };

  handleCancel = e => {
    this.setState({
      modalCreateState: false,
      modalEditState: false,
    })
  };

//**** Handle EDIT Event Modal *//////////////////////////
handleSelectedEvent = (event) => {
  debugger;
    this.setState({
      SelectedEditEvent: event
    })
    this.showEditModal(event)
  } 
  
  showEditModal = () => {
    this.setState({
      modalEditState: true,
    })
  }

  handleEditOk = (e) => {
    this.setState({
      confirmLoading: true,
    });

    setTimeout(()=>{
      // CalendarService.CreateEvent(this.state.SelectedSlotEvent).then( createdEvent =>{ 
        this.setState({
          // Events: [
          //   ...this.state.Events,
          //   createdEvent,
          // ],
          modalEditState:false,
          confirmLoading:false,
  
        });
      // });
    }, 2000)
  }

  render() {
    const { confirmLoading } = this.state;
    if(this.state.Events){
      return (
        <div style={{ height: "80vh" }}>
          <h1>Shredder UI</h1>
           
          <Modal
            title="Create an Event"
            visible={this.state.modalCreateState}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}>
              <Input value={this.state.SelectedSlotEvent.title} onChange={this.handleNameChange} placeholder="Event Title" />
          </Modal>
         
          <Modal
            title="Edit an Event"
            visible={this.state.modalEditState}
            onOk={this.handleEditOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}>
              {this.state.SelectedEditEvent.title}
          </Modal>
         

          <Calendar
            selectable
            components={{
              event:Event
            }}
            localizer={localizer}
            events={ this.state.Events}
            toolbar={true}
            popup={true}
            popupOffset={100}
            startAccessor="start"
            endAccessor="end"
            // onSelectEvent={this.handleSelectedEvent}
            onSelectSlot={this.handleSelectSlot}
          >
           <Popover placement="left" trigger="click">
           </Popover>
          </Calendar>
         

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
