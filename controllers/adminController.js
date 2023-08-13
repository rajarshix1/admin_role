const mongoose =require( "mongoose" );
const  adminSchema =require("../model/adminModel")
const  userSchema =require("../model/userModel")
const jwt = require('jsonwebtoken')
const Admin = mongoose.model('admin', adminSchema)
const User = mongoose.model('user', userSchema)
const bcrypt = require('bcrypt');
require('dotenv').config()

////SUPER ADMIN FUNCTIONS////

const check = async (req, res) => {
    console.log('inside');
    res.json(req.user)
}
const newAdmin = async (req, res) => {
    console.log(req.body);

    try {
        const existingAdmin = await Admin.findOne({ email: req.body.email });
        console.log(existingAdmin);

        if (!existingAdmin) {
            // Hash the password before saving
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const newAdmin = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role:req.body.role // Store the hashed password
                // Other fields
            });

            const resp = await newAdmin.save();
            res.status(200).json(resp);
        } else {
            res.status(401).send("Email already exists");
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
};

/////ADMIN FUNCTIONS////
const createUser = async (req, res) => {
    console.log('in createuser');
    let newC = new User(req.body)
   try {
    const existingUser = await User.findOne({email: req.body.email})
    console.log(existingUser);
    if(!existingUser){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        newC.password= hashedPassword
        const resp = await newC.save()
        resp.password=undefined
    res.status(200).json(resp)}
    else{
        res.status(401).send("Email already exists")
    }
   } catch (error) {
    console.log(error);
    res.status(401).json(error)
   }
}
const editUser = async (req, res) => {
    console.log('in editUser');
   try {
    const edited = await User.findOneAndUpdate({email: req.body.email}, {roles:req.body.roles})
    if(!edited){
        res.status(404).json({message: 'No user found'})
    }else{
        res.status(200).json({message: 'Successfully updated'})
    }

   } catch (error) {
    console.log(error);
    res.status(401).json(error)
   }
}

const deleteUser = async (req, res) => {
    console.log(req.query);
    try {
        
        // Delete the user based on the provided email
        const deletedUser = await User.findOneAndDelete({ email: req.query.email });
        console.log('here', deletedUser);

        if (!deletedUser) {
            console.log('here');
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const showAllUser = async (req, res) => {
    console.log(req.query);
    try {
        
        // Delete the user based on the provided email
        const users = await User.find({});
        console.log('here', users);

        if (!users) {
            console.log('here');
            return res.status(404).json({ message: 'No user found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


//////LOGIN FOR ADMINS////////
const login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the entered password with the hashed stored password
        const passwordMatch = bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        let token;
        if (admin.role === 'super') {
            token = jwt.sign({ name:admin.name, email: admin.email, role: admin.role }, process.env.superAdminSecret, { expiresIn: '1d' });
        } else {
            token = jwt.sign({ name:admin.name, email: admin.email, role: admin.role }, process.env.adminSecret, { expiresIn: '1d' });
        }

        // Send the JWT token as a response
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 3600000, path: '/' });
        admin.password = undefined;
        res.status(200).send(admin);
    } catch (error) {
        res.status(401).send('error');
        console.log(error);
    }
};
    module.exports={check,newAdmin, createUser, login, editUser, deleteUser, showAllUser}