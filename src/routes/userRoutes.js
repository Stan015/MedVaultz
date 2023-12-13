const express = require('express');
const {
  patientSignup,
  patientLogin,
  practitionerSignup,
  practitionerLogin,
  createDID,
} = require('../controllers/authController');
const router = express.Router();

router.post('/patient-signup', patientSignup);
router.post('/patient-login', patientLogin);
router.post('/practitioner-signup', practitionerSignup);
router.post('/practitioner-login', practitionerLogin);
router.patch('/did', protect, createDID);

router.module.exports = router;
