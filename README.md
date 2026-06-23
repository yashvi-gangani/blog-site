# 🚀 BlogSite - MERN Stack Blogging Platform

## 📖 Overview

BlogSite is a full-stack blogging platform built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The platform allows users to create accounts, publish blogs, upload images, edit and delete their own posts, interact through comments, and manage their content through a personalized dashboard.

The project demonstrates complete full-stack development skills including authentication, CRUD operations, REST APIs, database management, file uploads, protected routes, and responsive UI design.

---

# ✨ Features

## 🔐 Authentication System

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Password Hashing using bcrypt
* Logout Functionality

---

## 📝 Blog Management

### Create Blog

Users can create blog posts with:

* Title
* Content
* Category
* Featured Image

### Read Blog

Users can:

* View all published blogs
* View blog details
* Read complete blog content

### Update Blog

Authors can:

* Edit title
* Edit content
* Change category
* Update image

### Delete Blog

Authors can permanently delete their own blogs.

---

## 💬 Comment System

Users can:

* Add comments on blog posts
* View all comments
* Delete comments (authorized users)

---

## 📊 Dashboard

Each logged-in user has access to a personal dashboard where they can:

* View all their blogs
* View total number of blogs
* Edit blogs
* Delete blogs
* Access blog details

---

## 🔍 Search Functionality

Users can search blogs instantly by title using the search bar available on the home page.

---

## 🎨 User Interface

* Responsive Design
* Modern Navigation Bar
* Hero Section
* Blog Cards
* Dashboard Statistics
* Attractive Login/Register Pages
* Footer Section
* Mobile-Friendly Layout

---

# 🛠️ Technologies Used

## Frontend

* React.js
* React Router DOM
* Axios
* CSS3

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JSON Web Token (JWT)
* bcryptjs

## File Upload

* Multer

## Development Tools

* Nodemon
* Vite
* Git & GitHub


# ⚙️ Installation & Setup

## Step 1: Clone Repository

git clone https://github.com/yourusername/blogsite.git

cd blogsite

---

## Step 2: Backend Setup

Navigate to backend folder:
cd backend


Install dependencies:
npm install


### Create .env File

Create a `.env` file inside backend folder.

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

Start backend server:
npm run dev


Backend runs on:
http://localhost:5000


---

## Step 3: Frontend Setup

Open another terminal:
cd frontend

Install dependencies:

npm install

Start React application:

npm run dev

Frontend runs on:
http://localhost:5173


---

# 🔗 API Endpoints

## Authentication

### Register User

POST /api/users/register

### Login User

POST /api/users/login

---

## Blogs

### Get All Blogs

GET /api/posts

### Get Single Blog

GET /api/posts/:id

### Create Blog

POST /api/posts

### Update Blog

PUT /api/posts/:id

### Delete Blog

DELETE /api/posts/:id

---

## Comments

### Get Comments

GET /api/comments/:postId

### Add Comment

POST /api/comments/:postId

### Delete Comment

DELETE /api/comments/delete/:id

---

# 🔒 Protected Routes

The following routes require authentication:

/create
/dashboard
/profile
/edit/:id


Users without valid JWT tokens are redirected to the login page.

---

# 👨‍💻 How It Works

### User Journey

1. User registers an account.
2. User logs in.
3. JWT token is stored in localStorage.
4. User can create blogs.
5. Blogs are stored in MongoDB.
6. Blogs appear on the Home page.
7. Users can read blog details.
8. Users can comment on blogs.
9. Authors can edit or delete their blogs.
10. Dashboard shows all blogs created by the logged-in user.

---

# 🚀 Future Improvements

* Blog Likes System
* User Profile Photo
* Rich Text Editor
* Blog Categories Filter
* Dark Mode
* Bookmark Blogs
* Admin Panel
* Pagination
* Email Verification
* Password Reset


# 🎯 Learning Outcomes

This project helped in understanding:

* MERN Stack Development
* REST API Design
* MongoDB Database Operations
* Authentication using JWT
* File Upload Handling
* React State Management
* CRUD Operations
* Protected Routing
* Full Stack Application Deployment

---

# 👩‍💻 Author

**Yashvi Gangani**

MERN Stack Developer

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

---

⭐ If you found this project useful, consider giving it a star on GitHub.
