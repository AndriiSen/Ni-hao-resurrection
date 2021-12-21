import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';
import { UserAuthorizationService } from 'src/app/shared/services/user-authorization.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  private routeSub!: Subscription;
  user!: any;
  decoded: any;
  token;

  constructor(private router: Router, private userAuthService: UserAuthorizationService, private userProfileService: UserProfileService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }
  userInfo = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    middlename: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    city: new FormControl(''),
    phone: new FormControl(''),
    gitHub: new FormControl(''),
    linkedIn: new FormControl(''),
    about: new FormControl(''),
  });

  ngOnInit(): void {
    this.token = localStorage.getItem('Auth-Token')
    this.decoded = jwt_decode(this.token)
    this.userProfileService.getUserInfo(this.decoded.id).pipe(
      catchError(res => of(
        this.snackBar.open('No permissions')
      ))
    ).subscribe((user: any) => {
      this.user = user
      if (this.user) {
        this.userInfo.patchValue({
          name: this.user.userInfo.name,
          lastname: this.user.userInfo.lastname,
          middlename: this.user.userInfo.middlename,
          district: this.user.userInfo.district,
          city: this.user.userInfo.city,
          about: this.user.userInfo.about,
          phone: this.user.userInfo.phone,
          gitHub: this.user.userInfo.gitHub,
          linkedIn: this.user.userInfo.linkedIn
        })
      }
    });

  }
  onSubmit(): void {
    this.userProfileService.updateUserInfo(this.userInfo.value).pipe(
      catchError(res => of(this.snackBar.open(res.error.message, 'Close')))
    ).subscribe(() => this.snackBar.open('Successfully updated', 'Close'));
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
