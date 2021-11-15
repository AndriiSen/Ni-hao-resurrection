import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { MustMatch } from 'src/app/_helpers/must.match.validator';
import { UserAuthorizationService } from '../../../shared/services/user-authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserAuthorizationService]
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private svc: UserAuthorizationService) { };

  userForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    login: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('[a-zA-Z0-9]*')
    ]],
    confirmPassword: ['', Validators.required]
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  ngOnInit(): void { }

  onSubmit() {
    this.svc.sendRegForm(this.userForm.value).subscribe();
  }

  login() {
    this.svc.sendLoginForm(this.loginForm.value).pipe(first())
      .subscribe(
        (data: any) => {
          localStorage.setItem('Auth-Token', data.headers.get('Auth-Token'))
          console.log(
            JSON.parse(
              atob(localStorage.getItem('Auth-Token')!.split('.')[1])
            )
          );
        });
  }
}
