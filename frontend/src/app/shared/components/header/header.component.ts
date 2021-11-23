import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAuthorizationService } from '../../../shared/services/user-authorization.service';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private svc: UserAuthorizationService
  ) {}
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

  ngOnInit(): void {
    let modal: any = document.querySelector('.form');
    let modalBg: any = document.querySelector('.modal_bg');
    let login: any = document.querySelector('.login');

    login.addEventListener('click', function () {
      modal.classList.add('show');
      modalBg.classList.add('show');
    });

    document.addEventListener('click', function (e) {
      let click: any = e.target as HTMLTextAreaElement;
      if (click.classList.value === 'close') {
        modal.classList.remove('show');
        modalBg.classList.remove('show');
      }
    });

    document.addEventListener('click', function (e) {
      let click: any = e.target as HTMLTextAreaElement;
      if (click.classList.value === 'closeBtn') {
        modal.classList.remove('show');
        modalBg.classList.remove('show');
      }
    });

    modalBg.addEventListener('click', function () {
      modal.classList.remove('show');
      modalBg.classList.remove('show');
    });
  }

  onSubmit() {
    const element: HTMLElement = document.getElementById(
      'errors'
    ) as HTMLElement;
    const errorMessage: string =
      ' Unable to sign in. Invalid email or password';
    if (this.loginForm.status === 'INVALID') {
      element.innerHTML = errorMessage;
      console.log(this.loginForm.status);
    } else {
    this.svc
      .sendLoginForm(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          if (data.status === 201) {
            localStorage.setItem('Auth-Token', data.headers.get('Auth-Token'));
            window.location.href = '../home-page';
          }
        },
        (err: HttpErrorResponse) => {
          element.innerHTML = errorMessage;
        }
      );
    }
  }
}
