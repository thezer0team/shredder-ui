
const axios = require('axios');

export const appCalendarURL = 'theURlOfIntegration';



/** Returns appCalHttpService 
 * Look at axios git hub to see different ways to configure, like updating Auth headers, and sepecifying return types.
*/
export default function configureHttpRequest(){
    //create an instance of axios and set with all the configurations
    return  axios.create({
        baseURL: appCalendarURL
    });

}