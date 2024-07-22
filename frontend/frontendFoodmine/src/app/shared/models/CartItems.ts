import { Food } from "./food"

export class CartItem {
    constructor(public food:Food) {}
    quantity:number = 0
    price:number = this.food.price
}