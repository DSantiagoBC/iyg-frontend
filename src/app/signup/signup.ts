import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { User } from '../user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  protected signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  private authService = inject(AuthService);

  public onSubmit() {
    console.log('onSubmit');

    const fields = this.signupForm.value;
    if (!fields.name || !fields.username || !fields.password) {
      console.log('Empty body');
      return;
    }
    console.log('valid form');
    this.authService
      .signup(<User>this.signupForm.getRawValue())
      .subscribe(this.handleResponse);
  }

  private handleResponse(response: HttpResponse<any>) {
    if (response.status === 201) console.log('Signup successfully');
    else if (response.status === 409) console.log('User already exists');
    else {
      console.log('Unhandled error');
      console.log(response);
    }
  }
}
