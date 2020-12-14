const express = require('express');
const apiRouter = require('./api');
const publicRouter = require('./public');

const router = express.Router();

router.use('/', apiRouter);
router.use('/', publicRouter);

module.exports = router;
