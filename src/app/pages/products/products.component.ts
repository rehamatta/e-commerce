import { Component, ElementRef, inject, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products:IProduct[] = [];
  categories:ICategories[] = [];
  term:string = '';
  private subscription!: Subscription;
  @ViewChildren('el') heartIcons!:QueryList<ElementRef>;
  likedStatus: boolean[] = [];


  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);




  ngOnInit(): void {
    this.getProductsData();
    this.getAllCategoriesData();
  }

  toggleHeart(index: number) {
    this.likedStatus[index] = !this.likedStatus[index];
    const heartElement = this.heartIcons.toArray()[index]?.nativeElement;

    if (heartElement) {
      heartElement.style.color = this.likedStatus[index] ? 'red' : 'gray';
    }
  }

  stars = new Array(5);
  averageRate: number = 0;

  rateProduct(rate: number) {
    this.averageRate = rate;
    console.log("User rated:", rate);
  }

  getProductsData():void {
    this.subscription = this.productsService.getAllProducts().subscribe({
      next:(res)=> {
        console.log(res);
        this.products = res.data;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  getAllCategoriesData():void {
    this.subscription = this.categoriesService.getAllCategories().subscribe({
      next:(res) => {
        this.categories = res.data;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  addToCart(id:string) {
    this.subscription = this.cartService.addProductToCart(id).subscribe({
      next:(res) => {
        console.log(res);
        if(res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart')
        }
      },
      error:(err) => {
        console.log(err);
        this.toastrService.error('Not Added', 'FreshCart')
      }
    })
  }

  addItemToWishlist(id:string):void {
      this.wishlistService.addToWishlist(id).subscribe({
      next:(res) => {
        console.log(res.data);
        this.toastrService.success(res.message, 'FreshCart')
      },
      error:(err) => {
        console.log(err);
        this.toastrService.error('Not Added', 'FreshCart')
      }
    })
   }

}
