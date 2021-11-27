import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public userId!: number
  private routeSub!: Subscription;
  user!: any;

  constructor(private router: Router, private svc: UserProfileService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }
  userInfo = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    nikname: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    city: new FormControl(''),
    tuningStyle: new FormControl(''),
    bodyType: new FormControl(''),
    brand: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(''),
    fuelType: new FormControl(''),
    transmission: new FormControl(''),
    engineVolume: new FormControl(''),
    purchaseStory: new FormControl(''),
  });

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = parseInt(params['id']);
    });
    this.svc.getUserInfoToUpdate(this.userId).pipe(
      map((user: any) => {
        this.user = user
        if (this.user) {
          this.userInfo.patchValue({
            name: this.user.name,
            lastname: this.user.lastname,
            nikname: this.user.nikname,
            district: this.user.district,
            city: this.user.city,
            tuningStyle: this.user.tuningStyle,
            bodyType: this.user.bodyType,
            brand: this.user.brand,
            model: this.user.model,
            year: this.user.year,
            fuelType: this.user.fuelType,
            transmission: this.user.transmission,
            engineVolume: this.user.engineVolume,
            purchaseStory: this.user.purchaseStory
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
    this.svc.updateUserInfo(this.userInfo.value, this.userId).pipe(
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
