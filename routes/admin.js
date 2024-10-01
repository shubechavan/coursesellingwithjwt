const express = require("express");
const adminMiddleware = require('../middlewares/admin');

const { Admin, Course } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Admin Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        await Admin.create({ username, password });
        res.json({ msg: "Admin signup successful" });
    } catch (error) {
        res.status(500).json({ msg: "Error occurred during signup", error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    
    if (admin) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ msg: "Incorrect username or password" });
    }
});

// Additional routes for courses...
router.post('/courses', adminMiddleware, async (req, res) => {
    const { title, description, price, imagelink } = req.body;
    try {
        const course = await Course.create({ title, description, price, imagelink });
        res.json({ msg: "Course created successfully", courseId: course._id });
    } catch (error) {
        res.status(500).json({ msg: "Error creating course", error: error.message });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json({ courses });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching courses", error: error.message });
    }
});


module.exports = router;
