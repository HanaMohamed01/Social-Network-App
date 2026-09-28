import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        ),
      ],
    ],
  });

  loginSub: Subscription = new Subscription();
  loading: boolean = false;
  msgError: string = '';

  showPass(type: HTMLInputElement): void {
    if (type.type === 'password') {
      type.type = 'text';
    } else {
      type.type = 'password';
    }
  }

  submitFormLogin(): void {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');

    if (emailControl?.valid && passwordControl?.value) {
      this.loading = true;
      this.loginSub.unsubscribe();
      this.loginSub = this.authService.signIn(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.msgError = '';
          this.loading = false;
          localStorage.setItem('socialToken', res.data.token);
          localStorage.setItem('userData', JSON.stringify(res.data.user));
          this.router.navigate(['/feed']);
        },
        error: (err: any) => {
          console.log(err);
          this.msgError =
            err.status >= 400 && err.status < 500
              ? 'Email or password is incorrect.'
              : 'Unable to log in. Please try again.';
          this.loading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
