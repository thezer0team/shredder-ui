import React, { Component } from "react";
// import PropTypes from "prop-types";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import CalendarService from "./calendar-service";
import {Modal, Popover, Input, Button} from 'antd';
import {reject} from 'lodash';
const localizer = momentLocalizer(moment);



function Event  ({event }){

  console.log("here is event",event, "heere is remove", )
 
 return (
   <Popover placement="left" title={event.title} trigger="click"> 
          <div style={{height:'100%'}}>
            <span>{event.title} </span> 
          </div>
      </Popover>
  )
}
// content={PopOverContent} 

// class CustomEvent extends Component{
//   constructor(props) {
//     super(props);
//        this.state = {event : props.event , remove:props.remove, modalEditState: false, confirmLoading:false, SelectedSlotEvent:{title:null}, SelectedEditEvent:{title:null}};
//   }
//       render(){
//         if(this.state.event){
//           console.log("here is event",this.state.event, "heere is remove", this.state.remove)
//           return( <Popover placement="left" trigger="click"> 
//               <div style={{height:'100%'}}>
//               <span>{this.state.event.title} </span> 
//               </div>
//           </Popover>)
//         }

//       }

// }

// remove={remove}
// const PopOverContent = (props)=>(
 

// )
// const CustomEventContainer = ({remove}) => props => {
//     return (
//       <Popover content={PopOverContent} title={props.event.title}  placement="left" trigger="click"> 
//         <CustomEvent event={props} remove={remove} />
//         </Popover>
       
   
//     )
// }
// content={PopOverContent}  

class CustomEvent extends Component{
    render() {
      const { event, remove} = this.props
      let PopoverContent =  (<div style={{width: '250px'}}>
      <Button type="danger" shape="circle" icon="delete" size='default' onClick={remove}   /> 
      <h1>heelloo</h1>
  </div>)
      return(
        <Popover content={PopoverContent}   title={event.title}  placement="left"> 
          <div style={{height:'100%'}}>
            <span>{event.title} </span>
          </div>
         </Popover>
      )

   } 
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
    }, 500)
  };

  handleCancel = e => {
    this.setState({
      modalCreateState: false,
      modalEditState: false,
    })
  };

//**** Handle EDIT Event Modal *//////////////////////////
handleSelectedEvent = (event) => {
    this.setState({
      SelectedEditEvent: event
    })
  } 
  
  handleDeleteEvent = () =>{
    console.log("b4", this.state.Events);
    let updatedEvents = reject(this.state.Events, (ev) => ev.title === this.state.SelectedEditEvent.title )
    console.log("new events", updatedEvents);
    this.setState({
      Events: updatedEvents
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
         
          <Calendar
            selectable
            components={
              {
                // event:Event
                // event: CustomEventContainer({remove: this.handleDeleteEvent})
                event: props=>(<CustomEvent {...props} remove= {this.handleDeleteEvent}/>) 

            }
          }
            localizer={localizer}
            events={ this.state.Events}
            toolbar={true}
            popup={true}
            popupOffset={100}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={this.handleSelectedEvent}
            onSelectSlot={this.handleSelectSlot}
          >
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
