import { IProduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  productDestails:IProduct | null = null;
  selectedImage:string = '';
  ProductID:string = ''


  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


  getAllAboutProduct():void {
    this.activatedRoute.paramMap.subscribe({
      next:(p) => {
        this.ProductID = p.get('id') !;
        this.productsService.getSpecificProduct(this.ProductID).subscribe({
          next:(res) => {
            this.productDestails = res.data;
          },
          error(err) {
              console.log(err);
          },
        })
      }
    })
  }

  ngOnInit(): void {
    this.getAllAboutProduct();
  }

  changeImage(e:MouseEvent):void {
    const clickedImage = e.target as HTMLImageElement;
    this.selectedImage = clickedImage.src;
    console.log(this.selectedImage);
    if(this.productDestails) {
      this.productDestails.imageCover = this.selectedImage;
    }
  }

  addToCart() {
    this.cartService.addProductToCart(this.ProductID).subscribe({
      next:(res) => {
        console.log(res);
        if(res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart')
        }
      },
      error:(err) => {
        console.log(err);
        this.toastrService.error(err.message, 'FreshCart')

      }
    })
  }

}
