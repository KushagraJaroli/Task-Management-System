import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule, 
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, 
    private authService:AuthService,
    private snackbar:MatSnackBar,
    private router:Router
  ) {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() { 
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit() {
    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;
    if (password !== confirmPassword) {
      this.snackbar.open("Password do not match", "Close", { duration: 5000, panelClass: "error-snackbar"});
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe((res) => {
      if (res.id != null) {
      this.snackbar.open("Signup successful", "Close", {duration: 5000 });
      this.router.navigateByUrl("/login");
      } else {  
        this.snackbar.open("Signup failed. Try again", "Close", { duration: 5000, panelClass: "error-snackbar" })
      }  
    })
  }
}
