import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from '../../core/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{

  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly checkoutService = inject(CheckoutService);


  checkoutForm!:FormGroup;
  cartId:string = '';
  isLoading:boolean = false;

  ngOnInit(): void {
      // this.checkoutForm = new FormGroup({
      //   destails : new FormControl(null, [Validators.required]),
      //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      //   city: new FormControl(null, [Validators.required])
      // })
      this.getCarId();
      this.initForm();
  }

  initForm() :void {
    this.checkoutForm = this.formBuilder.group({
      details:[null, [Validators.required]],
      phone:[null,  [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city:[null, [Validators.required]]
    })
  }

  getCarId() :void {
    this.activatedRoute.paramMap.subscribe({
      next:(param) => {
        this.cartId = param.get('id') !;
      }
    })
  }

  submitForm():void {
    console.log(this.checkoutForm)
    this.isLoading = true;
    this.checkoutService.onlinePayment(this.cartId, this.checkoutForm.value).subscribe({
      next:(res) => {
        console.log(res.session.url);
        console.log(this.checkoutForm)
        if(res.status === 'success') {
          open(res.session.url, '_self');
        }
        this.isLoading = false;
      } ,
      error:(err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }
}
