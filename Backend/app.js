const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookiesParser = require('cookie-parser');
dotenv.config();
const app = express();
const connectedToDb = require('./db');
const userRoutes = require('../Backend/Routes/user.routes');
const adminRoutes=require('../Backend/Routes/admin.routes');
const orderRoutes=require("../Backend/Routes/Order.routes")
connectedToDb();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/order", orderRoutes);
app.get('/', (req, res) => {
    res.send('hello')
});

module.exports = app;