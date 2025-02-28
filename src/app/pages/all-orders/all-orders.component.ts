import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { CheckoutService } from '../../core/services/checkout/checkout.service';
import { Iorder } from '../../shared/interfaces/iorder';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit{

  private readonly checkoutService = inject(CheckoutService);
  private readonly authService = inject(AuthService);

  userOrders:Iorder[]|any;
  userId:string|any = '';


  ngOnInit(): void {
    this.authService.saveUserData();
    this.userId = this.authService.userData?.id;
    this.getAllOrderForSpecificUser(this.userId);
  }

  getAllOrderForSpecificUser(id:string):void {
    this.checkoutService.getUserOrders(id).subscribe({
      next:(res) => {
        console.log(res);
        this.userOrders = res;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

}
