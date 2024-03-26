const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config;
const { errorhandling } = require('./Middleware/errorHandling.js')

app.use(cors());
app.use(express.json());
app.use(errorhandling);

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const connectDB = require('./db.js')
app.use(`/category`,categoriesRoutes);
app.use(`/users`, usersRoutes);
app.use(errorhandling)
const apprun = () => {
	connectDB()
	app.listen(process.env.PORT || 3000);
}
apprun();