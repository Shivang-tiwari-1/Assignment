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

![Signup Page](ScreenShot\image.png)
_User enters name, phone, and password to create a new account. Upon successful signup, user is directed to login page_

### Login Page

![Login Page](ScreenShot\loginpage.png)
_User logs in with email and password. If "Remember Me" is checked, the login state is persistent across page refreshes or closing the browser. The app uses a refresh token mechanism to automatically generate a new access token when the old one expires, ensuring the user stays logged in without losing their session._

### Products Page

![Products Page](ScreenShot\productpage.png)
_Displays all available products with pagination. Users can navigate between pages, view product details, and add items to the cart._

### Cart Page

![Cart Page](ScreenShot\cart.png)
_Shows items added to the cart. Users can update quantity, remove items, view total price, and proceed to mock checkout._

### Receipt Page

![Receipt Page](ScreenShot\recipt.png)
_Demonstrates the mock checkout process. No real payments are processed; confirms cart purchase._

[Watch the demo video](https://www.loom.com/share/14af6c8675ec43dab569647b16aef098)
