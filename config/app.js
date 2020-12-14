require('dotenv').config();

var env = process.env.NODE_ENV || 'development';


config = {
    // App env
    env: process.env.NODE_ENV,
    
    // App debug mode
    debug: process.env.DEBUG ? process.env.DEBUG === 'true' : true,
    
    // App secret for password encoding
    appSecret: process.env.APP_SECRET || "itsverysecret",

    // Server port
    port: process.env.SERVER_PORT || 3000,
    
    // JWT secret
    jwtSecret: process.env.JWT_SECRET || "itsverysecret",
    
    // JWT expire time in seconds
    jwtExpire: parseInt(process.env.JWT_EXPIRE, 10) || 3600,

    // url utiliser
    baseUrl: process.env.APP_ENDPOINT || 'http://localhost:3000/',

    smtp:{
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports eg 587
        auth: {
            user: 'marino.oniriquefactory@gmail.com', // generated ethereal user
            pass: '321qweRTY*', // generated ethereal password
        }
    }
}


module.exports = config;