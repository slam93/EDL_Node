const config = require('../config/app');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const Hash = require('crypto-js/pbkdf2');
const { sendmail } = require('../middleware/emailService');

function singin(req, res) {
    // For pool initialization, see above

    pool.getConnection(function(err, conn) {
        var insert = {'username': req.body.username,
                    'first_name': req.body.first_name,
                    'last_name': req.body.last_name,
                    'email':  req.body.email,
                    'role': req.body.role,
                    'enabled': 1,
                    'createdAt':new Date(),
                    'updatedAt':new Date(),
                    'password':  Hash(req.body.password, config.appSecret).toString()};

        conn.query('INSERT INTO users SET ?', insert, async function (error, results, fields) {
            if (error) throw error;
            pool.releaseConnection(conn);
            //const sendmailpromise = await sendmail(insert);
            var text =  "<b> Salut " + req.body.username + "</b> Vous venez de vous inscrire sur girl and car";
            var subject = "Inscription sur Girl and car";
            const sendmailpromise = sendmail(req.body.email,subject,text);
            if (sendmailpromise){
                console.log('ok', sendmailpromise);
            }else{
                console.log('erreur', sendmailpromise);
            }

            res.json({
                message: "creation success",
                data: results
            });
        });
    })

}



module.exports = { singin };
