import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isAuthorized: boolean = true;
  showText: boolean = false;
  userId!: number;
  user: any;
  private routeSub!: Subscription;
  constructor(private route: ActivatedRoute, public svc: UserProfileService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = parseInt(params['id']);
      this.svc.getUserInfo(this.userId).pipe(
        map((user: any) => {
          this.user = user
        }),
        catchError(res => of(alert('User not found')))
      ).subscribe();
      this.svc.getUserInfoToUpdate(this.userId).pipe(
        catchError(res => of(this.isAuthorized = false)
        )
      ).subscribe();
    });
  }

  readMore(): void {
    this.showText = !this.showText;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
