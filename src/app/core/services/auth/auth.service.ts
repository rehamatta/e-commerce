import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Iuser } from '../../../shared/interfaces/iuser';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData!:Iuser|null;

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);


  registerForm(data:object):Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  loginForm(data:object):Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  saveUserData():void {
    if(localStorage.getItem('userToken')) {
      this.userData = jwtDecode(localStorage.getItem('userToken') !)
      console.log(this.userData);
    }
  }

  logOut():void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this.router.navigate(['/login']);
  }

  emailVerification(data:object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }

  codeVerification(data:object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }

  newPassword(data:object):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data);
  }
}
