const config = require('../config/app');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const Hash = require('crypto-js/pbkdf2');


function selogger(req,res,provider){
    pool.getConnection(function(err, conn) {
        // Do something with the connection
        conn.query('SELECT id, email, password FROM users where email = ?', [req.body.email], (err, response, fields) => {
            console.log('res log',response);
            if(!err && response.length === 1){
                const user = response[0];
                const sign = {
                    exp: Math.floor(Date.now() / 1000) + config.jwtExpire, // expire time
                    sub: user.id,                                          // Identifies the subject of the JWT.
                };
                if(provider === 'GOOGLE'){
                    // Don't forget to release the connection when finished!
                    pool.releaseConnection(conn);
                    res.json({
                        message: "success",
                        provider: "GOOGLE",
                        data: jwt.sign(sign, config.jwtSecret)
                    });
                }else if(provider === 'FACEBOOK'){
                    pool.releaseConnection(conn);
                    res.json({
                        message: "success",
                        provider: "FACEBOOK",
                        data: jwt.sign(sign, config.jwtSecret)
                    });
                } else {
                    const passwordInput = Hash(req.body.password, config.appSecret).toString();
                    if(user.password !== passwordInput){
                        pool.releaseConnection(conn);
                        res.json({
                            message: "password not same",
                        });
                    } else {
                        pool.releaseConnection(conn);
                        res.json({
                            message: "success",
                            data: jwt.sign(sign, config.jwtSecret)
                        });
                    }
                }
            }else if (!err && response.length === 0){
                pool.releaseConnection(conn);
                res.json({
                    message: "user not in db",
                });
            }
            else{
                // Don't forget to release the connection when finished!
                pool.releaseConnection(conn);
                res.status(401).send({error: 'Unauthorized', message : 'Authentication failed'});
            }
        });
    })
}



module.exports = { selogger };
