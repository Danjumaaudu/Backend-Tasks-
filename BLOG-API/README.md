# 📝 Blog API

A simple RESTful Blog API built with **TypeScript**, **Express**, and **MongoDB**. It allows users to create, read, update, and delete blog posts.

---

##  Features

- Create a blog
- Get all blogs (with pagination)
- Get a single blog by ID
- Update a blog
- Delete a blog

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)

---

## Setup

```bash
git clone https://github.com/your-username/blog-api-ts.git
cd blog-api-ts
npm install


Create a .env file:

env
Copy
Edit
MONGO_URI=your_mongo_connection_string
PORT=5000
Start the server:

bash
Copy
Edit
npm run dev
📮 API Endpoints
Method	Endpoint	Description
POST	/api/create	Create a new blog
GET	/api/blogs	Get all blogs (paginated)
GET	/api/blog/:id	Get one blog by ID
PUT	/api/update	Update a blog
DELETE	/api/:id	Delete a blog by ID

Example: /api/blogs?page=1&limit=5

✍🏽 Author
Muhammed Audu
GitHub: @Danjumaaudu
LinkedIn: linkedin.com/in/audu-muhammed-80101b2a5