import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExternalsService } from '../services/externals-service';
import { External } from '../interfaces/external';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-externals',
  imports: [ReactiveFormsModule],
  templateUrl: './externals.html',
  styleUrl: './externals.scss',
})
export class Externals {
  protected externalsForm = new FormGroup({
    externalId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    activity: new FormControl('', Validators.required),
  });

  private externalsService = inject(ExternalsService);

  public onSubmit() {
    const value = <External>this.externalsForm.getRawValue();
    this.externalsService.insert(value).subscribe(this.handleResponse);
  }

  private handleResponse(response: HttpResponse<any>) {
    if (response.status === 201) console.log('Successful insertion');
    else if (response.status === 409) console.log('External already exists');
    else {
      console.log('Unhandled error');
      console.log(response);
    }
  }
}
