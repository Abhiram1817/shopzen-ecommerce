# 🛒 ShopZen - E-Commerce Web App

A full-stack e-commerce web application built with React.js, Node.js, Express.js and MySQL.

## 📌 Overview

ShopZen is a complete e-commerce platform where users can browse products, add them to cart, and place orders. It features user authentication with JWT tokens and a clean responsive UI.

## 🛠️ Tech Stack

- **Frontend** — React.js, React Router, Axios
- **Backend** — Node.js, Express.js, REST APIs
- **Database** — MySQL
- **Auth** — JWT (JSON Web Tokens), bcryptjs

## ✨ Features

- User Registration & Login with JWT authentication
- Browse products with category filtering
- View detailed product information
- Add products to cart
- Place orders and view order history
- Fully responsive UI

## 📂 Project Structure
shopzen-ecommerce/

├── backend/

│   ├── config/

│   │   └── db.js

│   ├── routes/

│   │   ├── auth.js

│   │   ├── products.js

│   │   ├── cart.js

│   │   └── orders.js

│   ├── .env

│   └── server.js

├── frontend/

│   └── src/

│       ├── components/

│       │   └── Navbar.js

│       ├── pages/

│       │   ├── Home.js

│       │   ├── Login.js

│       │   ├── Register.js

│       │   ├── ProductDetail.js

│       │   ├── Cart.js

│       │   └── Orders.js

│       ├── App.js

│       └── index.js

└── README.md
## ⚙️ How to Run Locally

**1. Clone the repository**
```bash
git clone https://github.com/Abhiram1817/shopzen-ecommerce.git
cd shopzen-ecommerce
```

**2. Setup Database**

Create a MySQL database and run:
```sql
CREATE DATABASE ecommerce;
USE ecommerce;
```
Then create the tables for users, products, cart and orders.

**3. Setup Backend**
```bash
cd backend
npm install
```
Create a `.env` file:
Run the backend:
```bash
node server.js
```

**4. Setup Frontend**
```bash
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` to view the app.

## 📃 License
MIT
