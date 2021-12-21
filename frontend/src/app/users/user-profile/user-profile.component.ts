import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isAuthorized!: boolean;
  showText: boolean = false;
  token;
  decoded;
  userId!: number;
  user: any;
  private routeSub!: Subscription;
  constructor(private route: ActivatedRoute, public userProfileService: UserProfileService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = parseInt(params['id']);
      this.isAuthorized = this.userIsUser()
      this.userProfileService.getUserInfo(this.userId).pipe(
        catchError(res => of(this.snackBar.open('User not found')))
      ).subscribe((user: any) => {
        this.user = user
      });
    });
  }

  readMore(): void {
    this.showText = !this.showText;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  userIsUser() {
    this.token = localStorage.getItem('Auth-Token')
    this.decoded = jwt_decode(this.token)
    return this.userId === this.decoded.id
  }
}
