const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require("otp-generator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require("../utils/mailSender");
require('dotenv').config();


// sendOTP
exports.sendOTP = async (req, res) => {

    try {
        // fetch email from req.body
        const {email} = req.body;

        // check if user already exist
        const checkUserPresent = await User.findOne({email});

        // if user already exist, then return a message
        if(checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }

        // generate a OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated: ", otp);

        // check unique otp or not
        let result = await OTP.findOne({otp: otp});

        while(result) {
            otp = otpGenerator(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        // create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}



// sign up
exports.signUp = async(req, res) => {
    try {

        // data fetch from request body
        const {
            firstName,
            lastName,
            email, 
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;


        // validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // match both password i.e password and confirmPassword
        if( password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password value does not match, please try again",
            })
        }


        // check user already exist or not
        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                status: false,
                message: "User is already registered",
            })
        }


        // find most recent OTP for the user
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log(recentOtp);

        // validate OTP
        if(recentOtp.length == 0) {
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP Not Found",
            });
        }
        else if(otp !== recentOtp[0].otp) {
            // Invalid OTP
            console.log("otp:", otp);
            console.log("email: ", email);
            console.log("recentOtp: ", recentOtp.otp);
            console.log("recentOtp", recentOtp);
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Hash the Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry in DB
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`,

        });

        // return response
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user,
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again",
        });
    }
}



// login
exports.login = async( req, res ) => {
    try {
        // get data from req body
        const { email, password } = req.body;

        // validation of data 
        if(!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }

        // check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please sign up first",
            });
        }


        // generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)) {
            
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };

            // console.log("user.accountType: ", user.accountType);

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                                                        expiresIn: "2h"
                                                    });
            
            user.token = token;
            user.password = undefined;
            
            console.log("token---", user.token)

            // create cookie and send request
            
            const option = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            };

            res.cookie("token", token, option).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In Successfully",
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, please try again',
        });
    }
}


// changePassword
exports.changePassword = async( req, res ) => {
    try {
        // get data from body
        const userId = req.user.id;

        // get oldPassword, newPassword, confirmPassword
        const {oldPassword, newPassword, confirmPassword} = req.body;

        // validation
        if(!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All Fields Are Required",
            });
        }

        const userDetails = await User.findById(userId);
        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User is not registered",
            });
        }

        const verifiedPassword = await bcrypt.compare(oldPassword, userDetails.password);

        if(!verifiedPassword) {
            return res.status(400).json({
                success: false,
                message: "Old Password not matched",
            });
        }

        // update pwd int DB
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate({_id: userId},
                                                        {password: hashedPassword});
        
        // send mail - Password updated
        const mailResponse = await mailSender(updatedUser.email, 
                                             'Password has been updated',
                                             'Do not share your new password to anyone');

        // return response
        return res.status(200).json({
            success: true,
            message: "Password has been changed",
        });
    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Unable to change password",
            error: error.message,
        });
    }
}

