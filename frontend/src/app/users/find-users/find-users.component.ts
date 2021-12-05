import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';

@Component({
  selector: 'app-find-users',
  templateUrl: './find-users.component.html',
  styleUrls: ['./find-users.component.css']
})
export class FindUsersComponent implements OnInit {
  usersList: any;

  constructor(private svc: UserProfileService) { }

  ngOnInit(): void {
    this.svc.getAllUsers().pipe(
      map((data) => {
        data.forEach(el => {
          this.usersList.push(el.userInfo.name)
        });
        console.log(this.usersList)
      })
    ).subscribe()
  }
}
