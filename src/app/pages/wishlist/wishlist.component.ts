import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe,  SweetAlert2Module],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

    wishlistDetails:Iwishlist[] = [];

    private readonly wishlistService = inject(WishlistService);
    private readonly toastrService = inject(ToastrService);


    ngOnInit(): void {
        this.getWishlist();
    }

    getWishlist():void{
      this.wishlistService.getAllPoductInWishlist().subscribe({
        next:(res) => {
          this.wishlistDetails = res.data;
          console.log(this.wishlistDetails);

        },
        error:(err) => {
          console.log(err);
        }
      })
   }

   deleteFromWishlist(id:string):void {
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
        this.wishlistService.removeFromWishlist(id).subscribe({
          next:(res) => {
            console.log(res);
            this.getWishlist();
            if(res.status === 'success') {
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

}
