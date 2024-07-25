import express, { json } from 'express';
import cors from 'cors';
import { sample_foods, sample_tags, sample_users } from './data';
import _jwt from 'jsonwebtoken';

const app = express();
// setting up server
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get('/api/foods',(req,res)=>{
    res.send(sample_foods);
});

app.get('/api/foods/search/:searchTerm',(req,res)=>{
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods
    .filter((food:any)=> food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    res.send(foods)
})

app.get('/api/foods/tags',(req,res)=>{
    res.send(sample_tags);
});

app.get('/api/foods/tag/:tagName',(req,res)=>{
    const tagName = req.params.tagName;
    const foods = sample_foods
    .filter((filter)=> filter.tags?.includes(tagName));
    res.send(foods);
});

app.get('/api/foods/:foodId',(req,res)=>{
    const foodId = req.params.foodId;
    const food = sample_foods
    .filter((filter)=> filter?.id.includes(foodId));
    res.send(food);
});

app.post('/api/users/login',(req,res)=>{
    const { email, password} = req.body;
    const user = sample_users.find((find)=>find.email === email && find.password === password);
    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("Email or Password is not valid!")
    }
});

const generateTokenResponse = (user:any)=> {
    const token = _jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    },'user auth',{
        expiresIn:"10d"
    });
    user.token = token;
    return user.token;
}

app.listen(8080,()=>{
    console.log(`server started at http://localhost:${8080}`);
});