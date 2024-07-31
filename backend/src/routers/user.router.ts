
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Router } from "express";
const router = Router();
import asynHandler from 'express-async-handler';
import { UserModel } from '../models/user.model';

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
    const user = UserModel.findOne({email,password});
    if (user) {
        // Generate and send token response
        const token = generateTokenResponse(user);
        res.json(token);
    } else {
        res.status(400).json({ error: "Email or Password is not valid!" });
    }
}));

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