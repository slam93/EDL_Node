const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const uploads = require("../middleware/uploadImage");

// import controller
const auth = require('../controllers/auth');
const user = require('../controllers/user');
const appartement = require('../controllers/appartement');
const signalisation = require('../controllers/signalisation');
const certification = require('../controllers/certification');

router.get('/auth/me', authenticate, auth.me);
router.post('/getQrCodeAppartement',appartement.getQrCodeAppartement);
router.get('/getAppartementNum/:numeros',appartement.getAppartementNum);
router.get('/getAppartementId/:id',appartement.getAppartementId);
router.post('/inscription',user.inscription);
router.post('/reinitialisation',user.reinitialisation);
router.post('/addSignalisation',signalisation.signalisation);
router.post('/getSignalisationType',signalisation.getSignalisationType);
router.post('/getSignalisation',signalisation.getSignalisation);
router.post('/deleteSignalisation',signalisation.deleteSignalisation);
router.post('/addCertification',certification.certification);
router.post('/getCertificationType',certification.getCertificationType);


//router.post('/interventions/addInterventions', authenticate, intervention.addInterventions);

module.exports = router;
