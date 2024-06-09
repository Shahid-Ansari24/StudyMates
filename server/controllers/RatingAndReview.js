const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { default: mongoose } = require("mongoose");

// creating Rating and Review
exports.createRatingAndReview = async ( req, res ) => {
    try {
        const {courseId, rating, review} = req.body;
        const userId = req.user.id;

        // validation
        if(!courseId || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required",
            })
        }

        // valid courseId and userId
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "Logged In First",
            });
        }

        const CourseDetails = await Course.findOne({_id: courseId},
                                                   {studentsEnrolled: {$elemMatch: {$eq: userId}}});
        
        if(!CourseDetails) {
            return res.json({
                success: false,
                message: "Student is not enrolled in the course",
            });
        }


        // check if user already review the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                    user: userId,
                                    course: courseId,
                                })

        if(alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course is already review by the user",
            })
        }

        // create RatingAndReview
        const ratingAndReview = await RatingAndReview.create({
                                    user: userId,
                                    rating: rating,
                                    review: review,
                                    course: courseId
                                });

        // update course
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: CourseDetails._id},
                                                             {$push: {ratingAndReviews: ratingAndReview._id}},
                                                             {new: true});


        console.log(updatedCourseDetails);

        return res.status(200).json({
            success: true,
            message: "Rating And Review creted Successfully",
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Unable to Create Rating and Review",
            error: error.message,
        });
    }
}




// getAverageRating
exports.getAverageRating = async ( req, res ) => {
    try {
        // get course ID
        const courseId = req.body.courseId;

        // calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group: {
                    _id:null,
                    averageRating: {$avg: "$rating"},
                },
            }
        ])
        // return rating
        if(result.length > 0) {
            return res.satus(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        // if not rating/review exist
        return res.status(200).json({
            success: true,
            message: "Average Rating is 0, no ratings given till now",
            averageRating: 0,
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// getAllRating/Reviews
exports.getAllRating = async ( req, res ) => {
    try {
        // HW: get all rating and review based on couses
        const allReviews = await RatingAndReview.find({})
                           .sort({rating: "desc"})
                           .populate({
                                path: "user",
                                select: "firstName lastName email image",
                           })
                           .populate({
                                path: "course",
                                select: "courseName",
                           }).exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}