const express = require("express");
const userMiddleware = require("../middlewares/user");
const { User, Course } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
// User Routes
router.post('/signup', async(req, res) => {
 
    const { username, password } = req.body;
    try {
        await User.create({ username, password });
        res.json({ msg: "User signup successful" });
    } catch (error) {
        res.status(500).json({ msg: "Error occurred during signup", error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const admin = await User.findOne({ username, password });
    
    if (admin) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ msg: "Incorrect username or password" });
    }
});

router.get('/courses', userMiddleware, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json({ courses });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching courses", error: error.message });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;  // Extract courseId from route parameters
    const username = req.headers.username;  // Extract username from headers or JWT middleware

    try {
        // Log the username to verify if it's being passed correctly
        console.log("Username received:", username);

        // Check if the user exists in the database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Check if the user has already purchased the course
        if (user.purchasedCourses.includes(courseId)) {
            return res.status(400).json({ msg: "Course already purchased" });
        }

        // Add the course to the user's purchasedCourses array
        await User.updateOne(
            { username },
            { "$push": { purchasedCourses: courseId } }
        );
        
        res.json({ message: "Purchase complete!" });
    } catch (error) {
        res.status(500).json({ msg: "Error purchasing course", error: error.message });
    }
});


router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    try {
        const user = await User.findOne({
            username: req.headers.username
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        console.log(user.purchasedCourses);

        // Fetch the courses using the purchasedCourses array
        const courses = await Course.find({
            _id: { $in: user.purchasedCourses }
        });

        res.json({ courses });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching purchased courses", error: error.message });
    }
});

module.exports = router
