const express = require("express");
const router = express.Router();

const {
    createCourse,
    showAllCourses,
    getCourseDetails,
} = require("../controllers/Course");

const {
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/Section");

const {
    createSubSection,
    deleteSubSection
} = require("../controllers/Subsection");

const {
    createRatingAndReview,
    getAverageRating,
    getAllRating
} = require("../controllers/RatingAndReview");

const {
    createCategory,
    showAllCategories,
    categoryPageDetails
} = require("../controllers/Category");

const { auth, isStudent, isInstructor, isAdmin } = require("../middleware/auth");


// ----------- Course --------------- //
router.post("/createcourse", auth, isInstructor, createCourse);
router.get("/showallcourses", auth, showAllCourses);
router.post("/getcoursedetails", auth, getCourseDetails);


// ------------- Section ------------------- //
router.post("/addsection", auth, isInstructor, createSection);
router.put("/updatesection", auth, isInstructor, updateSection);
router.delete("/deletesection/:sectionId", auth, isInstructor, deleteSection);


// ---------------- Sub Section ------------------ //
router.post("/addsubsection", auth, isInstructor, createSubSection);
router.delete("/detetesubsection", auth, isInstructor, deleteSubSection);


// --------------- Rating and Reviews -------------------- //
router.post("/createrating", auth, isStudent, createRatingAndReview);
router.get("/getaveragerating", getAverageRating);
router.get("/getallratings", getAllRating);


// Categories Section
router.post("/createcategory", auth, isAdmin, createCategory);
router.get("/showallcategories", showAllCategories);
// categoryPageDetails

module.exports = router;