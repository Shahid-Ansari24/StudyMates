const express = require("express");
const router = express.Router();

const {
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    updateDisplayPicture,
    intructorDashboard
} = require("../controllers/Profile");

const { auth } = require("../middleware/auth");


router.put('/updateprofile', auth, updateProfile);
router.post('/deleteaccount', auth, deleteAccount);
router.get('/getuserdetails', auth, getAllUserDetails);
router.put('/updatedisplaypicture', auth, updateDisplayPicture);
router.put('/intructorDashboard', auth, intructorDashboard);

module.exports = router;