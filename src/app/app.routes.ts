import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { BlankComponent } from './layout/blank/blank.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  {path:'' , component:AuthComponent, canActivate:[loggedGuard], children:[
    { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    {path:'login', loadComponent:()=>import('./pages/login/login.component').then((c)=>c.LoginComponent), title:'login'},
    {path:'register', loadComponent:()=>import('./pages/register/register.component').then((c)=>c.RegisterComponent), title:'register'},
    {path:'forget', loadComponent:()=>import('./pages/forget/forget.component').then((c)=>c.ForgetComponent), title:'forgetPassword'}
  ]},
  {path:'', component:BlankComponent, canActivate:[authGuard], children:[
    {path:'home', loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent), title:'home'},
    {path:'brands', loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent), title:'brands'},
    {path:'cart', loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent), title:'cart'},
    {path:'categories', loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent), title:'categories'},
    {path:'checkout/:id', loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent), title:'checkout'},
    {path:'products', loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent), title:'products'},
    {path:'details/:id', loadComponent:()=> import('./pages/details/details.component').then(c => c.DetailsComponent)},
    {path:'categoryDetails/:id', loadComponent:()=> import('./pages/category-details/category-details.component').then(c => c.CategoryDetailsComponent)},
    {path:'allorders', loadComponent:()=> import('./pages/all-orders/all-orders.component').then(c => c.AllOrdersComponent), title:'allorders'},
    {path:'wishlist', loadComponent:()=> import('./pages/wishlist/wishlist.component').then(c => c.WishlistComponent)},
    {path:'**', component:NotfoundComponent, title:'notfound'},
  ]}
];
