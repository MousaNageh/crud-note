import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidatorsService } from 'src/app/core/services/custom-validators/custom-validators.service';
import { LoginActions } from '../../store/actions/login-type';
import { selectError } from '../../store/selectors/login-selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;
  errorMessage$!: Observable<string>;
  private passLength: number = 8;
  errorMessages = {
    email: {
      required: 'Email is required',
      notEmail: 'Please enter vaild email',
    },
    password: {
      required: 'Password is required',
      minlength: `Min length is ${this.passLength} digits`,
    },
  };
  constructor(private formBuilder: FormBuilder, private store: Store) {}
  ngOnInit(): void {
    this.initSignInForm();
    this.errorMessage$ = this.store.select(selectError);
  }
  initSignInForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, CustomValidatorsService.isEmail]],
      password: [
        '',
        [Validators.required, Validators.minLength(this.passLength)],
      ],
    });
  }
  /* Return AbstractControl To Form Control */
  formControlData(formControl: any): FormControl {
    return this.signInForm.get(formControl) as FormControl;
  }
  signIn(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(LoginActions.logIn({ payload: this.signInForm.value }));
  }
}
