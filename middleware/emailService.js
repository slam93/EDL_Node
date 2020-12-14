const config = require('../config/app');
const nodemailer = require("nodemailer");
/**
* Fonction permettant d'envoyer des email
* @param req
* @param res
* @returns {*}
*/
 async function sendmail(recipient,subject, text) {
    
    let transporter = nodemailer.createTransport({
        host: config.smtp.host,//"smtp.gmail.com",
        port: config.smtp.port,
        secure: config.smtp.secure, // true for 465, false for other ports eg 587
        auth: {
            user: config.smtp.auth.user,//'marino.oniriquefactory@gmail.com', // generated ethereal user
            pass: config.smtp.auth.pass,// // generated ethereal password
        },
    });
    try {
        let info = await transporter.sendMail({
        // from: '"Email envoi 👻" <foo@example.com>', // sender address
            from: 'GIRL and CAR<marino.oniriquefactory@gmail.com>', // sender address
        // from: 'noreply@girlandcar.fr', // sender address
            //to: "bobscarterscarter@gmail.com, tsiparaymario@gmail.com", // list of receivers
            to: recipient,
            subject: subject, //"Inscription sur Girl and car", // Subject line
        // text: "VOICI LES DONNES", // plain text body
            html: text,
        });

        if(info){
            return Promise.resolve(true);
        }
    } catch (err) {
        console.log(err)
       // callback({status:"ERROR",message: err});
    }
}

module.exports = { sendmail };
