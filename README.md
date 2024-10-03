
# JWT Authentication with MongoDB

This project demonstrates a simple implementation of JWT (JSON Web Token) authentication using Node.js, Express, and MongoDB. It provides routes for user and admin registration, login, and course management.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Middleware](#middleware)

## Installation

1. Clone the repository:

   ```bash
   git clone (https://github.com/shubechavan/coursesellingwithjwt)
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the required packages:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret:

   ```env
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=your_jwt_secret
   ```

5. Start the server:

   ```bash
   npm start
   ```

## Usage

- Use Postman or any API client to test the endpoints.
- Ensure to include the `Authorization` header with the Bearer token for protected routes.

## API Endpoints

### Admin Routes

- **POST /admin/signup**: Register a new admin.
- **POST /admin/signin**: Login an admin and get a JWT token.
- **POST /admin/courses**: Create a new course (requires admin authentication).
- **GET /admin/courses**: Fetch all courses (requires admin authentication).

### User Routes

- **POST /user/signup**: Register a new user.
- **POST /user/signin**: Login a user and get a JWT token.
- **GET /user/courses**: List all available courses.
- **POST /user/courses/:courseId**: Purchase a course (requires user authentication).
- **GET /user/purchasedCourses**: Fetch courses purchased by the user (requires user authentication).

## Models

- **Admin**: Represents the Admin users.
- **User**: Represents the regular users and their purchased courses.
- **Course**: Represents the courses available for purchase.

## Middleware

- **Admin Middleware**: Validates admin authentication for protected admin routes.
- **User Middleware**: Validates user authentication for protected user routes.

