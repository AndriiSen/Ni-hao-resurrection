import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    console.log(this.decoded.id)
    this.userProfileService.getUserInfo(this.decoded.id).pipe(
      map((user: any) => {
        this.user = user
        if (this.user) {
          this.userInfo.patchValue({
            name: this.user.name,
            lastname: this.user.lastname,
            middlename: this.user.middlename,
            district: this.user.district,
            city: this.user.city,
            interests: this.user.interests,
            about: this.user.about,
            phone: this.user.phone,
            gitHub: this.user.gitHub,
            linkedIn: this.user.linkedIn
          })
        }
      }),
      catchError(res => of(
        this.openSnackBar('No permissions'),
        this.router.navigate(['/home-page'])
      )
      )
    ).subscribe();

  }
  onSubmit(): void {
    this.userProfileService.updateUserInfo(this.userInfo.value, this.decoded.id).pipe(
      map(() => this.openSnackBar('Successfully updated')),
      catchError(res => of(this.openSnackBar(res.error.message)))
    ).subscribe();
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close')
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
