Vibe Commerce Mock E-Commerce Cart

Overview

This is a full-stack shopping cart application built as part of the Vibe Commerce coding assignment.
It demonstrates add/remove items, calculate totals, and mock checkout functionality.

Tech Stack:
Frontend: React
Backend: Node.js + Express
Database: MongoDB
API Type: REST

Installation & Setup
git clone https://github.com/Shivang-tiwari-1/Assignment.git

Backend setup
cd backend
npm install
npm start

Frontend setup
cd frontend
npm install
npm start

API Endpoints

Products
GET /products → List all products

Cart
POST /cart → Add item to cart (requires JWT)

DELETE /delcart/:id → Remove item from cart (requires JWT)

GET /cart/getcart → Retrieve all items in cart (requires JWT)

POST /cart/checkout → Perform mock checkout (requires JWT)

Authentication
POST /createuser → Create a new user (signup)

POST /login → Login user and get JWT token

POST /refreshToken → Get a new access token using refresh token

POST /logout → Logout user (invalidate refresh token, requires JWT)

Notes
This project uses mock checkout; no real payments are processed.
Make sure MongoDB (if used) is running locally, or adjust DB_URI in .env.

### Signup Page
![Signup Page](https://raw.githubusercontent.com/Shivang-tiwari-1/Assignment/main/ScreenShot/image.png)

### Login Page
![Login Page](https://raw.githubusercontent.com/Shivang-tiwari-1/Assignment/main/ScreenShot/loginpage.png)

### Products Page
![Products Page](https://raw.githubusercontent.com/Shivang-tiwari-1/Assignment/main/ScreenShot/productpage.png)

### Cart Page
![Cart Page](https://raw.githubusercontent.com/Shivang-tiwari-1/Assignment/main/ScreenShot/cart.png)

### Receipt Page
![Receipt Page](https://raw.githubusercontent.com/Shivang-tiwari-1/Assignment/main/ScreenShot/recipt.png)


[Watch the demo video](https://www.loom.com/share/14af6c8675ec43dab569647b16aef098)
