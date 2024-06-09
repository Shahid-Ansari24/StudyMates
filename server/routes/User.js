const express = require("express");
const router = express.Router();

const {
    login,
    sendOTP,
    signUp,
    changePassword
} = require("../controllers/Auth");

const {
    resetPasswordToken,
    resetPassword
} = require('../controllers/ResetPassword');



const { auth } = require("../middleware/auth");

router.post('/signup', signUp);
router.post('/login', login);
router.post('/sendotp', sendOTP);
router.post('/changepassword', auth, changePassword);


router.post('/reset-password-token', resetPasswordToken);
router.post('/resetpassword', resetPassword);



module.exports = router;