# Fullstack.Ecomm-Capstone

# Gild & Thread   
*A Full-Stack E-Commerce Application*

## Table of Contents
- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [Frontend Wireframe](#frontend-wireframe)
- [Database Seeding](#database-seeding)
- [Usage](#usage)
- [Security](#security)
- [Screenshots](#screenshots)

---

## Overview

**Gild & Thread** is a full-stack e-commerce platform built as a capstone project. It simulates an online shopping experience from both a user and administrative perspective, similar to modern marketplaces like Amazon.

**Deployed Site:** [https://fullstack-ecomm-capstone.onrender.com](https://fullstack-ecomm-capstone.onrender.com)

The app is designed with scalable functionality in mind, following a tiered MVP strategy. It allows non-logged-in users to browse products, registered users to manage a persistent cart and checkout, and admins to manage inventory and users.

---

## Live Demo

Try it here: [https://fullstack-ecomm-capstone.onrender.com](https://fullstack-ecomm-capstone.onrender.com)

Use the following test credentials for exploring:

Admin
Email: sri@gmail.com
Password: Sri1

User
Email: muk@gmail.com
Password: Muk1

---

## Features

###  Public Users (Not Logged In)
- Browse all available products.
- View individual product details (description, price, images).
- Register for a new account.
- Log into an existing account.

### Registered Users (Logged In)
- Persistent shopping cart (cross-device support).
- Add products to the cart.
- Edit product quantities or remove items from the cart.
- Checkout with a confirmation screen.

### Admin Users
- Add, update, or delete products.
- View a list of all users with relevant details (e.g., name, email, address, etc.).
- Restricted access to admin features.

### Engineers / Developers
- Seeded database for development and testing.
- Hundreds of dummy products and users with pre-filled carts.
- Securely stored user data and credentials.

---

## Tech Stack

- **Frontend**: React, Redux, HTML, CSS, Javascript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL 
- **Authentication**: JWT 
- **Hosting**: Render for backend
- **Version Control**: Git & GitHub

---

## Getting Started

### Prerequisites

- Node.js 
- PostgreSQL

### Installation

1. Clone the repo:

   ```bash
   git clone git@github.com:AMeenalosini/Fullstack.Ecomm-Capstone.git
   cd Fullstack.Ecomm-Capstone

2. Install dependencies:
    -> npm install  bcryptjs                  
                    dotenv
                    express
                    jsonwebtoken
                    morgan
                    pg
                    uuid

3. Update 'db.js' file as below
   -> const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/capstone_db');

4. Remove "CORS" from 'index.js' file

---

## Database Schema

Gild & Thread DataBase Schema

![image](https://github.com/user-attachments/assets/353539c3-b2d5-4c23-82e6-4790dde316da)

---

## Frontend Wireframe

Gild & Thread Frontend Wireframe

![image](https://github.com/user-attachments/assets/e70bce93-3aa0-403a-9f9f-4f595ef74435)

---

## Database Seeding

1. Create DataBase in postgres- capstone_db (refer server/db.js)
2. To seed the DataBase go to server folder in termminal- type 'npm run seed'

---

## Usage

1. Browse without logging in.
2. Register or login to begin adding items to your cart.
3. Visit your cart page to modify or checkout.
4. If you are an admin, navigate to the admin dashboard to manage users and products.

---

## Security

1. Passwords are hashed before storing using bcrypt.
2. Authentication via JWT for secure sessions.
3. Authorization checks restrict admin functionality to verified users.
4. Sensitive user data is protected and not exposed in any public-facing views or APIs.

---

## Screenshots

![alt text](<Gild & Threads Webpage Screenshot.png>)










