const Profile = require("../models/Profile");
const Course = require("../models/Course")
const User = require("../models/User");
const {uploadToCloudinary} = require("../utils/uploadToCloudinary");
const dotenv = require("dotenv");
dotenv.config();

exports.updateProfile = async ( req, res ) => {
    try {
        // get data
        const { dateOfBirth="", about="", contactNumber, gender } = req.body;
        const id = req.user.id;

        // vaidation
        if(!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // find profile
        const userDetails = await User.findById({_id: id});
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails,
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to update profile",
            error: error.message,
        })
    } 
}

// delete account

exports.deleteAccount = async ( req, res ) => {
    try {
        // How to do job scheduling
        // Explore -> How can we schedule this deletion operation
        // what is crone job

        // get id
        const id = req.user.id;

        // validation
        const userDetails = await User.findById(id);

        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            });
        }

        // delete profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);

        // HW: unerolled user from all enrolled courses

        // delete user
        await User.findByIdAndDelete({_id: id});

        // return response
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User Cannot be deleted successfully",
            error: error.message,
        });
    }
}


exports.getAllUserDetails = async ( req, res ) => {
    try {
        // get id
        const id = req.user.id;

        // validation and user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            userDetails,
        });

    } catch ( error ) {
        console.log(error);
        return res.status(200).json({
            success: false,
            message: "Internal Server Error. Unable to get all user details",
            error: error.message,
        });
    }
}


exports.updateDisplayPicture = async ( req, res ) => {
    try {
        const displayPicture = req.files.displayPicture;

        if(!displayPicture) {
            return res.json({
                success: false,
                message: "Insert Your Profile Picture",
            });
        }

        const userId = req.user.id;
        const email = req.user.email;
        console.log(email);

        const userDetails = await User.findById(userId);

        const uploadDetails = await uploadToCloudinary(displayPicture, process.env.FOLDER_NAME);

        userDetails.image = uploadDetails.secure_url;

        await userDetails.save();

        return res.status(200).json({
            success: true,
            message: "Display Picture Updated Successfully",
            image: userDetails.image,
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Unable to Update Display Picture",
            error: error.message,
        });
    }
}

// get enrolled courses

exports.intructorDashboard = async ( req, res ) => {
    try {
        const courseDetails = await Course.find({instructor: req.user.id});

        const courseData = courseDetails.map((course) => {
            const totalStudentEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentEnrolled * course.price

            // create a new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentEnrolled,
                totalAmountGenerated
            }

            return courseDataWithStats
        })

        res.status(200).json({course:courseData})
    } catch ( error ) {
        res.status(500).json({message: "Internal Server Error"})
        console.log("instructorDashboard---", error)
    }
}