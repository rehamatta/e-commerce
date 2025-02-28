import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  imports: [ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
  isLoading:boolean = false;
  step:number  = 1;

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  verifyEmail:FormGroup = this.formBuilder.group({
    email:[null , [Validators.required , Validators.email]],
  })

  verifyCode:FormGroup = this.formBuilder.group({
    resetCode:[null , [Validators.required , Validators.pattern(/^[0-9]{5,}$/)]],
  })

  resetPassword:FormGroup = this.formBuilder.group({
    email:[null , [Validators.required , Validators.email]],
    newPassword:[null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]]
  })

  submitForm1():void {
    if(this.verifyEmail.valid) {
      let emailValue = this.verifyEmail.get('email')?.value;
      this.resetPassword.get('email')?.patchValue(emailValue)
      this.isLoading = true
      this.authService.emailVerification(this.verifyEmail.value).subscribe({
        next:(res) => {
          console.log(res)
          if(res.statusMsg === 'success') {
            setTimeout(() => {
              this.step = 2;
            }, 1000);
          }
          this.isLoading = false;
        },
        error:(err) => {
          console.log(err);
          this.isLoading = false;
        }
      })
    }
  }

  submitForm2():void {
    if(this.verifyCode.valid) {
      this.isLoading = true;
      this.authService.codeVerification(this.verifyCode.value).subscribe({
        next:(res) => {
          console.log(res)
          if(res.status === 'Success') {
            setTimeout(() => {
              this.step = 3;
            }, 1000);
          }
          this.isLoading = false;
        },
        error:(err) => {
          console.log(err);
          this.isLoading = false;
        }
      })
    }
  }

  submitForm3():void {
    if(this.resetPassword.valid) {
      this.isLoading = true;
      this.authService.newPassword(this.resetPassword.value).subscribe({
        next:(res) => {
          console.log(res);
          this.isLoading = false;
          this.authService.saveUserData();
          localStorage.setItem('userToken', res.token);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error:(err) => {
          console.log(err);
          this.isLoading = false;
        }
      })
    }
  }
}
