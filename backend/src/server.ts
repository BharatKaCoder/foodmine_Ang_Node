import express from 'express';
import cors from 'cors';
import FoodRouter from './routers/food.router';
import UserRouter from './routers/user.router';
import OrderRouter from './routers/order.router';
import dotenv from 'dotenv';
dotenv.config();
import { dbConnect } from './configs/database.config';
// import authenticateToken from './middleware/auth.mid';
dbConnect();
const app = express();
// setting up server
app.use(express.json());
// Apply the authentication middleware
// app.use(authenticateToken);
app.use(cors({
    credentials:true,
    origin: ['http://localhost:4200'], // Allow only specific origin
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    // allowedHeaders: ['Content-Type', 'access_token'] // Allow specific headers
}));

app.use('/api/foods',FoodRouter);
app.use('/api/users',UserRouter);
app.use('/api/orders',OrderRouter);



// app.get('/api/foods',(req,res)=>{
//     res.send(sample_foods);
// });

// app.get('/api/foods/search/:searchTerm',(req,res)=>{
//     const searchTerm = req.params.searchTerm;
//     const foods = sample_foods
//     .filter((food:any)=> food.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     res.send(foods)
// })

// app.get('/api/foods/tags',(req,res)=>{
//     res.send(sample_tags);
// });

// app.get('/api/foods/tag/:tagName',(req,res)=>{
//     const tagName = req.params.tagName;
//     const foods = sample_foods
//     .filter((filter)=> filter.tags?.includes(tagName));
//     res.send(foods);
// });

// app.get('/api/foods/:foodId',(req,res)=>{
//     const foodId = req.params.foodId;
//     const food = sample_foods
//     .filter((filter)=> filter?.id.includes(foodId));
//     res.send(food);
// });

// // User login route
// app.post('/api/users/login', (req, res) => {
//     const { email, password } = req.body;

//     const user = sample_users.find(user => user.email === email);
//     if (user && bcrypt.compareSync(password, user.password)) {
//         // Generate and send token response
//         const token = generateTokenResponse(user);
//         res.json({ ...user, token });
//     } else {
//         res.status(400).json({ error: "Email or Password is not valid!" });
//     }
// });

// // Generate JWT token
// const generateTokenResponse = (user:any) => {
//     const token = jwt.sign({
//         email: user.email,
//         isAdmin: user.isAdmin
//     }, process.env.JWT_SECRET || 'your_jwt_secret', {
//         expiresIn: '10d'
//     });
//     return token;
// };

app.listen(8080,()=>{
    console.log(`server started at http://localhost:${8080}`);
});