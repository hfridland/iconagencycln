import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  submitted: boolean = false;
  message: string = '';
  hidePwd: boolean = true;

  constructor(private router: Router,
    public auth: AuthService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    if (this.form.get('email')!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }

  getPwdErrorMessage() {
    if (this.form.get('password')!.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.form.get('password')!.hasError('minlength')) {
      const error = this.form.get('password')!.errors?.minlength;

      return `Password length must be >= ${error.requiredLength} symbols. Actual ${error.actualLength} symbols`;
    }
    return '';
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const loginRequest: LoginRequest = {
      username: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(loginRequest).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/parts']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );

  }

}
