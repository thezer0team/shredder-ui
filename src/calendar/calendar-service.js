
import shredder from "./appcalendar";
import AppEvent from "./appEvent";
let moment = require('moment');

const CalendarService ={
    /**
     * Get calendars
     * @param {string} userID
     * @returns {Calendar[]} ;
     */
    GetCalendarList :  async function(userID ){
        console.log("what is calendar", shredder);
        // if (!calendar && !calendar.ID) throw 'No Calendar ID, How am i suppose to get events if there is no calender guy';
      
        // http call goes here passing the userID

        let appCalendar = shredder;
        //manipulating event object in order to map to react-big-calendar event display :TODO research if I can configure what the event properties are. 
        appCalendar.Events = appCalendar.Events.map( (event) =>{
            return {
                id : event.ID,
                title : event.Title,
                start : new Date(event.Start),
                allday : event.AllDay,
                end : new Date(event.End)
            }
        })

        console.log("new cal", appCalendar);
        

        //TODO: Remove and set up Call to  app calendar integration     
        return await appCalendar ;
    },

    CreateEvent: async function( event){
        // create an event for api, then have it formatted for the front end.  
        //might need an adapter pattern for this. 
        let Event =  new AppEvent( event.title, event.start, event.end ); 
        console.log("here is the event", Event)
        return this.MapEventDataForDisplay(Event);
        //send to api
        //take response map it for front end
        //send back to user
    }, 

    /** HELPERS */
   MapEventDataForDisplay(event){
       let feEvent = {
           title: event.Title,
           start: event.Start,
           end: event.End
       }
        return feEvent
    }, 
}

export default CalendarService;


