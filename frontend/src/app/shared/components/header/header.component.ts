import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthorizationService } from '../../../shared/services/user-authorization.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthorizationService,
    private userProfileService: UserProfileService,
    private router: Router,
  ) { }
  show: boolean = true;
  isAuthorized: boolean = false;
  token;
  decoded;
  user: any;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]*'),
      ],
    ],
  });
  @ViewChild('logForm') logForm;
  @ViewChild('bg') bg;

  clickSignIn() {
    this.logForm.nativeElement.classList.add('show');
    this.bg.nativeElement.classList.add('show');
  }

  clickCloseModalWindow() {
    this.logForm.nativeElement.classList.remove('show');
    this.bg.nativeElement.classList.remove('show');
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('Auth-Token')
    this.decoded = jwt_decode(this.token)
    if (this.token) {
      this.isAuthorized = true;
      this.userProfileService.getUserInfo(this.decoded.id).subscribe(
        user => this.user = user
      )
    }
  }
  @ViewChild('nameError') nameError;
  onSubmit() {
    const errorMessage: string = ' Unable to sign in. Invalid email or password';
    if (this.loginForm.status === 'INVALID') {
      this.nameError.nativeElement.textContent = errorMessage;
    } else {
      this.userAuthService
        .sendLoginForm(this.loginForm.value)
        .subscribe(
          (data: any) => {
            if (data.status === 201) {
              this.show = false;
              localStorage.setItem('Auth-Token', data.headers.get('Auth-Token'));
              this.user = data.body.userData;
              this.isAuthorized = true;
              this.router.navigate(['/home-page']);
            }
          },
          (err: HttpErrorResponse) => {
            this.nameError.nativeElement.textContent = errorMessage;
          }
        );

    }
  }

  navigateToProfile() {
    this.router.navigate([`user/${this.user.userInfo.userId}`])
  }
}
