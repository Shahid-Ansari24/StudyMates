const express = require("express");
const router = express.Router();

const {
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    updateDisplayPicture
} = require("../controllers/Profile");

const { auth } = require("../middleware/auth");


router.put('/updateprofile', auth, updateProfile);
router.post('/deleteaccount', auth, deleteAccount);
router.get('/getuserdetails', auth, getAllUserDetails);
router.put('/updatedisplaypicture', auth, updateDisplayPicture);

module.exports = router;