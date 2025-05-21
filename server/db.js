/******************************************************************************************************/
/****     Node.js + PostgreSQL Backend for E-Commerce Capstone Project - Gild & Threads            ****/
/****     Includes User Auth, Products, Cart, Orders, and Admin Actions                            ****/
/******************************************************************************************************/

/** Step 1: Import Dependencies **/
require("dotenv").config(); 
const pg = require('pg')
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';    // Secret for signing JWT tokens

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost/capstone_db";

const client = new pg.Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging"
      ? { rejectUnauthorized: false }
      : undefined,
});

/** Step 2: Create Database Tables **/
const createTables = async()=> {
  const SQL = `
        DROP TABLE IF EXISTS order_items;   
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS user_products;   
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;

        CREATE TABLE users(
            id UUID PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            is_admin BOOLEAN DEFAULT FALSE,
            name VARCHAR(255) NOT NULL,
            email_address VARCHAR(255),
            mailing_address VARCHAR(255) NOT NULL,
            phone_number VARCHAR(255),
            billing_address VARCHAR(255)

        );

        CREATE TABLE products(
            id UUID PRIMARY KEY,
            description VARCHAR(255) NOT NULL,
            image_url VARCHAR(255) NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            category VARCHAR(100) NOT NULL
        );

        CREATE TABLE user_products(
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id) NOT NULL, 
            product_id UUID REFERENCES products(id) NOT NULL,
            CONSTRAINT unique_user_id_and_product_id UNIQUE (user_id, product_id),
            quantity INTEGER NOT NULL
        );

        CREATE TABLE orders(
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id) NOT NULL, 
            created_at TIMESTAMP DEFAULT now(),total_item INTEGER NOT NULL,
            total_amount NUMERIC(10, 2) NOT NULL,
            final_amount NUMERIC(10, 2) NOT NULL
        );

        CREATE TABLE order_items(
            id UUID PRIMARY KEY,
            order_id UUID REFERENCES orders(id) NOT NULL, 
            product_id UUID REFERENCES products(id) NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            quantity INTEGER NOT NULL
        );
    `;
  await client.query(SQL);
};

/** Step 3: Authentication Helpers **/

//GENERATE token using user_id during REGISTER
const signToken = async (user_id) => {
  return jwt.sign({ id: user_id }, JWT);
};

// Authenticate user by username/password and return JWT
const authenticate = async({ username, password })=> {
  const SQL = `
    SELECT id, username, password FROM users WHERE username=$1;
  `;
  const response = await client.query(SQL, [username]);
  if(!response.rows.length || (await bcrypt.compare(password, response.rows[0].password))=== false){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id}, JWT);
  return { token };
};

//Find/Verify the user with token using JWT verify
const findUserWithToken = async(token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  }
  catch(ex){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const SQL = `
    SELECT id, username, is_admin, name, email_address, mailing_address, phone_number, billing_address 
    FROM users
    WHERE id = $1
  `;
  const response = await client.query(SQL, [id]);
  if(!response.rows.length){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return response.rows[0];

}

/** Step 4: User Functions **/

//CREATE a new user
async function createUsers({username, password, admin = false, name, e_add, m_add, ph_no, b_add}) {
  const SQL = `INSERT INTO users(id, username, password, is_admin, name, email_address, mailing_address, phone_number, billing_address) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  const dbResponse = await client.query(SQL, [
        uuid.v4(), 
        username,
        await bcrypt.hash(password, 5),
        admin,
        name,
        e_add,
        m_add,
        ph_no,
        b_add
    ]);
  return dbResponse.rows[0];
}

// Fetch all users
const fetchUsers = async()=> {
  const SQL = `
    SELECT * FROM users;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

/** Step 5: Product Functions **/

// Create a new product
const createProduct = async({description, image_url, price, category})=> {
  const SQL = `
    INSERT INTO products(id, description, image_url, price, category) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), description, image_url, price, category]);
  return response.rows[0];
};

// Fetch all products
const fetchProducts = async()=> {
  const SQL = `
    SELECT * FROM products;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

// Fetch products by category
const fetchCatProducts = async(category)=> {
  const SQL = `
    SELECT * FROM products where category = $1;
  `;
  const response = await client.query(SQL, [category]);
  return response.rows;
};

// Fetch single product
const fetchSingleProduct = async(id)=> {
  const SQL = `
    SELECT * FROM products where id = $1;
  `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

// Update product fields
const updateProducts = async( id, fields )=> {

  const keys = Object.keys(fields); //keys = ['description','image_url', 'price'];

  if (keys.length === 0) throw new Error("No fields to update"); 

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', '); //setClause = "description = $1 , image_url = $2 , price = $3";
 
  const values = keys.map(key => fields[key]); //create an new array with the value of the key

  const SQL = `
    UPDATE products SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *
  `;

  values.push(id);

  const response = await client.query(SQL, values);
  return response.rows[0];
};

// Delete a product
const destroyProduct = async({ id })=> {
  const SQL = `
    DELETE FROM products WHERE id=$1;
  `;
  await client.query(SQL, [id]);
};

/** Step 6: Cart Functions **/

// Add product to user's cart
const createUserProducts = async({ user_id, product_id, quantity})=> {
  const SQL = `
    INSERT INTO user_products(id, user_id, product_id, quantity) VALUES($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), user_id, product_id, quantity]);
  return response.rows[0];
};

// Get user's cart items
const fetchUserProducts = async(user_id)=> {
  const SQL = `
    SELECT * FROM user_products where user_id = $1;
  `;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

// Update quantity in cart
const updateUserProducts  = async({ quantity, id })=> {
  const SQL = `
    UPDATE user_products SET quantity = $1 where id = $2 RETURNING *
  `;
  const response = await client.query(SQL, [quantity, id]);
  return response.rows[0];
};

// Remove one item from cart
const destroyUserProducts = async(id)=> {
  const SQL = `
    DELETE FROM user_products WHERE id=$1
  `;
  await client.query(SQL, [id]);
};

// Empty user's cart
const destroyCart = async({ user_id })=> {
  const SQL = `
    DELETE FROM user_products WHERE user_id=$1
  `;
  await client.query(SQL, [user_id]);
};

/** Step 7: Order Functions **/

// Create new order
const createOrder = async({ user_id, total_item, total_amount, final_amount})=> {
  const SQL = `
    INSERT INTO orders(id, user_id, total_item, total_amount, final_amount) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), user_id, total_item, total_amount, final_amount]);
  return response.rows[0];
};

// Get user's orders
const fetchOrder = async(id)=> {
  const SQL = `
    SELECT * FROM orders where user_id = $1;
  `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

// Update final total of an order
const updateOrderAmount  = async({ final_amount, user_id })=> {
  const SQL = `
    UPDATE orders SET final_amount = $1 where user_id = $2 RETURNING *
  `;
  const response = await client.query(SQL, [final_amount, user_id]);
  return response.rows[0];
};

// Create order item
const createOrderItems = async({ order_id, product_id, price, quantity })=> {
  const SQL = `
    INSERT INTO order_items(id, order_id, product_id, price, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), order_id, product_id, price, quantity]);
  return response.rows[0];
};

/** Step 8: Admin Utilities **/

// Admin deletes product from user_products
const admindeleteSproduct = async({product_id})=> {
  const SQL = `
    DELETE FROM user_products WHERE product_id = $1;
  `;
  await client.query(SQL, [product_id]);
};

// Admin deletes product from order_items
const admindeleteOproduct = async({product_id})=> {
  const SQL = `
    DELETE FROM order_items WHERE product_id = $1;
  `;
  await client.query(SQL, [product_id]);
};

/** Step 9: Export All Functions **/
module.exports = {
  client,
  createTables,
  createUsers,
  createProduct,
  updateProducts,
  createOrder,
  fetchOrder,
  updateOrderAmount,
  createOrderItems,
  fetchUsers,
  fetchProducts,
  fetchCatProducts,
  fetchSingleProduct,
  destroyProduct,
  updateUserProducts,
  fetchUserProducts,
  createUserProducts,
  destroyUserProducts,
  destroyCart,
  admindeleteSproduct,
  admindeleteOproduct,
  authenticate,
  findUserWithToken,
  signToken
};