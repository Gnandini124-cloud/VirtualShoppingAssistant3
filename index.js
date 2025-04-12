
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Customermodel = require('./models/Customer');
const Product = require('./models/Product');

const app = express();
app.use(express.json());
app.use(cors());



//  MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/customer");

// User login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  Customermodel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      res.status(200).json({ message: "Success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    });
});

// Register
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  Customermodel.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      Customermodel.create(req.body)
        .then(customer => res.status(201).json({ message: 'Successfully registered!', customer }))
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Error creating customer' });
        });
    });
});
// Start server (only once!)
app.listen(3001, () => {
  console.log("Server is running");
});


