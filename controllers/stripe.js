const config = require('../config/app');
const { selogger } = require('./fonctionredondant');
const jwt = require('jsonwebtoken')
const { pool } = require('../config/db');
const Hash = require('crypto-js/pbkdf2');
const { sendmail } = require('../middleware/emailService');

// const stripe = require('stripe')('sk_test_51HkKEpDw1x2Vtixlh36V8YmP4iT6HQSJOy29rdM6odsdjfLaJMkbjbSr9I51Ktor1FqSHp2I3bnG3gUUMqIAIIGC00HXjT4nIK');
const stripe = require('stripe')('sk_test_51HnsEBE8imONX7lNI6Wssw1yqDr9lSmVC7fc2c0M2l53kpIhZ8bbhel5mMb3B1cLB5jLWlWkJpMRw6YNAjlnyCPS00Tdmnlp1t');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function order(req, res, next) {

    console.log(['request order', req.body]);
    const stripeToken = req.body.stripeToken;
    const priceInPence = req.body.prix * 100;

    stripe.charges.create({
        amount: priceInPence,
        currency: 'usd',
        source: stripeToken,
        capture: false,  // note that capture: false
        }).then((chargeObject) => {
        
            console.log(chargeObject);
            res.status(200).json(chargeObject).end();
            stripe.charges.capture(chargeObject.id)
            .then(res => res)
            .catch(err => err)
        
        }).catch(error => {
        console.log('Errreur catch ... ');
    });
}

module.exports = {
    order
};
