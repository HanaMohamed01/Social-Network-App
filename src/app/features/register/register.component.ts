import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('female', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        ),
      ]),
      rePassword: new FormControl('', Validators.required),
    },
    { validators: this.confirmPassword },
  );

  loading: boolean = false;
  msgError: string = '';
  registerSub: Subscription = new Subscription();

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (rePassword != password) {
      group.get('rePassword')?.setErrors({ mismatch: true });

      return { mismatch: true };
    }
    return null;
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.registerSub.unsubscribe();
      this.registerSub = this.authService
        .signUp(this.registerForm.value)
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
