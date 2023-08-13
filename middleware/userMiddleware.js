const mongoose =require( "mongoose" );
const  adminSchema =require("../model/adminModel")
require('dotenv').config()
const jwt = require('jsonwebtoken')
const userMiddleware = async (req, res, next) => {
    console.log('user middleware called', req.cookies);
    const token = req.cookies.token;

    // Verify the token
    jwt.verify(token, process.env.userSecret, (err, decoded) => {
      if (err) {
              return res.status(401).json({ message: 'Unauthorized' });   
      }
      req.user = decoded;
      next()
    })

  };
  
module.exports = userMiddleware