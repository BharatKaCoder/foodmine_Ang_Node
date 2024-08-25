import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from '../../../shared/models/CartItems';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'] // Corrected from styleUrl to styleUrls
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  checkoutForm: FormGroup;

  constructor(
    private _cartService: CartService,
    private _fb: FormBuilder,
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _orderService: OrdersService,
    private _router:Router
  ) {
    this.checkoutForm = this._fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const cart = this._cartService.getCart(); // Assuming getCart() returns the current cart
    this.order.items = cart.item;
    this.order.totalPrice = cart.totalPrice;

    // const { name, address } = this._userService.currentUser(); // Assuming currentUser() returns user details
    // this.checkoutForm.patchValue({
    //   name: name,
    //   address: address,
    // });

    this._cartService.getCartObservable().subscribe(cart => {
      this.cartItems = cart.item;
      this.totalPrice = cart.totalPrice;
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this._toastrService.warning("Please fill the inputs", "Invalid Inputs");
      return;
    }

    // if(!this.order.address) {
    //   this._toastrService.warning("Please select your address", "Address");
    //   return
    // }
    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;

    this._orderService.create(this.order).subscribe({
      next:()=> {
        this._router.navigate(['/payment']);
      },
      error:(error)=>{
        this._toastrService.warning(error?.error?.message,'Cart');
      }
    })
    // Proceed to payment or further processing
    this.goToPayment();
  }

  goToPayment() {
    // Implement your payment logic here
    console.log('Proceeding to payment...');
  }
}
