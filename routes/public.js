const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const authValidation = require('../validations/auth')
const front = require('../front/home')
// import controller
// const auth = require('../controllers/auth');
// const singin = require('../controllers/singin');

// router
// router.route('/auth/login').post(validate(authValidation.loginParam), auth.login);
// router.route('/singin').post(validate(authValidation.singinParam), singin.singin);

router.get('/front', front.page);
router.get('/front/*', front.pagedir);

module.exports = router;
