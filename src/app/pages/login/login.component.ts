import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading:boolean = false;
  errorMessage:string = '';
  success:string = '';


  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  loginForm:FormGroup = this.formBuilder.group({
    email:[null],
    password:[null],
  })

  // loginForm:FormGroup = new FormGroup({
  //   email:new FormControl(null, [Validators.required, Validators.email]),
  //   password:new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  // })

  submitForm() {
    if(this.loginForm.valid) {
      this.isLoading = true;
      this.authService.loginForm(this.loginForm.value).subscribe({
        next:(res)=> {
          console.log(res)
          if(res.message === 'success') {
            // navigate home
            setTimeout(() => {
              localStorage.setItem('userToken', res.token);
              this.authService.saveUserData();
              this.router.navigate(['/home']);
            }, 1000);
            this.success = res.message;
          }
          this.isLoading = false;
        },
        error:(err)=> {
          // show error
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      })
    }
  }
}
