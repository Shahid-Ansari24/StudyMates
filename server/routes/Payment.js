const express = require('express');
const router = express.Router();

const {
    capturePayment,
    verifySignature
} = require('../controllers/Payments');


const { auth } = require("../middleware/auth");

router.post('/capturepayment', auth, capturePayment);
router.post('/verifysignatre', auth, verifySignature);

module.exports = router;
