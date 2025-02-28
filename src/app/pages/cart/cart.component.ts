import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, SweetAlert2Module],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartDetails:ICart = {} as ICart;

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


  ngOnInit(): void {
      this.getCarts();
  }

  getCarts():void{
    this.cartService.getAllProductFromCart().subscribe({
      next:(res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error:(err) => {
        console.log(err);
      }
    })
 }

 deletePorduct(id:string):void {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartService.deleteSpesifciItem(id).subscribe({
        next:(res) => {
          console.log(res);
          this.cartDetails = res.data;
          if(res.status === 'success') {
            this.cartService.cartNumber.next(res.numOfCartItems)
            this.toastrService.success('Item Deleted')
          }
        },
        error:(err) => {
          console.log(err);
          this.toastrService.error("Item Dosn't Deleted")
        }
      })
      Swal.fire({
        title: "Deleted!",
        text: "Your Product has been deleted.",
        icon: "success"
      });
    }
  });
 }

 updateCount(id:string, count:number) :void {
  this.cartService.upadteQuantity(id, count).subscribe({
    next:(res) => {
      console.log(res);
      this.cartDetails = res.data

    },
    error: (err) => {
      console.log(err);
    }
  })
 }

 removeAllPoducts():void {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartService.clearCart().subscribe({
        next:(res) => {
          console.log(res);
          if(res.message == 'success') {
            this.cartService.cartNumber.next(res.numOfCartItems)
            this.cartDetails = {} as ICart;
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
      Swal.fire({
        title: "Deleted!",
        text: "Your Cart has been deleted.",
        icon: "success"
      });
    }
  });
 }

}
