const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Profile = require('../models/Profile');
const SubSection = require('../models/SubSection');
const Section = require("../models/Section");
const {uploadToCloudinary} = require("../utils/uploadToCloudinary");
require("dotenv").config();


// createCourse handler function
exports.createCourse = async ( req, res ) => {
    try {

        // fetch data
        const {courseName, courseDescription, whatYouWillLearn, price, category, tag, instructions} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag || !instructions) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check for instructor
        const userId = req.user.id;

        const instructorDetails = await User.findById(userId);
        console.log("userId: ", userId);
        console.log("Instructor Details: ", instructorDetails);

        if(!instructorDetails) {
            return res.status(400).json({
                success: false,
                message: "Instructor Details not found",
            });
        }

        // check given tag is valid or not
        const categoryDetails = await Category.findById(category);

        if(!categoryDetails) {
            return res.status(400).json({
                success: false,
                message: "Category Details Not Found",
            });
        }

        const thumbnailImage = await uploadToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course
        const status = "Draft";
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            tag,
            status: status,
            instructions
        });

        // Add the new course to the user schema of Instructor
        await User.findByIdAndUpdate({_id: userId},
                            {$push: {courses: newCourse._id}},
                            {new: true});

        // update the TAG schema
        // TODO: HW -> Done
        await Category.findByIdAndUpdate({_id: categoryDetails._id}, 
                            {$push: {course: newCourse._id}},
                            {new: true});

                            
        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse,
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Fail to create course",
            error: error.message
        });
    }
} 



// getAllCourses handler function
exports.showAllCourses = async ( req, res ) => {
    try {

        // change the below statement increamentally
        const allCourses = await Course.find({}, {courseName: true,
                                                price: true,
                                                category: true,
                                                thumbnail: true,
                                                ratingAndReviews: true,
                                                studentsEnrolled: true})
                                                .populate("instructor")
                                                .exec();

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: error.message,
        });
    }
}



exports.getCourseDetails = async ( req, res ) => {
    try {
        // get Id
        const { courseId } = req.body;

        // find course details
        const cousreDetails = await Course.find({_id: courseId})
                                          .populate({
                                                path: "instructor",
                                                model: User,
                                                populate: {
                                                    path: "additionalDetails",
                                                    model: Profile,
                                                }
                                          })
                                          .populate({
                                                path: "courseContent",
                                                model: Section,
                                                populate: {
                                                    path: "subSection",
                                                    model: SubSection,
                                                }
                                          })
                                          .populate("category").exec(); // change this after creating rating and review
                                        //   .populate({
                                        //         path: "RatingAndReviews",
                                        //         populate: {
                                        //             path: "User",
                                        //             model: User,
                                        //             select: 'firstName lastName',
                                        //         }
                                        //   }).exec();
        
        // return response        
        if(!cousreDetails) {
            return res.status(400).json({
                success: false,
                message: "Course Not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course Details Fetched Successfully",
            cousreDetails,
        });

    } catch ( error ) {
        console.log( error );
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Unable to fetched course data",
            error: error.message,
        });
    }
}