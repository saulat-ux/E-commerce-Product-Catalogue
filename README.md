E-commerce Product Catalogue
This repository contains a full-stack e-commerce product catalog application with a backend powered by Node.js, Express, and PostgreSQL, and a frontend built with React. Users can register, login, view products, and manage their carts. Admins have additional capabilities for managing products and user accounts.

Table of Contents
Features
Technologies
Installation
Environment Variables
Running the Project
Testing
Additional Notes
License
Features
User registration and authentication
Add, view, update, and delete products (admin)
Cart functionality (add/remove items, view cart)
Responsive design for mobile and desktop
Technologies
Backend: Node.js, Express, PostgreSQL, Sequelize ORM
Frontend: React, Redux, Axios
Authentication: JWT-based with middleware for protected routes
Database: PostgreSQL
Other: bcrypt for password hashing, cookie-parser for session management
Installation
Clone the Repository:

bash

git clone https://github.com/your-username/E-commerce-Product-Catalogue.git
cd E-commerce-Product-Catalogue
Install Dependencies: Install both backend and frontend dependencies.

Backend:

bash

cd backend
npm install
Frontend:

bash

cd ../frontend
npm install
Environment Variables
Create a .env file in the backend directory with the following environment variables:

env

# Backend Environment Variables
PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ECommerce_DB
JWT_SECRET=your_jwt_secret
Ensure that your PostgreSQL database credentials match what’s configured here.

Running the Project
1. Set Up the Database
Make sure you have PostgreSQL installed and running. Create a new database for the project if you haven't already:

sql

CREATE DATABASE ECommerce_DB;
Use Sequelize to run migrations (if any) and set up the necessary tables:

bash

cd backend
npx sequelize-cli db:migrate
2. Start the Backend Server
In the backend folder, start the server:

bash

npm start
The backend server should be running at http://localhost:5000.

3. Start the Frontend Server
In the frontend folder, start the React application:

bash

npm start
The frontend should be running at http://localhost:3000.
