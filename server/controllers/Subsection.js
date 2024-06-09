const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadToCloudinary} = require("../utils/uploadToCloudinary");
require("dotenv").config();

// create SubSection
exports.createSubSection = async ( req, res ) => {
    try {
        // fetch data from req body
        const { sectionId, title, timeDuration, description } = req.body;
        
        // extract file/video
        const video = req.files.videoFile;
        
        // validation
        if(!sectionId || !title || !timeDuration || !description) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required",
            });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadToCloudinary(video, process.env.FOLDER_NAME);

        // create a sub-section
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        // update section with this sub-section obj id
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
                                                            {$push: {subSection: SubSectionDetails._id}},
                                                            {new: true})
                                                            .populate("subSection").exec();

        // HW: log updated section here, after adding populate query -> Done

        // return response
        return res.status(200).json({
            success: true,
            message: "Sub-Section Created Successfully",
            updatedSection,
        });

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}


// HW: update SubSection
exports.updateSubSection = async ( req, res ) => {
    try {
        const { subSectionId, title, description } = req.body;
        
        const subSectionDetails = await SubSection.findById(subSectionId);

        if(!subSectionDetails) {
            return res.json(400).json({
                success: false,
                message: "Sub Section Not Found",
            });
        }

        if(title !== undefined) {
            subSectionDetails.title = title;
        }

        if(description !== undefined) {
            subSectionDetails.description = description;
        }

        if(req.files && req.files.video !== undefined) {
            const video = req.files.video;

            const uploadDetails = await uploadToCloudinary(video, process.env.FOLDER_NAME);
            subSectionDetails.videoUrl = uploadDetails.secure_url;
            subSectionDetails.timeDuration = uploadDetails.timeDuration;
        }

        await subSectionDetails.save();

        return res.status(200).json({
            success: true, 
            message: "Sub Section Updated Successfully",
        });


    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Unable to Update this Sub-Section",
            error: error.message,
        })
    }
}

// HW: delete SubSection
exports.deleteSubSection = async ( req, res ) => {
    try {
        // fetch data
        const {sectionId} = req.body;
        
        const {subSectionId} = req.params;

        // validation
        if(!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // delete Sub Section
        await SubSection.findByIdAndDelete({_id: subSectionId});

        // update Section
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
                                                            {$pull: {_id: subSectionId}},
                                                            {new: true})
                                                            .populate("subSection").exec();
        
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Sub-Section Deleted Successfully",
            updatedSection,
        })

    } catch ( error ) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. Unable to Delete this Sub-Section",
            error: error.message,
        })
    }
}

