
import calendar from "./appcalendar";
let moment = require('moment');

const CalendarService ={
    /**
     * Get calendars
     * @param {string} userID
     * @returns {Calendar[]} ;
     */
    GetCalendarList :  async function(userID ){
        console.log("what is calendar", calendar);
        // if (!calendar && !calendar.ID) throw 'No Calendar ID, How am i suppose to get events if there is no calender guy';
      
        // http call goes here passing the userID

        let appCalendars = [calendar];

        appCalendars = appCalendars.map( (calendar) =>{
            calendar.Events = calendar.Events.map( event => {
                return {
                    id : event.ID,
                    title : event.Title,
                    start : new Date(event.Start),
                    allday : event.AllDay,
                    end : new Date(event.End)
                }
                ;
            })
            return calendar;
        })

        console.log("new cal", appCalendars);
        

        //TODO: Remove and set up Call to  app calendar integration     
        return await appCalendars ;
    }
}

export default CalendarService;


