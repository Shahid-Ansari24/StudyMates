const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require("../models/SubSection");

exports.createSection = async ( req, res ) => {
    try {
        // fetch data
        const { sectionName, courseId } = req.body;

        // data validation
        if( !sectionName || !courseId ) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties",
            });
        }

        // create section
        const newSection = await Section.create({sectionName});

        // update course with section object id
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId},
                                                            {$push : {courseContent: newSection._id}},
                                                            {new: true})
                                                            .populate({
                                                                path: "courseContent",
                                                                populate: {
                                                                    path: "subSection",
                                                                    model: SubSection,
                                                                }
                                                            }).exec();

        // HW: use populate to replace section/sub-sections both in the updatedCourseDetails -> Done From My Side

        // return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        });

    } catch ( error ) {
        return res.status(500).json({
            success: false,
            message: "Unable to create Section, please try again",
            error: error.message,
        });
    }
}





exports.updateSection = async ( req, res ) => {
    try {
        // data input
        const { sectionName, sectionId } = req.body;
        
        // data validation
        if( !sectionName || !sectionId ) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties",
            });
        }

        // update data
        const section = await Section.findByIdAndUpdate({_id: sectionId},
                                                    {sectionName},
                                                    {new: true});
        

        // return response
        return res.status(200).json({
            success: false,
            message: "Section Updated Successfully",
        });

    } catch ( error ) {
        return res.status(500).json({
            success: false,
            message: "Unable to update Section, please try again",
            error: error.message,
        });
    }
}




exports.deleteSection = async ( req, res ) => {
    try {
        // get Id
        const {sectionId} = req.params;
        const { courseId } = req.body;

        console.log("section Id: ", sectionId);
        // delete section
        await Section.findByIdAndDelete({_id: sectionId});

        // TODO: Do we need to delete the entry from the course schema ->  Yesss we need to update
        const updatedCourse = await Course.findByIdAndUpdate({_id: courseId},
                                                             {$pull: {courseContent: sectionId}},
                                                             {new: true});

        // return response
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            updatedCourse,
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete Section, please try again",
            error: error.message,
        });
    }
}