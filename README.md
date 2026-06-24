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

## ⚙️ How to Run Locally

**1. Clone the repository**
```bash
git clone https://github.com/Abhiram1817/shopzen-ecommerce.git
cd shopzen-ecommerce
```

**2. Setup Database**

Create a MySQL database and run the table scripts for users, products, cart and orders.

**3. Setup Backend**
```bash
cd backend
npm install
node server.js
```

**4. Setup Frontend**
```bash
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` to view the app.
