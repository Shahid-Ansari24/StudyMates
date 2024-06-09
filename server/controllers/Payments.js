const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
// const {courseEnrollmentEmail} = require("../mail/tmeplates/courseEnrollmentEmail");

// capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    // get courseId and UserId
    const { course_id } = req.body;
    const userId = req.user.id;

    // validation
    // valid courseID
    if (!course_id) {
        return res.status(400).json({
        success: false,
        message: "Please provide valid course ID",
        });
    }

    // valid course details
    let course;
    try {
        course = await Course.findById(course_id);

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Could not find the course",
            });
        }

        // user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);

        if(course.studentsEnrolled.includes(uid)) {
            return res.status(400).json({
                success: false,
                message: "Student is already enrolled",
            });
        }

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }

    // order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: course_id,
            userId,
        }
    };


    try {
        // initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        // return response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });

    } catch ( error ) {
        console.log(error);
        return res.json({
            success: false, 
            message: "Could not initiate order"
        });
    }

};



// varify Signature of Razorpay and Server

exports.verifySignature = async ( req, res ) => {
    const webhookSecret = "123456";

    const signature = req.headers("x-razorpay-signature");

    // createHmac -> create hash based message authentication code. Required two things 1st. hashing algo and 2nd. secret key.
    // SHA -> Secure Hashing Algorithm. In this decryption is possible
    // HW: what is checkSum?
    const shasum = crypto.createHmac("sha256", webhookSecret);

    shasum.update(JSON.stringify(req.body));

    // when we run our hashing algorithm on text, the output sometimes called as digest, which is generally in the format of hexadecimal
    const digest = shasum.digest("hex");


    if(signature == digest) {
        console.log("Payment is Authorised");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try {
            // fulfil the actions

            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate({_id: courseId},
                                                                {$push: {studentsEnrolled: userId}},
                                                                {new: true});
            
            if(!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course Not Found",
                });
            }

            console.log(enrolledCourse);

            // find the student and add the course to their list enrolled courses 
            const enrolledStudent = await User.findOneAndUpdate({_id: userId},
                                                                {$push: {courses: courseId}},
                                                                {new: true});

            console.log(enrolledStudent);

            // send mail of confirmation
            const emailResponse = await mailSender(enrolledStudent.email, 
                                                   "Congratulations from StudyNotion",
                    "Congratulations, you are onboarded into new StudyNotion Course");

            
            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message: "Signaature Verified and Course added",
            });

        } catch ( error ) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Some Error Occurred",
                error: error.message,
            });
        }
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Invalid Requrest",
        });
    }

    
};
