const mongoose =require( "mongoose" );
const  adminSchema =require("../model/adminModel")
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Admin = mongoose.model('admin', adminSchema)
const adminMiddleware = async (req, res, next) => {
    console.log('admin middleware called', req.cookies);
    const token = req.cookies.token;

    // Verify the token
    jwt.verify(token, process.env.adminSecret, (err, decoded) => {
      if (err) {
        jwt.verify(token, process.env.superAdminSecret, (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = decoded;
            next()
          })
      }
      req.user = decoded;
      next()
    })

  };
  
module.exports = adminMiddleware