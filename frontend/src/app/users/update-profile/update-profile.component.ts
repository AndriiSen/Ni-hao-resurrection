import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public userId!: number
  private routeSub!: Subscription;

  constructor(private svc: UserProfileService, private route: ActivatedRoute) { }
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
  }
  onSubmit(): void {
    this.svc.updateUserInfo(this.userInfo.value, this.userId).subscribe();
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
