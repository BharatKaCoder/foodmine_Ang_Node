
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Router } from "express";
const router = Router();
import asynHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQ } from '../constant/http_status';

router.get('/seed',asynHandler(
    async (req,res)=>{
     const userCount = await UserModel.countDocuments();
     if (userCount) {
         res.send("User is already done!");
         return
     }
     await UserModel.create(sample_users);
     res.send("Seed is done!");
 }));

// User login route
router.post('/login', asynHandler(
    async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && await bcrypt.compare(password,user.password)) {
        // Generate and send token response
        const token = generateTokenResponse(user);

        res.json({token,
            user:{
                name:user.name
            }});
    } else {
        res.status(HTTP_BAD_REQ).json({ error: "Email or Password is not valid!" });
    }
}));

// singup route
router.post('/register', asynHandler(
    async (req,res)=>{
        const {name, email,password,address} = req.body;
        const user = await UserModel.findOne({email});
        if(user) {
            res.status(HTTP_BAD_REQ).json({error:"Email already registered"});
            return;
        }
        const encryptedPassword = await bcrypt.hash(password,10);
        const newUser:User = {
            id:'',
            name,
            password:encryptedPassword,
            email:email.toLowerCase(),
            address,
            isAdmin:false
        }
        const dbUser = await UserModel.create(newUser);
        res.json(generateTokenResponse(dbUser));
    }
));

// Generate JWT token
const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET || 'your_jwt_secret', {
        expiresIn: '10d'
    });
    return token;
};

export default router;