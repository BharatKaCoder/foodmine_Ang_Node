import { model, Schema, Types } from 'mongoose';
import { Food, FoodSchema } from './food.model';
import { OrderStatusEnum } from '../constant/order_status';

export interface OrderItem {
    food: Food,
    price: number,
    quantity: number
}

export const OrderItemSchema = new Schema<OrderItem>(
    {
        food: { type:FoodSchema, required: true},
        price: { type:Number, required: true},
        quantity: { type:Number, required: true}
    }
);

export interface Order {
    id:string;
    items:OrderItem[];
    totalPrice:number;
    name:string;
    address:string;
    paymentId:string;
    status:OrderStatusEnum;
    user:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}

const OrderSchema = new Schema<Order>(
    {
        name:{ type:String, required: true},
        address:{ type:String, required: true},
        paymentId:{ type:String, required: true},
        totalPrice:{ type:Number, required: true},
        items: { type:[OrderItemSchema], required:true},
        status: { type:String, default:OrderStatusEnum.NEW},
        user: { type: Schema.Types.ObjectId, required:true}
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

export const OrderModel = model('order',OrderSchema);