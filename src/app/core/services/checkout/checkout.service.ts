import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient : HttpClient) { }

  onlinePayment(id:string, data:object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`, //http://localhost:4200/allorders
      {
          "shippingAddress": data
      },
    )
  }

  // cashPayment(id:string, data:object):Observable<any> {
  //   return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,
  //     {
  //         "shippingAddress": data
  //     },
  //   )
  // }

  getUserOrders(id:string):Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }
}
