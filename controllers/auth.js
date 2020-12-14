const config = require('../config/app');
const { selogger } = require('./fonctionredondant');
const jwt = require('jsonwebtoken')
const { pool } = require('../config/db');
const Hash = require('crypto-js/pbkdf2');
const { sendmail } = require('../middleware/emailService');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function resetPassword(req, res) {
    pool.getConnection(function (err, conn) {
        conn.query('SELECT * FROM users where email = ?', [req.body.email], (err, response, fields) => {
            pool.releaseConnection(conn);
            if (!err && response) {

                updateMotdepasse(req, function (result) {
                    if (result.status == "OK") {
                        //envoie email
                        var text = "<b> Salut " + response[0].username + "</b> voici vos nouveaux identifiants sur GirlAndCars login : <b> " + response[0].email + "</b> Mot de passe : <b> " + result.newPass + "</b>  ";
                        var subject = "Reinitialisation mot de passe sur GirlAndCars";
                        const sendmailpromise = sendmail(response[0].email, subject, text);
                        if (sendmailpromise) {
                            res.json({
                                status: "OK", message: "un nouveau mot de passe PROVISOIRE a ete envoyer  a vore adresse email",
                            });
                        } else {
                            res.json({
                                status: "ERROR", message: "une erreur s'est produit lors de l'envoie de mail",
                            });
                        }
                    } else {
                        res.json({
                            status: "ERROR", message: result.message,
                        });
                    }

                });

            } else {
                res.json({ error: true, message: "cet email n'existe pas dans la base de donnee GirlAndCars" });
            }
        });
    });
}
/**
 * 
 */
function updateMotdepasse(req, callback) {

    const passLisible = Math.random().toString(36).slice(-8);
    const newPass = Hash(passLisible, config.appSecret).toString();
    /////////////
    pool.getConnection(function (err, conn) {
        //console.log(req.body.email);
        conn.query("UPDATE users\n" +
            "SET password = '" + [newPass] + "' \n" +
            "WHERE email = ? ", [req.body.email], (err, response, fields) => {
                pool.releaseConnection(conn);
                if (!err && response) {
                    console.log('rresponse', response);
                    callback({
                        status: "OK",
                        newPass: passLisible,
                    });
                } else {
                    console.log(err);
                    callback({
                        status: "ERROR", message: err
                    });
                }
            });
    });
}
/**
* Returns jwt token if valid email and password is provided
* @param req
* @param res
* @returns {*}
*/
function getifemailexist(req, res) {

    pool.getConnection(function (err, conn) {
        conn.query('SELECT email FROM users where email = ?', [req.body.email], (err, response, fields) => {
            pool.releaseConnection(conn);
            if (!err && response) {
                res.json({
                    emaillength: response.length,
                });
            } else {
                res.json({ error: true });
            }
        });
    });
}


function editUserToInsertFbOrGoogle(req, res) {
    if ([req.body.provider] == 'GOOGLE') {
        console.log('ato1')
        pool.getConnection(function (err, conn) {
            conn.query("UPDATE users\n" +
                "SET provider = '" + [req.body.provider] + "',\n" +
                " idgoogle = '" + [req.body.identification] + "',\n" +
                " firstnamegoogle = '" + [req.body.firstName] + "',\n" +
                " lastnamegoogle = '" + [req.body.lastName] + "'\n" +

                "WHERE email = ?", [req.body.email], (err, response, fields) => {
                    pool.releaseConnection(conn);
                    if (!err && response) {
                        selogger(req, res, 'GOOGLE');
                        /* res.json({
                             success : true,
                             result : 'modified google',
                         });*/
                    } else {
                        res.json({ error: true, message: err });
                    }
                });
        });
    } else {
        console.log('ato2');
        pool.getConnection(function (err, conn) {
            conn.query("UPDATE users\n" +
                "SET provider = '" + [req.body.provider] + "',\n" +
                " idfacebook = '" + [req.body.identification] + "',\n" +
                " firstnamefb = '" + [req.body.firstName] + "',\n" +
                " lastnamefb = '" + [req.body.lastName] + "'\n" +
                "WHERE email = ?", [req.body.email], (err, response, fields) => {
                    pool.releaseConnection(conn);
                    if (!err && response) {
                        selogger(req, res, 'FACEBOOK');
                        /*
                        res.json({
                            success : true,
                            result : 'modified facebook',
                        });*/
                    } else {
                        res.json({ error: true, message: err });
                    }
                });
        });
    }
}

function convertDate(date) {
    let year = date.getFullYear()
    let montth = date.getMonth()
    let day = date.getDay()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconde = date.getSeconds()
    return (year + '-' + montth + '-' + day + ' ' + hour + ':' + minutes + ':' + seconde)
}

function addUserToInsertFbOrGoogle(req, res) {
    let date = new Date()
    if ([req.body.provider] == 'GOOGLE') {
        console.log('ato1')
        pool.getConnection(function (err, conn) {
            conn.query("INSERT INTO users \n" +
                "(provider, idgoogle, firstnamegoogle, lastnamegoogle, username, email, enabled, createdAt, updatedAt) VALUES ('" + [req.body.provider]
                + "'," + [req.body.identification]
                + ",'" + [req.body.firstName]
                + "','" + [req.body.lastName]
                + "','" + [req.body.username]
                + "','" + [req.body.email]
                + "','" + [req.body.enabled]
                + "','" + convertDate(date)
                + "','" + convertDate(date)
                + "');"
                , (err, response, fields) => {
                    pool.releaseConnection(conn);
                    if (!err && response) {
                        selogger(req, res, 'GOOGLE');
                        /* res.json({
                             success : true,
                             result : 'added google',
                         });*/
                    } else {
                        res.json({ error: true, message: err });
                    }
                });
        });
    } else {
        console.log('ato2');
        pool.getConnection(function (err, conn) {
            conn.query("INSERT INTO users \n" +
                "(provider, idfacebook, firstnamefb, lastnamefb, username, email, enabled, createdAt, updatedAt) VALUES ('" + [req.body.provider]
                + "'," + [req.body.identification]
                + ",'" + [req.body.firstName]
                + "','" + [req.body.lastName]
                + "','" + [req.body.username]
                + "','" + [req.body.email]
                + "','" + [req.body.enabled]
                + "','" + convertDate(date)
                + "','" + convertDate(date)
                + "');"
                , (err, response, fields) => {
                    pool.releaseConnection(conn);
                    if (!err && response) {
                        selogger(req, res, 'FACEBOOK');
                        /* res.json({
                             success : true,
                             result : 'added fb',
                         });*/
                    } else {
                        res.json({ error: true, message: err });
                    }
                });
        });
    }
}


function login(req, res) {
    // For pool initialization, see above
    selogger(req, res, 'NORMAL');
}


/**
* Returns user info
* @param req
* @param res
* @returns {*}
*/
function me(req, res) {
    res.json({
        message: "success",
        data: req.user
    });
}

module.exports = {
    login,
    me,
    getifemailexist,
    editUserToInsertFbOrGoogle,
    addUserToInsertFbOrGoogle,
    resetPassword,
    updateMotdepasse
};
