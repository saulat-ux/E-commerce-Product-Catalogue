How to Run the Project
Installation Instructions
Prerequisites
Some introductory text: Make sure you have the following installed on your machine.

Node.js: v14 or higher recommended
PostgreSQL: For database setup
Step-by-Step Guide
Some introductory text: Follow these steps to set up and run the project on your local machine.

Clone the Repository: Run the following command to clone the repository.

git clone https://github.com/your-username/E-commerce-Product-Catalogue.git
cd E-commerce-Product-Catalogue

Install Dependencies: Install dependencies for both backend and frontend.

Backend:
cd backend
npm install

Frontend:
cd ../frontend
npm install

Environment Variables
Some introductory text: To configure the environment variables, create a .env file in the backend directory. Add the following:

PORT=5000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=ECommerce_DB
JWT_SECRET=your_jwt_secret

Code Block
To set up the database and start the servers, use the following commands.

Set up the Database:

cd backend
npx sequelize-cli db

Start the Backend:
npm start

Start the Frontend:
cd ../frontend
npm start

Additional Note
Note: The backend server will be running at http://localhost:5000, and the frontend at http://localhost:3000.
