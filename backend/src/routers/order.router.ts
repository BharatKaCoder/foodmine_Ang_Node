import { Router } from "express";
import asyncHandler from 'express-async-handler'
import { HTTP_BAD_REQ } from "../constant/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatusEnum } from "../constant/order_status";
import  auth  from '../middleware/auth.mid'

const router = Router();
router.use(auth);

// router.post('/create',
//     asyncHandler(async(req:any, res:any)=>{
//         console.log('req.body=>',req.body)
//         const requestOrder = req.body;
//         if(requestOrder.item.length <= 0) {
//             res.status(HTTP_BAD_REQ).send('Cart is empty!');
//             return;
//         }

//         await OrderModel.deleteOne({
//             user: req.user.id,
//             status: OrderStatusEnum.NEW
//         });

//         const newOrder = new OrderModel({...requestOrder, user: req.user.id});
//         await newOrder.save();
//         res.send(newOrder);
//     })
// )

// export default router;

router.post('/create',
    asyncHandler(async(req:any, res:any)=>{
        console.log('req.body=>',req.body)
        const requestOrder = req.body;
        if(requestOrder.item.length <= 0) {
            res.status(HTTP_BAD_REQ).send('Cart is empty!');
            return;
        }
        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatusEnum.NEW
        });

        const newOrder = new OrderModel({...requestOrder, user: req.user.id});
        await newOrder.save();
        res.send(newOrder);
    })
)
export default router;