import axios from 'axios';
require('dotenv').config();


const instance = axios.create({
//    baseURL: process.env.REACT_APP_HOST,
    baseURL : "https://localhost:5001/",
    withCredentials: false

})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.xsrfCookieName = "csrftoken";
instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
instance.defaults.xsrfCookieName = "csrftoken";
instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// instance.setHeaders({"X-CSRFTOKEN": 'cookie.load("csrftoken")'});


export default instance