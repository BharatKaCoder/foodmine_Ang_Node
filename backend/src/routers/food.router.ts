
import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
const router = Router();
import asynHandler from 'express-async-handler';
import { FoodModel } from "../models/food.model";

router.get('/seed',asynHandler(
   async (req,res)=>{
    const foodCount = await FoodModel.countDocuments();
    if (foodCount) {
        res.send("Food is already done!");
        return
    }
    await FoodModel.create(sample_foods);
    res.send("Seed is done!");
}));

router.get('/', asynHandler(
    async (req,res)=>{
    const foods = await FoodModel.find();
    res.send(foods);
}));

router.get('/search/:searchTerm', asynHandler(
    async (req,res)=>{
    const serachRegex = new RegExp(req.params.searchTerm,'i');
    const foods = await FoodModel.find({name:{$regex:serachRegex}});
    res.send(foods);
}));

router.get('/tags',asynHandler(
    async (req,res)=>{
    const tags = await FoodModel.aggregate([
        { $unwind: '$tags'},
        {
            $group:{
                _id:'$tags',
                count:{ $sum:1}
            }
        },
        {
            $project:{
                _id:0,
                name:'$_id',
                count:'$count'
            }
        }
    ]).sort({count:-1});

    const all = {
        name: 'All',
        count: await FoodModel.countDocuments() 
    }
    tags.unshift(all);
    res.send(tags);
}));

router.get('/tag/:tagName',asynHandler(
    async (req,res)=>{
    const foods = await FoodModel.find({ tags: req.params.tagName })
    res.send(foods);
}));

router.get('/:foodId',asynHandler(
    async (req,res)=>{
    const foodId = req.params.foodId;
    const foods = await FoodModel.findById(foodId);
    res.send(foods);
}));

export default router;