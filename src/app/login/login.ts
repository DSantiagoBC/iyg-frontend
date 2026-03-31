import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  private authService = inject(AuthService);
  private router = inject(Router);

  public onSubmit() {
    const fields = this.loginForm.value;
    if (!fields.username || !fields.password) return;
    this.authService.login(fields.username, fields.password).subscribe(this.handleResponse);
  }

  private handleResponse(response: HttpResponse<any>) {
    if (response.status === 200) {
      console.log('Successful login');
      this.router.navigate(['/home']);
    }
    else if (response.status === 401) console.log('Bad login');
    else {
      console.log('Unhandled error');
      console.log(response);
    }
  }
}
