import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Component, ElementRef, inject, OnDestroy, OnInit, QueryList, ViewChild, viewChild, ViewChildren, viewChildren } from '@angular/core';
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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe,CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

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

  stars:any[] = [1,2,3,4,5];
  averageRate: number = 0;

  rateProduct(rate: number) {
    this.averageRate = rate;
    console.log("User rated:", rate);
  }

  getProductsData():void {
    this.subscription = this.productsService.getAllProducts().subscribe({
      next:(res)=> {
        console.log(res)
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
        console.log(res)
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
          this.cartService.cartNumber.next(res.numOfCartItems);
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

  ngOnDestroy(): void {
      if(this.subscription) {
        this.subscription.unsubscribe();
      }
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    navText: ['<i class="fa-solid fa-angles-left"></i>', '<i class="fa-solid fa-angles-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
  }

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 100,
    navText: ['', ''],
    items:1,
    nav: false,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
  }
}
