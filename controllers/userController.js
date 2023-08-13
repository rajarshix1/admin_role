const mongoose =require( "mongoose" );
const  userSchema =require("../model/userModel")
const jwt = require('jsonwebtoken')
const User = mongoose.model('user', userSchema)
const bcrypt = require('bcrypt');
require('dotenv').config()

////SUPER ADMIN FUNCTIONS////

const checkUser = async (req, res) => {
    console.log('inside');
    res.json(req.user)
}


//////LOGIN////////
const loginUser = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the entered password with the hashed stored password
        const passwordMatch = bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        let token;
        
            token = jwt.sign({ name:user.name, email: user.email, roles: user.roles }, process.env.userSecret, { expiresIn: '1d' });
       

        // Send the JWT token as a response
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 3600000, path: '/' });
        user.password = undefined;
        res.status(200).send(user);
    } catch (error) {
        res.status(401).send('error');
        console.log(error);
    }
};
    module.exports={ loginUser, checkUser}