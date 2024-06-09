const Category = require('../models/Category');

// create Category handler function
exports.createCategory = async ( req, res ) => {
    try {
        // fetch data
        const { name, description } = req.body;

        // validation
        if(!name || !description ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // create entry in DB
        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategoryDetails);

        // response
        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
        });

    } catch ( error ) {
        return res.status(500).json({
            success: false,
            message: "Error Occured While Creating Category",
            error: error.message
        })
    }
}


// get all category
exports.showAllCategories = async ( req, res ) => {
    try {
        const allCategories = await Category.find({}, {name: true, description: true});

        res.status(200).json({
            success: true,
            message: "All Categories returned successfully",
            category: allCategories
        })

    } catch ( error ) {
        return res.status(500).json({
            success: false,
            message: "Error Occured While Showing All Categories",
            error: error.message
        })
    }
}


// category page details
exports.categoryPageDetails = async ( req, res ) => {
    try {
        // get category Id
        const { categoryId } = req.body;

        // Gert course for the specified categoy
        const selectedCategory = await Category.findById(categoryId)
                                .populate("courses").exec();

        console.log(selectedCategory);

        // Handle the case when category is not found
        if(!selectedCategory) {
            console.log("Category not found");
            return res.status(400).json({
                success: false,
                message: "Category not found",
            });
        }

        // Handle the case when there are no courses
        if(!selectedCategory.courses.length == 0) {
            console.log("No courses found for the selected category.");
            return res.status(400).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }


        const selectedCourses = selectedCategory.courses;

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find(
                                        {_id: {$ne: categoryId}})
                                        .populate("courses");

        let differentCourses = [];

        for(const category of categoriesExceptSelected) {
            differentCourses.push(...category.courses);
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find().populate("courses");
        const allCourses = allCategories.courses.flatMap((category) => category.courses);

        const mostSellingCourses = allCourses
                                   .sort((a, b) => b.sold - a.sold)
                                   .slice(0, 10);

        return res.status(200).json({
            selectedCourses: selectedCourses,
            differentCourses: differentCourses,
            mostSellingCourses: mostSellingCourses,
        });

    } catch ( error ) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}