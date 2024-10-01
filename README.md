# E-Commerce Website

This project is a full-stack e-commerce website built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to browse products, add items to their cart, and make purchases. Administrators can manage the inventory and handle orders.

## Features

- User Authentication (Register/Login)
- Product Listings and Categories
- Shopping Cart with Checkout Functionality
- Order Management
- Admin Dashboard for Managing Products and Orders

## Technologies Used

- **Frontend**: React, Redux, Bootstrap, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: (Include if any, like Stripe or PayPal)
- **API**: RESTful API with Express.js

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v14+)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn (for package management)

### 1. Clone the Repository

git clone https://github.com/Harsh0091/Ecommerce-Website.git
cd your-ecommerce-repo

### 2. Backend Setup

1. Open your terminal and navigate to the backend directory:
    ```
   cd backend
2. Install Dependencies: Install the required npm packages by running:
   ```
    npm install 
3.Create Environment Variables: Create a .env file in the backend folder and add the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
4.Start the Server: Run the following command to start the backend server:
```
node .
```
### 2. Frontend Setup
1.Navigate to the Frontend Directory: In a new terminal window or tab, navigate to the frontend directory:
```
cd frontend
```
2.Install Dependencies: Install the required npm packages by running:
```
npm install
```
3. Start the Frontend: Run the following command to start the frontend application:
```
npm start
```
