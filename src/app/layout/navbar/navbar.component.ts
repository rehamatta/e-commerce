import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isLogin = input<boolean>(true);
  numberOfCartItems!:number;
  readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res) => {
        console.log(res);
        this.cartService.cartNumber.next(res.numOfCartItems);
      }
    })
    this.cartService.cartNumber.subscribe({
      next:(val) => {
        this.numberOfCartItems = val;
      }
    })
  }

}
