const mailSender = require('../utils/mailSender');
require("dotenv").config();

exports.contactUs = async ( req, res ) => {
    try {
        const {firstName, lastName, email, phoneNumber, message} = req.body;
        
        if(!firstName, !lastName, !email, !phoneNumber, !message) {
            return res.json({
                success: false,
                message: "All Fields are required"
            });
        }

        const adminResponse = await mailSender(process.env.MAIL_USER, 'New Enquiry Come', `firstName: ${firstName}, lastName: ${lastName}, email: ${email}, phoneNumber: ${phoneNumber}, message: ${message}`);

        const customerResponse = await mailSender(email, 'Your Enquiry Has Been Registered', 'We Will Contact You As Soon As Possible');

        return res.status(200).json({
            success: true,
            message: "Email Sent Successfully",
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some Error Occurred While Sending Email",
        });
    }
}