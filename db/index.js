const mongoose = require('mongoose');

// Database Connection
mongoose.connect('mongodb+srv://shubhamchavancool332:0QKHGwWML4OVeCLH@cluster0.p96yv.mongodb.net/coursesbar2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Define schemas
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: String,
    password: String
});

const UserSchema = new Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imagelink: String,
});

// Create models
const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

// Export models
module.exports = {
    Admin,
    User,
    Course
};
