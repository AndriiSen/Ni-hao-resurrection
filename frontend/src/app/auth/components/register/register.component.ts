import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must.match.validator';
import { UserAuthorizationService } from '../../../shared/services/user-authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserAuthorizationService]
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userAuthService: UserAuthorizationService) { };

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
    this.userAuthService.sendRegForm(this.userForm.value).subscribe();
  }

  login() {
    this.userAuthService.sendLoginForm(this.loginForm.value).subscribe(
      (data: any) => {
        localStorage.setItem('Auth-Token', data.headers.get('Auth-Token'))
      });
  }
}
