import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      ),
    ]),
  });
  registerSub: Subscription = new Subscription();
  loading: boolean = false;
  msgError: string = '';

  submitFormLogin(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.registerSub.unsubscribe();
      this.registerSub = this.authService
        .signIn(this.registerForm.value)
        .subscribe({
          next: (res: any) => {
            this.msgError = '';
            this.loading = false;
            console.log(res);
          },
          error: (err: any) => {
            console.log(err);
            this.msgError = err.error.message;
            this.loading = false;
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
